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
import { Precio } from './precio';
import { PrecioFormulario } from './precio-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-precio-formulario',
  templateUrl: './precio-formulario.component.html',
})
export class PrecioFormularioComponent implements OnInit {
  @Output() precioValido: EventEmitter<Precio | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioPrecio;

  precio: PrecioFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesPrecio = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.precio = new PrecioFormulario(
      this.configuracionDisabled.Valor.valor,
      this.configuracionDisabled.ValorIncentivo.valor,
      this.configuracionDisabled.EsPrincipal.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.precio);
    this.precio.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.precio),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.precio);
    generarEmiteEmpezoTipear(this.precio, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.precio.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.precio.formGroup.valid && this.validacionesCampos()) {
          this.precioValido.emit(generarCampos(this.precio));
          this._toasterService.pop('info', 'Valido', 'Precio válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.precioValido.emit(false);
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
interface ObjetoVariablesGlobalesPrecio {}

export interface ConfiguracionFormluarioPrecio {
  Id?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
  ValorIncentivo?: ConfiguracionDisabledInterfaz;
  EsPrincipal?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_PRECIO = (): ConfiguracionFormluarioPrecio => {
  return {
    Id: {
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

    ValorIncentivo: {
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
