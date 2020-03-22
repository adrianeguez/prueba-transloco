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
import { DepartamentoEmpresa } from './departamento-empresa';
import { DepartamentoEmpresaFormulario } from './departamento-empresa-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-departamento-empresa-formulario',
  templateUrl: './departamento-empresa-formulario.component.html',
})
export class DepartamentoEmpresaFormularioComponent implements OnInit {
  @Output() departamentoEmpresaValido: EventEmitter<
    DepartamentoEmpresa | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDepartamentoEmpresa;

  departamentoEmpresa: DepartamentoEmpresaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesDepartamentoEmpresa = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.departamentoEmpresa = new DepartamentoEmpresaFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.Nivel.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(
      this.configuracionDisabled,
      this.departamentoEmpresa,
    );
    this.departamentoEmpresa.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.departamentoEmpresa),
    );
    generarMensajesFormGroup(
      this.configuracionDisabled,
      this.departamentoEmpresa,
    );
    generarEmiteEmpezoTipear(this.departamentoEmpresa, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.departamentoEmpresa.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (
          this.departamentoEmpresa.formGroup.valid &&
          this.validacionesCampos()
        ) {
          this.departamentoEmpresaValido.emit(
            generarCampos(this.departamentoEmpresa),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Departamento de empresa válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.departamentoEmpresaValido.emit(false);
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
interface ObjetoVariablesGlobalesDepartamentoEmpresa {}

export interface ConfiguracionFormluarioDepartamentoEmpresa {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  Nivel?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DEPARTAMENTOEMPRESA = (): ConfiguracionFormluarioDepartamentoEmpresa => {
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

    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Nivel: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
