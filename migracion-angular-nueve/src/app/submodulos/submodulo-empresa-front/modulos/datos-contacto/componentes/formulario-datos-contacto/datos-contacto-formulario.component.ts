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
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { DatosContacto } from './datos-contacto';
import { DatosContactoFormulario } from './datos-contacto-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-datos-contacto-formulario',
  templateUrl: './datos-contacto-formulario.component.html',
})
export class DatosContactoFormularioComponent implements OnInit {
  @Output() datosContactoValido: EventEmitter<
    DatosContacto | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDatosContacto;

  datosContacto: DatosContactoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesDatosContacto = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.datosContacto = new DatosContactoFormulario(
      this.configuracionDisabled.Telefono.valor,
      this.configuracionDisabled.Celular.valor,
      this.configuracionDisabled.Email.valor,
      this.configuracionDisabled.Fax.valor,
      this.configuracionDisabled.EsPrincipal.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.datosContacto);
    this.datosContacto.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.datosContacto),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.datosContacto);
    generarEmiteEmpezoTipear(this.datosContacto, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.datosContacto.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.datosContacto.formGroup.valid && this.validacionesCampos()) {
          this.datosContactoValido.emit(generarCampos(this.datosContacto));
          this._toasterService.pop('info', 'Valido', 'Datos de contacto válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.datosContactoValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesDatosContacto {}

export interface ConfiguracionFormluarioDatosContacto {
  Id?: ConfiguracionDisabledInterfaz;
  Telefono?: ConfiguracionDisabledInterfaz;
  Celular?: ConfiguracionDisabledInterfaz;
  Email?: ConfiguracionDisabledInterfaz;
  Fax?: ConfiguracionDisabledInterfaz;
  EsPrincipal?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DATOSCONTACTO = (): ConfiguracionFormluarioDatosContacto => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    Telefono: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Celular: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Email: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Fax: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    EsPrincipal: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
