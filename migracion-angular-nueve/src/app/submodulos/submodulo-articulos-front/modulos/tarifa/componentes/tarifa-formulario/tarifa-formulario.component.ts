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
import { Tarifa } from './tarifa';
import { TarifaFormulario } from './tarifa-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-tarifa-formulario',
  templateUrl: './tarifa-formulario.component.html',
})
export class TarifaFormularioComponent implements OnInit {
  @Output() tarifaValido: EventEmitter<Tarifa | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioTarifa;

  tarifa: TarifaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesTarifa = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.tarifa = new TarifaFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.CodigoSri.valor,
      this.configuracionDisabled.Codigo.valor,
      this.configuracionDisabled.UnidadMedida.valor,
      this.configuracionDisabled.Cantidad.valor,
      this.configuracionDisabled.ValorPorcentaje.valor,
      this.configuracionDisabled.Valor.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.tarifa);
    this.tarifa.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.tarifa),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.tarifa);
    generarEmiteEmpezoTipear(this.tarifa, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.tarifa.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.tarifa.formGroup.valid && this.validacionesCampos()) {
          this.tarifaValido.emit(generarCampos(this.tarifa));
          this._toasterService.pop('info', 'Valido', 'Tarifa válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.tarifaValido.emit(false);
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
interface ObjetoVariablesGlobalesTarifa {}

export interface ConfiguracionFormluarioTarifa {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  CodigoSri?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
  UnidadMedida?: ConfiguracionDisabledInterfaz;
  Cantidad?: ConfiguracionDisabledInterfaz;
  ValorPorcentaje?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TARIFA = (): ConfiguracionFormluarioTarifa => {
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

    UnidadMedida: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Cantidad: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    ValorPorcentaje: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Valor: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
