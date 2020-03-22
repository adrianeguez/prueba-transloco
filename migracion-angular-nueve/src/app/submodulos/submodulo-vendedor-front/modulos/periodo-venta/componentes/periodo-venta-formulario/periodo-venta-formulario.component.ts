import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { PeriodoVenta } from './periodo-venta';
import { PeriodoVentaFormulario } from './periodo-venta-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-periodo-venta-formulario',
  templateUrl: './periodo-venta-formulario.component.html',
})
export class PeriodoVentaFormularioComponent implements OnInit {
  @Output() periodoVentaValido: EventEmitter<
    PeriodoVenta | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioPeriodoVenta;

  periodoVenta: PeriodoVentaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesPeriodoVenta = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.periodoVenta = new PeriodoVentaFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.FechaInicio.valor,
      this.configuracionDisabled.FechaFin.valor,
      this.configuracionDisabled.Meta.valor,
      this.configuracionDisabled.Descripcion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.periodoVenta);
    this.periodoVenta.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.periodoVenta),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.periodoVenta);
    generarEmiteEmpezoTipear(this.periodoVenta, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.periodoVenta.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {

        this.mensajeToaster = '';

        if (this.periodoVenta.formGroup.valid && this.validacionesCampos()) {
          this.periodoVentaValido.emit(generarCampos(this.periodoVenta));
          this._toasterService.pop('info', 'Valido', 'Periodo venta válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.periodoVentaValido.emit(false);
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
interface ObjetoVariablesGlobalesPeriodoVenta {}

export interface ConfiguracionFormluarioPeriodoVenta {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  FechaInicio?: ConfiguracionDisabledInterfaz;
  FechaFin?: ConfiguracionDisabledInterfaz;
  Meta?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_PERIODOVENTA = (): ConfiguracionFormluarioPeriodoVenta => {
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

    FechaInicio: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    FechaFin: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Meta: {
      valor: null,
      disabled: false,
      hidden: true,
      calculoFormulario: undefined,
    },

    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
