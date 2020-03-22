
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
import {DatosUsuario} from './datos-usuario';
import {DatosUsuarioFormulario} from './datos-usuario-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {validarCedulaIngresada} from '../../funciones/validar-cedula-ingresada';


@Component({
  selector: 'app-datos-usuario-formulario',
  templateUrl: './datos-usuario-formulario.component.html'
})

export class DatosUsuarioFormularioComponent implements OnInit {

  @Output() datosUsuarioValido: EventEmitter<DatosUsuario | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDatosUsuario;

  datosUsuario: DatosUsuarioFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  cedulaValida = true;

  telefonoValido = false;

  objetoVariablesGlobales: ObjetoVariablesGlobalesDatosUsuario = {

  };

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,
  ) {

  }

  ngOnInit() {

    this.datosUsuario = new DatosUsuarioFormulario(
      this.configuracionDisabled.Nombres.valor,
      this.configuracionDisabled.Apellidos.valor,
      this.configuracionDisabled.IdentificacionPais.valor,
      this.configuracionDisabled.Email.valor,
      this.configuracionDisabled.Direccion.valor,
      this.configuracionDisabled.Celular.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas
    if (this.configuracionDisabled.Celular.valor) {
      this.verificarTelefono(this.configuracionDisabled.Celular.valor);
    }

    establecerCamposDisabled(this.configuracionDisabled, this.datosUsuario);
    this.datosUsuario.formGroup = this._formBuilder.group(encerarFormBuilder(this.datosUsuario));
    generarMensajesFormGroup(this.configuracionDisabled, this.datosUsuario);
    generarEmiteEmpezoTipear(this.datosUsuario, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this._escucharFormulario();
    this._escucharCampoCedula();
    this.escucharTelefono();
  }

  private escucharTelefono() {
    this.datosUsuario
      .formGroup
      .get('celular')
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe( campoTelefono => {
        this.verificarTelefono(campoTelefono);
      });
  }
  private _escucharFormulario() {
    this.datosUsuario.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.datosUsuario.formGroup);
        this.mensajeToaster = '';
        if (this.datosUsuario.formGroup.valid && this.validacionesCampos()) {
          this.datosUsuarioValido.emit(generarCampos(this.datosUsuario));
          this._toasterService.pop('info', 'Válido', 'Datos usuario válido ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.datosUsuarioValido.emit(false);
        }
      });
  }

  private _escucharCampoCedula() {
    this.datosUsuario.formGroup
      .get('identificacionPais')
      .valueChanges.pipe(debounceTime(1500))
      .subscribe(valor => {
        if (valor) {
          const cedulaValida = validarCedulaIngresada(valor);
          this.cedulaValida = cedulaValida ? true : false;
          this.mensajeToaster = cedulaValida
            ? ''
            : 'La cédula debe tener 10 dígitos';
          if (!cedulaValida) {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.cedulaValida && this.telefonoValido;
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }


  private verificarTelefono(campoTelefono: string) {
    if (campoTelefono.length < 10) {
      this._toasterService.pop('warning', 'Cuidado', 'No tiene 10 dígitos');
      this.telefonoValido = false;
    } else {
      this.telefonoValido = true;
    }
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesDatosUsuario {

}

export interface ConfiguracionFormluarioDatosUsuario {
  Id?: ConfiguracionDisabledInterfaz;
  Nombres?: ConfiguracionDisabledInterfaz;
  Apellidos?: ConfiguracionDisabledInterfaz;
  IdentificacionPais?: ConfiguracionDisabledInterfaz;
  Email?: ConfiguracionDisabledInterfaz;
  Direccion?: ConfiguracionDisabledInterfaz;
  Celular?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DATOSUSUARIO = (): ConfiguracionFormluarioDatosUsuario => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Nombres: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Apellidos: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    IdentificacionPais: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Email: {
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

    Celular: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
