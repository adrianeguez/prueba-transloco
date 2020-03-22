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
import { Movimiento } from './movimiento';
import { MovimientoFormulario } from './movimiento-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-movimiento-formulario',
  templateUrl: './movimiento-formulario.component.html',
})
export class MovimientoFormularioComponent implements OnInit {
  @Output() movimientoValido: EventEmitter<
    Movimiento | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioMovimiento;

  movimiento: MovimientoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesMovimiento = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.movimiento = new MovimientoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Codigo.valor,
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.Numero.valor,
      this.configuracionDisabled.NumeroInventario.valor,
      this.configuracionDisabled.NombreReferencia.valor,
      this.configuracionDisabled.FormaNumerar.valor,
      this.configuracionDisabled.FactorStock.valor,
      this.configuracionDisabled.AfectaCostoPromedio.valor,
      this.configuracionDisabled.AfectaCostoUltimo.valor,
      this.configuracionDisabled.AfectaCostoUltimaTransaccion.valor,
      this.configuracionDisabled.CobrarIVA.valor,
      this.configuracionDisabled.RetencionIVA.valor,
      this.configuracionDisabled.RetencionRenta.valor,
      this.configuracionDisabled.FormaValorarInventario.valor,
      this.configuracionDisabled.AfectaDatosUltimaCompra.valor,
      this.configuracionDisabled.AfectaDatosUltimaVenta.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.movimiento);
    this.movimiento.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.movimiento),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.movimiento);
    generarEmiteEmpezoTipear(this.movimiento, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.movimiento.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.movimiento.formGroup);

        this.mensajeToaster = '';

        if (this.movimiento.formGroup.valid && this.validacionesCampos()) {
          this.movimientoValido.emit(generarCampos(this.movimiento));
          this._toasterService.pop('info', 'Valido', 'Movimiento válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.movimientoValido.emit(false);
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
interface ObjetoVariablesGlobalesMovimiento {}

export interface ConfiguracionFormluarioMovimiento {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  Numero?: ConfiguracionDisabledInterfaz;
  NumeroInventario?: ConfiguracionDisabledInterfaz;
  NombreReferencia?: ConfiguracionDisabledInterfaz;
  FormaNumerar?: ConfiguracionDisabledInterfaz;
  FactorStock?: ConfiguracionDisabledInterfaz;
  AfectaCostoPromedio?: ConfiguracionDisabledInterfaz;
  AfectaCostoUltimo?: ConfiguracionDisabledInterfaz;
  AfectaCostoUltimaTransaccion?: ConfiguracionDisabledInterfaz;
  CobrarIVA?: ConfiguracionDisabledInterfaz;
  RetencionIVA?: ConfiguracionDisabledInterfaz;
  RetencionRenta?: ConfiguracionDisabledInterfaz;
  FormaValorarInventario?: ConfiguracionDisabledInterfaz;
  AfectaDatosUltimaCompra?: ConfiguracionDisabledInterfaz;
  AfectaDatosUltimaVenta?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_MOVIMIENTO = (): ConfiguracionFormluarioMovimiento => {
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

    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Numero: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    NumeroInventario: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    NombreReferencia: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    FormaNumerar: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    FactorStock: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    AfectaCostoPromedio: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    AfectaCostoUltimo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    AfectaCostoUltimaTransaccion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    CobrarIVA: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    RetencionIVA: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    RetencionRenta: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    FormaValorarInventario: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    AfectaDatosUltimaCompra: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    AfectaDatosUltimaVenta: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
