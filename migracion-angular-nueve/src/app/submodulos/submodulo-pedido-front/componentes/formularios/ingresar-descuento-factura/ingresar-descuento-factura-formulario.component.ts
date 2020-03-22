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
import {IngresarDescuentoFactura} from './ingresar-descuento-factura';
import {IngresarDescuentoFacturaFormulario} from './ingresar-descuento-factura-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {DescuentoInterface} from '../../../interfaces/descuento.interface';
import {CurrencyMaskConfig} from 'ng2-currency-mask/src/currency-mask.config';


@Component({
  selector: 'ml-ingresar-descuento-factura-formulario',
  templateUrl: './ingresar-descuento-factura-formulario.component.html'
})

export class IngresarDescuentoFacturaFormularioComponent implements OnInit {

  @Output() ingresarDescuentoFacturaValido: EventEmitter<IngresarDescuentoFactura | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Output() enviarDatosFormulario: EventEmitter<DescuentoInterface> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioIngresarDescuentoFactura;

  @Input() totalBrutoArticulo: number;

  // @Input() base: number;
  @Input() base;

  ingresarDescuentoFactura: IngresarDescuentoFacturaFormulario;

  valorIngresado: string;

  descuentoPorcentualIngresado: string;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesIngresarDescuentoFactura = {};

  opcionesCurrencyMask: CurrencyMaskConfig =
    {prefix: '$ ', thousands: ',', decimal: '.', align: 'center', allowNegative: false, precision: 4, suffix: ' USD'};

  opcionesPorcentajeMask: CurrencyMaskConfig =
    {prefix: '', thousands: ',', decimal: '.', align: 'center', allowNegative: false, precision: 4, suffix: ' %'};

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,
  ) {

  }

  ngOnInit() {
    this.ingresarDescuentoFactura = new IngresarDescuentoFacturaFormulario(
      this.configuracionDisabled.Motivo.valor,
      this.configuracionDisabled.DescuentoPorcentual.valor,
      this.configuracionDisabled.Valor.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas
    establecerCamposDisabled(this.configuracionDisabled, this.ingresarDescuentoFactura);
    this.ingresarDescuentoFactura.formGroup = this._formBuilder.group(encerarFormBuilder(this.ingresarDescuentoFactura));
    generarMensajesFormGroup(this.configuracionDisabled, this.ingresarDescuentoFactura);
    generarEmiteEmpezoTipear(this.ingresarDescuentoFactura, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.valorIngresado = this.configuracionDisabled.Valor.valor ? this.configuracionDisabled.Valor.valor : '0';
    // tslint:disable-next-line:max-line-length
    this.descuentoPorcentualIngresado = this.configuracionDisabled.DescuentoPorcentual.valor ? this.configuracionDisabled.DescuentoPorcentual.valor : '0';

    this.ingresarDescuentoFactura
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1500)
      )
      .subscribe(
        camposValidados => {
          this.mensajeToaster = '';
          const valorIgualBase = this.base === +(this.ingresarDescuentoFactura.formGroup.get('descuentoPorcentual').value);
          if (this.ingresarDescuentoFactura.formGroup.valid && this.validacionesCampos() && !valorIgualBase) {
            this.ingresarDescuentoFacturaValido.emit(generarCampos(this.ingresarDescuentoFactura));
            this._toasterService.pop('info', 'Valido', 'IngresarDescuentoFactura válida ');
          } else {
            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
            }
            this.ingresarDescuentoFacturaValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  calcularValorDescuento() {
      setTimeout(() => {
        console.log('se va a cambiar el descuento');
        const descuento = (((this.base) * (+this.descuentoPorcentualIngresado / 100)).toFixed(4));
        if (this.base === 0) {
          this.valorIngresado = ((this.totalBrutoArticulo) * (+this.descuentoPorcentualIngresado / 100)).toString();
        } else {
          this.valorIngresado = descuento.toString();
        }
      }, 1500);
  }

  calcularPorcentajeDescuento() {
      setTimeout(() => {
        console.log('se va a cambiar el valor');
        const descuentoPorcentual = (+this.valorIngresado * 100 / this.base).toFixed(4);
        if (this.base === 0) {
          this.descuentoPorcentualIngresado = (+this.valorIngresado * 100 / this.totalBrutoArticulo).toString();
        } else {
          this.descuentoPorcentualIngresado = descuentoPorcentual.toString();
        }
      }, 1500);
    }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesIngresarDescuentoFactura {

}

export interface ConfiguracionFormluarioIngresarDescuentoFactura {
  Id?: ConfiguracionDisabledInterfaz;
  Motivo?: ConfiguracionDisabledInterfaz;
  DescuentoPorcentual?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_INGRESARDESCUENTOFACTURA = (): ConfiguracionFormluarioIngresarDescuentoFactura => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Motivo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    DescuentoPorcentual: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Valor: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
