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
import {Direccion} from './direccion';
import {DireccionFormulario} from './direccion-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {LugarRestService} from '../../../../../../submodulo-vendedor-front/servicios/rest/lugar-rest.service';
import {LugarInterface} from '../../../../../../submodulo-vendedor-front/interfaces/lugar-interface';


@Component({
  selector: 'ml-direccion-formulario',
  templateUrl: './direccion-formulario.component.html'
})

export class DireccionFormularioComponent implements OnInit {

  @Output() direccionValido: EventEmitter<Direccion | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDireccion;

  direccion: DireccionFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesDireccion = {

    lugars: [],
  };

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,
              private _lugarRestService: LugarRestService,
  ) {

  }

  ngOnInit() {

    this.direccion = new DireccionFormulario(
      this.configuracionDisabled.NumeroCalle.valor,
      this.configuracionDisabled.CallePrincipal.valor,
      this.configuracionDisabled.CalleSecundaria.valor,
      this.configuracionDisabled.NombreEdificio.valor,
      this.configuracionDisabled.Piso.valor,
      this.configuracionDisabled.Lugar.valor,
      this.configuracionDisabled.Referencia.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.direccion);
    this.direccion.formGroup = this._formBuilder.group(encerarFormBuilder(this.direccion));
    generarMensajesFormGroup(this.configuracionDisabled, this.direccion);
    generarEmiteEmpezoTipear(this.direccion, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.direccion
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {
          this.mensajeToaster = '';

          if (this.validacionesCampos() && this.direccion.formGroup.valid) {

            this.direccionValido.emit(generarCampos(this.direccion));
            this._toasterService.pop('info', 'Valido', 'Direccion válida ');

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
            }
            this.direccionValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarLugar();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }


  validarLugar() {
    if (this.direccion.formGroup.get('lugar').value !== null) {
      const lugarActual = this.direccion.formGroup.get(
        'lugar',
      ).value.id;
      const lugarEncontrado = this.objetoVariablesGlobales.lugars.find(
        registro => registro.id === lugarActual,
      );
      if (lugarEncontrado || lugarActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione un lugar válido';
        return false;
      }
    }
  }

  buscarLugars(evento) {
    this._cargandoService.habilitarCargando();
    let lugars$;
    if (evento.query === '') {
      lugars$ = this._lugarRestService
        .obtenerNodosFinales(1);
    } else {
      lugars$ = this._lugarRestService
        .obtenerNodosFinales(evento.query);
    }
    lugars$
      .subscribe(
        (lugars: LugarInterface[]) => {
          this.objetoVariablesGlobales.lugars = lugars;
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(
            {
              error,
              mensaje: 'Revisa tu conexion o intentalo mas tarde',
              data: {
                evento
              }
            }
          );
          this._toasterService.pop(
            'error',
            'ERROR',
            'Revisa tu conexion o intentalo mas tarde'
          );
          // Manejar errores
        }
      );
  }


}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesDireccion {
  lugars: LugarInterface[];

}

export interface ConfiguracionFormluarioDireccion {
  Id?: ConfiguracionDisabledInterfaz;
  NumeroCalle?: ConfiguracionDisabledInterfaz;
  CallePrincipal?: ConfiguracionDisabledInterfaz;
  CalleSecundaria?: ConfiguracionDisabledInterfaz;
  NombreEdificio?: ConfiguracionDisabledInterfaz;
  Piso?: ConfiguracionDisabledInterfaz;
  Lugar?: ConfiguracionDisabledInterfaz;
  Referencia?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DIRECCION = (): ConfiguracionFormluarioDireccion => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    NumeroCalle: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    CallePrincipal: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    CalleSecundaria: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    NombreEdificio: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Piso: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Lugar: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Referencia: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
