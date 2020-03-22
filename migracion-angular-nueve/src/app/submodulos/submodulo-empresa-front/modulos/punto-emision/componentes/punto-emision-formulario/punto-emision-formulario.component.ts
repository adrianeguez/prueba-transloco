
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
import {PuntoEmision} from './punto-emision';
import {PuntoEmisionFormulario} from './punto-emision-formulario';
import {debounceTime} from 'rxjs/operators';
import {BodegaRestService} from '../../../../servicios/rest/bodega-rest.service';
import {CargandoService} from 'man-lab-ng';
import {BodegaInterface} from '../../../../interfaces/bodega.interface';


@Component({
  selector: 'ml-punto-emision-formulario',
  templateUrl: './punto-emision-formulario.component.html'
})

export class PuntoEmisionFormularioComponent implements OnInit {

  @Output() puntoEmisionValido: EventEmitter<PuntoEmision | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioPuntoEmision;

  @Input() idEdificio: number;

  puntoEmision: PuntoEmisionFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesPuntoEmision = {

    bodegas: [],
  };

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,
              private _bodegaRestService: BodegaRestService,

  ) {

  }

  ngOnInit() {

    this.puntoEmision = new PuntoEmisionFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Codigo.valor,
      this.configuracionDisabled.SecuencialActual.valor,
      this.configuracionDisabled.EnUso.valor,
      this.configuracionDisabled.Bodega.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.puntoEmision);
    this.puntoEmision.formGroup = this._formBuilder.group(encerarFormBuilder(this.puntoEmision));
    generarMensajesFormGroup(this.configuracionDisabled, this.puntoEmision);
    generarEmiteEmpezoTipear(this.puntoEmision, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.puntoEmision
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          console.log(this.puntoEmision.formGroup);

          this.mensajeToaster = '';

          if (this.validacionesCampos() && this.puntoEmision.formGroup.valid) {

            this.puntoEmisionValido.emit(generarCampos(this.puntoEmision));
            this._toasterService.pop('info', 'Valido', 'Punto de emisión válida ');

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
            }
            this.puntoEmisionValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarBodega();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }


  validarBodega() {
    if (this.puntoEmision.formGroup.get('bodega').value !== null) {
      const bodegaActual = this.puntoEmision.formGroup.get(
        'bodega',
      ).value.id;
      const bodegaEncontrada = this.objetoVariablesGlobales.bodegas.find(
        registro => registro.id === bodegaActual,
      );
      if (bodegaEncontrada || bodegaActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione una bodega válida';
        return false;
      }
    }
  }

  buscarBodegas(evento) {
    this._cargandoService.habilitarCargando();
    let bodegas$;
    const consulta = {
      where: [
        {
          nombre: `Like(\"%25${evento.query}%25\")`,
          edificio: this.idEdificio,
          esPercha: true
        },
        {
          codigo: `Like(\"%25${evento.query}%25\")`,
          edificio: this.idEdificio,
          esPercha: true
        }
      ]
    };
    bodegas$ = this._bodegaRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consulta));
    bodegas$
      .subscribe(
        (bodegas: any[]) => {
          this.objetoVariablesGlobales.bodegas = bodegas[0];
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop('error', 'ERROR', 'Revisa tu conexion o intentalo mas tarde');
          // Manejar errores
        }
      );
  }




}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesPuntoEmision {
  bodegas: BodegaInterface[];

}

export interface ConfiguracionFormluarioPuntoEmision {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
  SecuencialActual?: ConfiguracionDisabledInterfaz;
  EnUso?: ConfiguracionDisabledInterfaz;
  Bodega?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_PUNTOEMISION = (): ConfiguracionFormluarioPuntoEmision => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Nombre: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Codigo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    SecuencialActual: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    EnUso: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Bodega: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
