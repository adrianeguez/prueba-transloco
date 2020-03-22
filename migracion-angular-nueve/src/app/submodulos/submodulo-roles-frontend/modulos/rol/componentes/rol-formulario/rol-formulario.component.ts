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
import { Rol } from './rol';
import { RolFormulario } from './rol-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-rol-formulario',
  templateUrl: './rol-formulario.component.html',
})
export class RolFormularioComponent implements OnInit {
  @Output() rolValido: EventEmitter<Rol | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioRol;

  rol: RolFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesRol = {};

  constructor(
    private _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.rol = new RolFormulario(this.configuracionDisabled.Nombre.valor);

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.rol);
    this.rol.formGroup = this._formBuilder.group(encerarFormBuilder(this.rol));
    generarMensajesFormGroup(this.configuracionDisabled, this.rol);
    generarEmiteEmpezoTipear(this.rol, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.rol.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.rol.formGroup);

        this.mensajeToaster = '';

        if (this.rol.formGroup.valid && this.validacionesCampos()) {
          this.rolValido.emit(generarCampos(this.rol));
          this._toasterService.pop('info', 'Valido', 'Rol válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.rolValido.emit(false);
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
interface ObjetoVariablesGlobalesRol {}

export interface ConfiguracionFormluarioRol {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Estado?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_ROL = (): ConfiguracionFormluarioRol => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    Nombre: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Estado: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
