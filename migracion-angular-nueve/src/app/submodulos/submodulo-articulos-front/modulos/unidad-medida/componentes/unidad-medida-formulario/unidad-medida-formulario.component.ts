import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  establecerCamposDisabled,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  NO_EXISTEN_REGISTROS,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { debounceTime } from 'rxjs/operators';
import { UnidadMedida } from './unidad-medida';
import { UnidadMedidaFormulario } from './unidad-medida-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-unidad-medida-formulario',
  templateUrl: './unidad-medida-formulario.component.html',
})
export class UnidadMedidaFormularioComponent implements OnInit {
  @Output() unidadMedidaValido: EventEmitter<
    UnidadMedida | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioUnidadMedida;

  unidadMedida: UnidadMedidaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesUnidadMedida = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.unidadMedida = new UnidadMedidaFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Abreviacion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.unidadMedida);
    this.unidadMedida.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.unidadMedida),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.unidadMedida);
    generarEmiteEmpezoTipear(this.unidadMedida, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.unidadMedida.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.unidadMedida.formGroup.valid && this.validacionesCampos()) {
          this.unidadMedidaValido.emit(generarCampos(this.unidadMedida));
          this._toasterService.pop('info', 'Valido', 'Unidad de medida válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.unidadMedidaValido.emit(false);
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
interface ObjetoVariablesGlobalesUnidadMedida {}

export interface ConfiguracionFormluarioUnidadMedida {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Abreviacion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_UNIDADMEDIDA = (): ConfiguracionFormluarioUnidadMedida => {
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

    Abreviacion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
