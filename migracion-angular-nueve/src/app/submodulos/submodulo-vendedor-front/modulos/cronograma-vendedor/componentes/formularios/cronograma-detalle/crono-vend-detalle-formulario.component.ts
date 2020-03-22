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
  NO_EXISTEN_REGISTROS,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CronoVendDetalle} from './crono-vend-detalle';
import {CronoVendDetalleFormulario} from './crono-vend-detalle-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {RutaClienteRestService} from '../../../../../servicios/rest/ruta-cliente-rest.service';
import {RutaClienteInterface} from '../../../../../interfaces/ruta-cliente-interface';

@Component({
  selector: 'app-crono-vend-detalle-formulario',
  templateUrl: './crono-vend-detalle-formulario.component.html',
})
export class CronoVendDetalleFormularioComponent implements OnInit {
  @Output() cronoVendDetalleValido: EventEmitter<CronoVendDetalle | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCronoVendDetalle;

  @Input() idRuta: number;

  cronoVendDetalle: CronoVendDetalleFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCronoVendDetalle = {
    rutaClientes: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _rutaClienteRestService: RutaClienteRestService,
  ) {
  }

  ngOnInit() {
    if (this.configuracionDisabled.Fecha.valor) {
      const fechasDatos = this.configuracionDisabled.Fecha.valor.split('-');
      this.configuracionDisabled.Fecha.valor = {
        year: Number(fechasDatos[0]),
        month: Number(fechasDatos[1]),
        day: Number(fechasDatos[2]),
      };
    }

    this.cronoVendDetalle = new CronoVendDetalleFormulario(
      this.configuracionDisabled.Orden.valor,
      this.configuracionDisabled.Fecha.valor,
      this.configuracionDisabled.Lunes.valor,
      this.configuracionDisabled.Martes.valor,
      this.configuracionDisabled.Miercoles.valor,
      this.configuracionDisabled.Jueves.valor,
      this.configuracionDisabled.Viernes.valor,
      this.configuracionDisabled.Sabado.valor,
      this.configuracionDisabled.Domingo.valor,
      this.configuracionDisabled.HoraVisita.valor,
      this.configuracionDisabled.RutaCliente.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.cronoVendDetalle);
    this.cronoVendDetalle.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.cronoVendDetalle),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.cronoVendDetalle);
    generarEmiteEmpezoTipear(this.cronoVendDetalle, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.cronoVendDetalle.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.cronoVendDetalle.formGroup);

        this.mensajeToaster = '';

        if (
          this.cronoVendDetalle.formGroup.valid &&
          this.validacionesCampos()
        ) {
          this.cronoVendDetalleValido.emit(
            generarCampos(this.cronoVendDetalle),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Cronograma vendedor detalle válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.cronoVendDetalleValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarRutaCliente();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarRutaCliente() {
    const rutaClienteValorActual = this.cronoVendDetalle.formGroup.get(
      'rutaCliente',
    ).value.id;
    let rutaClienteEncontrado = this.objetoVariablesGlobales.rutaClientes.find(
      registro => registro.id === rutaClienteValorActual,
    );
    if (typeof this.cronoVendDetalle !== 'object') {
      rutaClienteEncontrado = {};
    }
    if (rutaClienteEncontrado || typeof rutaClienteValorActual === 'number') {
      return true;
    } else {
      this.mensajeToaster = 'Seleccione un rutaCliente válido';
      return false;
    }
  }

  buscarRutaClientes(evento) {
    this._cargandoService.habilitarCargando();
    let rutaClientes$;
    if (evento.query === '') {
      const consulta = {
        // lenar la consulta
        camposABuscar: [{campo: 'habilitado', valor: `1`}],
        relations: [
          {
            key: 'ruta',
            entidad: 'ruta',
            query: [
              {
                campo: 'id',
                valor: `${this.idRuta}`,
              },
            ],
          },
          {
            key: 'edificio',
            entidad: 'edificio',
            query: [
              {
                campo: 'habilitado',
                valor: `1`,
              },
            ],
          },
        ],
      };
      rutaClientes$ = this._rutaClienteRestService.findWhereOr(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    } else {
      const consulta = {
        // lenar la consulta
        camposABuscar: [{campo: 'habilitado', valor: `1`}],
        relations: [
          {
            key: 'edificio',
            entidad: 'edificio',
            query: [
              {
                campo: 'nombre',
                valor: `%25${evento.query}%25`,
                like: true,
              },
            ],
          },
          {
            key: 'ruta',
            entidad: 'ruta',
            query: [
              {
                campo: 'id',
                valor: `${this.idRuta}`,
              },
            ],
          },
        ],
      };
      rutaClientes$ = this._rutaClienteRestService.findWhereOr(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }
    rutaClientes$.subscribe(
      (rutaClientes: [RutaClienteInterface[], number]) => {
        this.objetoVariablesGlobales.rutaClientes = rutaClientes[0];
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
interface ObjetoVariablesGlobalesCronoVendDetalle {
  rutaClientes: RutaClienteInterface[];
}

export interface ConfiguracionFormluarioCronoVendDetalle {
  Id?: ConfiguracionDisabledInterfaz;
  Orden?: ConfiguracionDisabledInterfaz;
  Fecha?: ConfiguracionDisabledInterfaz;
  Lunes?: ConfiguracionDisabledInterfaz;
  Martes?: ConfiguracionDisabledInterfaz;
  Miercoles?: ConfiguracionDisabledInterfaz;
  Jueves?: ConfiguracionDisabledInterfaz;
  Viernes?: ConfiguracionDisabledInterfaz;
  Sabado?: ConfiguracionDisabledInterfaz;
  Domingo?: ConfiguracionDisabledInterfaz;
  HoraVisita?: ConfiguracionDisabledInterfaz;
  RutaCliente?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CRONOVENDDETALLE = (): ConfiguracionFormluarioCronoVendDetalle => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    Orden: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Fecha: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Lunes: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Martes: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Miercoles: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Jueves: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Viernes: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Sabado: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Domingo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    HoraVisita: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    RutaCliente: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
