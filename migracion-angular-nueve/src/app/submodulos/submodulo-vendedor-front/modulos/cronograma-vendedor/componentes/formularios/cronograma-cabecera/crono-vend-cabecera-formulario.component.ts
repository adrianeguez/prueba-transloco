import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  establecerCamposDisabled,
  NO_EXISTEN_REGISTROS,
  RutaInterface,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CronoVendCabecera } from './crono-vend-cabecera';
import { CronoVendCabeceraFormulario } from './crono-vend-cabecera-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';
import { RutaRestService } from '../../../../../servicios/rest/ruta-rest.service';

@Component({
  selector: 'app-crono-vend-cabecera-formulario',
  templateUrl: './crono-vend-cabecera-formulario.component.html',
})
export class CronoVendCabeceraFormularioComponent implements OnInit {
  @Output() cronoVendCabeceraValido: EventEmitter<
    CronoVendCabecera | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCronoVendCabecera;

  @Input() idEmpresa: number;

  cronoVendCabecera: CronoVendCabeceraFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCronoVendCabecera = {
    rutas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _rutaRestService: RutaRestService,
  ) {}

  ngOnInit() {
    this.cronoVendCabecera = new CronoVendCabeceraFormulario(
      this.configuracionDisabled.NombreCronograma.valor,
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.Ruta.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(
      this.configuracionDisabled,
      this.cronoVendCabecera,
    );
    this.cronoVendCabecera.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.cronoVendCabecera),
    );
    generarMensajesFormGroup(
      this.configuracionDisabled,
      this.cronoVendCabecera,
    );
    generarEmiteEmpezoTipear(this.cronoVendCabecera, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.cronoVendCabecera.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.cronoVendCabecera.formGroup);

        this.mensajeToaster = '';

        if (
          this.cronoVendCabecera.formGroup.valid &&
          this.validacionesCampos()
        ) {
          this.cronoVendCabeceraValido.emit(
            generarCampos(this.cronoVendCabecera),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Cronograma vendedor cabecera válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.cronoVendCabeceraValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarRuta();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarRuta() {
    console.log('validar ruta', this.cronoVendCabecera);
    const rutaValorActual = this.cronoVendCabecera.formGroup.get('ruta').value
      .id;
    let rutaEncontrado = this.objetoVariablesGlobales.rutas.find(
      registro => registro.id === rutaValorActual,
    );
    if (typeof this.cronoVendCabecera !== 'object') {
      rutaEncontrado = {};
    }
    if (rutaEncontrado || typeof rutaValorActual === 'number') {
      return true;
    } else {
      this.mensajeToaster = 'Seleccione una ruta válido';
      return false;
    }
  }

  buscarRutas(evento) {
    this._cargandoService.habilitarCargando();
    let rutas$;
    if (evento.query === '') {
      const consulta = {
        // lenar la consulta
        camposABuscar: [{ campo: 'habilitado', valor: `1` }],
        relations: [
          {
            key: 'empresa',
            entidad: 'empresa',
            query: [
              {
                campo: 'id',
                valor: `${this.idEmpresa}`,
              },
            ],
          },
        ],
      };
      rutas$ = this._rutaRestService.findWhereOr(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    } else {
      const consulta = {
        // lenar la consulta
        camposABuscar: [{ campo: 'nombre', valor: `%25${evento.query}%25` }],
        relations: [
          {
            key: 'empresa',
            entidad: 'empresa',
            query: [
              {
                campo: 'id',
                valor: `${this.idEmpresa}`,
              },
            ],
          },
        ],
      };
      rutas$ = this._rutaRestService.findWhereOr(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }
    rutas$.subscribe(
      (rutas: any[]) => {
        this.objetoVariablesGlobales.rutas = rutas[0];
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(
          'error',
          'ERROR',
          'Revisa tu conexion o intentalo mas tarde',
        );
        // Manejar errores
      },
    );
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesCronoVendCabecera {
  rutas: any[];
}

export interface ConfiguracionFormluarioCronoVendCabecera {
  Id?: ConfiguracionDisabledInterfaz;
  NombreCronograma?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  Ruta?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CRONOVENDCABECERA = (): ConfiguracionFormluarioCronoVendCabecera => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    NombreCronograma: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Ruta: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
