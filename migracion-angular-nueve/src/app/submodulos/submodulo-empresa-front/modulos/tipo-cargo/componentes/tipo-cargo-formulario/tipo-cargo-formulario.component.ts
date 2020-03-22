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
import { TipoCargo } from './tipo-cargo';
import { TipoCargoFormulario } from './tipo-cargo-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-tipo-cargo-formulario',
  templateUrl: './tipo-cargo-formulario.component.html',
})
export class TipoCargoFormularioComponent implements OnInit {
  @Output() tipoCargoValido: EventEmitter<
    TipoCargo | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioTipoCargo;

  tipoCargo: TipoCargoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesTipoCargo = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.tipoCargo = new TipoCargoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Codigo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.tipoCargo);
    this.tipoCargo.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.tipoCargo),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.tipoCargo);
    generarEmiteEmpezoTipear(this.tipoCargo, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.tipoCargo.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.tipoCargo.formGroup.valid && this.validacionesCampos()) {
          this.tipoCargoValido.emit(generarCampos(this.tipoCargo));
          this._toasterService.pop('info', 'Valido', 'Tipo de cargo válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.tipoCargoValido.emit(false);
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
interface ObjetoVariablesGlobalesTipoCargo {}

export interface ConfiguracionFormluarioTipoCargo {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TIPOCARGO = (): ConfiguracionFormluarioTipoCargo => {
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

    Codigo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
