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
import { Subgrupo } from './subgrupo';
import { SubgrupoFormulario } from './subgrupo-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-subgrupo-formulario',
  templateUrl: './subgrupo-formulario.component.html',
})
export class SubgrupoFormularioComponent implements OnInit {
  @Output() subgrupoValido: EventEmitter<
    Subgrupo | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioSubgrupo;

  subgrupo: SubgrupoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesSubgrupo = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.subgrupo = new SubgrupoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.EmpresaProductora.valor,
      this.configuracionDisabled.Codigo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.subgrupo);
    this.subgrupo.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.subgrupo),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.subgrupo);
    generarEmiteEmpezoTipear(this.subgrupo, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.subgrupo.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.subgrupo.formGroup);

        this.mensajeToaster = '';

        if (this.subgrupo.formGroup.valid && this.validacionesCampos()) {
          this.subgrupoValido.emit(generarCampos(this.subgrupo));
          this._toasterService.pop('info', 'Valido', 'Subgrupo válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.subgrupoValido.emit(false);
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
interface ObjetoVariablesGlobalesSubgrupo {}

export interface ConfiguracionFormluarioSubgrupo {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  EmpresaProductora?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_SUBGRUPO = (): ConfiguracionFormluarioSubgrupo => {
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

    EmpresaProductora: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Codigo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
