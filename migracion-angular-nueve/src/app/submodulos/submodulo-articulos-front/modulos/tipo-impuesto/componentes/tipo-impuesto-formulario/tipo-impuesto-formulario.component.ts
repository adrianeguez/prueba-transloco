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
import { TipoImpuesto } from './tipo-impuesto';
import { TipoImpuestoFormulario } from './tipo-impuesto-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-tipo-impuesto-formulario',
  templateUrl: './tipo-impuesto-formulario.component.html',
})
export class TipoImpuestoFormularioComponent implements OnInit {
  @Output() tipoImpuestoValido: EventEmitter<
    TipoImpuesto | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioTipoImpuesto;

  tipoImpuesto: TipoImpuestoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesTipoImpuesto = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.tipoImpuesto = new TipoImpuestoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Siglas.valor,
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.CodigoSri.valor,
      this.configuracionDisabled.Codigo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.tipoImpuesto);
    this.tipoImpuesto.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.tipoImpuesto),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.tipoImpuesto);
    generarEmiteEmpezoTipear(this.tipoImpuesto, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.tipoImpuesto.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.tipoImpuesto.formGroup.valid && this.validacionesCampos()) {
          this.tipoImpuestoValido.emit(generarCampos(this.tipoImpuesto));
          this._toasterService.pop('info', 'Valido', 'Tipo de impuesto válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.tipoImpuestoValido.emit(false);
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
interface ObjetoVariablesGlobalesTipoImpuesto {}

export interface ConfiguracionFormluarioTipoImpuesto {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Siglas?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  CodigoSri?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TIPOIMPUESTO = (): ConfiguracionFormluarioTipoImpuesto => {
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

    Siglas: {
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

    CodigoSri: {
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
