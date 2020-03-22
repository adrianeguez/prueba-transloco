
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
    ConfiguracionDisabledInterfaz,
    encerarFormBuilder,
    generarCampos,
    generarEmiteEmpezoTipear,
    generarMensajesFormGroup,
    establecerCamposDisabled,
    NO_EXISTEN_REGISTROS
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {InformacionTributaria} from './informacion-tributaria';
import {InformacionTributariaFormulario} from './informacion-tributaria-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TipoIdentificacionInterface} from '../../../../submodulo-empresa-front/interfaces/tipo-identificacion.interface';
import {TipoIdentificacionRestService} from '../../../../submodulo-empresa-front/servicios/rest/tipo-identificacion-rest.service';


@Component({
    selector: 'ml-informacion-tributaria-formulario',
    templateUrl: './informacion-tributaria-formulario.component.html'
})

export class InformacionTributariaFormularioComponent implements OnInit {

    @Output() informacionTributariaValido: EventEmitter<InformacionTributaria | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioInformacionTributaria;

    @Input() esVenta: boolean;

    informacionTributaria: InformacionTributariaFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesInformacionTributaria = {

        tipoIdentificacions: [],
    };

    constructor(private _formBuilder: FormBuilder,
        private _cargandoService: CargandoService,
        private _toasterService: ToasterService,
        private _tipoIdentificacionRestService: TipoIdentificacionRestService,

        ) {

    }

    ngOnInit() {

        this.informacionTributaria = new InformacionTributariaFormulario(
             this.configuracionDisabled.TipoIdentificacion.valor,
             this.configuracionDisabled.Documento.valor,
             this.configuracionDisabled.RazonSocial.valor,
             this.configuracionDisabled.Direccion.valor,
             this.configuracionDisabled.Telefono.valor,
             this.configuracionDisabled.Correo.valor,
             this.configuracionDisabled.TipoContribuyente.valor,
             this.configuracionDisabled.ContribuyenteEspecial.valor,
             this.configuracionDisabled.ObligadoContabilidad.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.informacionTributaria);
        this.informacionTributaria.formGroup = this._formBuilder.group(encerarFormBuilder(this.informacionTributaria));
        generarMensajesFormGroup(this.configuracionDisabled, this.informacionTributaria);
        generarEmiteEmpezoTipear(this.informacionTributaria, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.informacionTributaria
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    this.mensajeToaster = '';

                    if (this.informacionTributaria.formGroup.valid && this.validacionesCampos()) {

                        this.informacionTributariaValido.emit(generarCampos(this.informacionTributaria));
                        this._toasterService.pop('info', 'Valido', 'InformacionTributaria válida ');

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
                        }
                        this.informacionTributariaValido.emit(false);
                    }
                }
            );
    }

    validacionesCampos() {
        return this.validarEjemplo() && this.validarTipoIdentificacion();
    }

    validarEjemplo() {
        return true; // Implementacion de validacion ejemplo
    }


    validarTipoIdentificacion() {
        const tipoIdentificacionValorActual = this.informacionTributaria.formGroup.get('tipoIdentificacion').value.id;
      // tslint:disable-next-line:max-line-length
        let tipoIdentificacionEncontrado = this.objetoVariablesGlobales.tipoIdentificacions.find((registro) => registro.id === tipoIdentificacionValorActual);
        if (typeof this.informacionTributaria.id !== 'object') {
            tipoIdentificacionEncontrado = {};
        }
        if (tipoIdentificacionEncontrado) {
          return true;
        } else {
          this.mensajeToaster = 'Seleccione un tipoIdentificacion válido';
          return false;
        }
      }

      buscarTipoIdentificacions(evento) {
        this._cargandoService.habilitarCargando();
        let tipoIdentificacions$;
        if (evento.query === '') {
            tipoIdentificacions$ = this._tipoIdentificacionRestService
                .findAll();
        } else {
            const consulta = { // lenar la consulta
                camposABuscar: [
                    { campo: 'nombre', valor: `%25${evento.query}%25` }
                ]
            };
            tipoIdentificacions$ = this._tipoIdentificacionRestService
                .findWhereOr('criterioBusqueda=' + JSON.stringify(consulta));
        }
        tipoIdentificacions$
          .subscribe(
            (tipoIdentificacions: any[]) => {
              this.objetoVariablesGlobales.tipoIdentificacions = tipoIdentificacions[0];
              this._cargandoService.deshabilitarCargando();
            },
            error => {
              this._cargandoService.deshabilitarCargando();
              if (this.esVenta) {
                const tiposIdenitficacion: TipoIdentificacionInterface[] = [
                  {
                    nombre: 'Cedula',
                    habilitado: 1,
                    id: 1,
                  },
                  {
                    nombre: 'RUC',
                    habilitado: 1,
                    id: 2,
                  },
                  {
                    nombre: 'Pasaporte',
                    habilitado: 1,
                    id: 3,
                  }
                ];
                this.objetoVariablesGlobales.tipoIdentificacions = tiposIdenitficacion;
              } else {
                console.error(error);
                this._toasterService.pop('error', 'ERROR', 'Revisa tu conexion o intentalo mas tarde');
              }

              // Manejar errores
            }
          );
      }




}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesInformacionTributaria {
    tipoIdentificacions: TipoIdentificacionInterface[];
}

export interface ConfiguracionFormluarioInformacionTributaria {
  Id?: ConfiguracionDisabledInterfaz;
  TipoIdentificacion?: ConfiguracionDisabledInterfaz;
  Documento?: ConfiguracionDisabledInterfaz;
  RazonSocial?: ConfiguracionDisabledInterfaz;
  Direccion?: ConfiguracionDisabledInterfaz;
  Telefono?: ConfiguracionDisabledInterfaz;
  Correo?: ConfiguracionDisabledInterfaz;
  TipoContribuyente?: ConfiguracionDisabledInterfaz;
  ContribuyenteEspecial?: ConfiguracionDisabledInterfaz;
  ObligadoContabilidad?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_INFORMACIONTRIBUTARIA = (): ConfiguracionFormluarioInformacionTributaria => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        TipoIdentificacion: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Documento: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        RazonSocial: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Direccion: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Telefono: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Correo: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        TipoContribuyente: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        ContribuyenteEspecial: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        ObligadoContabilidad: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
