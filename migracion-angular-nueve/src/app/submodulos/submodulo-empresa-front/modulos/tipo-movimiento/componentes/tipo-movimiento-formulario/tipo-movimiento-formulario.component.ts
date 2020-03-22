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
import { TipoMovimiento } from './tipo-movimiento';
import { TipoMovimientoFormulario } from './tipo-movimiento-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-tipo-movimiento-formulario',
  templateUrl: './tipo-movimiento-formulario.component.html',
})
export class TipoMovimientoFormularioComponent implements OnInit {
  @Output() tipoMovimientoValido: EventEmitter<
    TipoMovimiento | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioTipoMovimiento;

  tipoMovimiento: TipoMovimientoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesTipoMovimiento = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.tipoMovimiento = new TipoMovimientoFormulario(
      this.configuracionDisabled.Nombre.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.tipoMovimiento);
    this.tipoMovimiento.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.tipoMovimiento),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.tipoMovimiento);
    generarEmiteEmpezoTipear(this.tipoMovimiento, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.tipoMovimiento.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.tipoMovimiento.formGroup.valid && this.validacionesCampos()) {
          this.tipoMovimientoValido.emit(generarCampos(this.tipoMovimiento));
          this._toasterService.pop('info', 'Valido', 'Tipo de movimiento válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.tipoMovimientoValido.emit(false);
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
interface ObjetoVariablesGlobalesTipoMovimiento {}

export interface ConfiguracionFormluarioTipoMovimiento {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TIPOMOVIMIENTO = (): ConfiguracionFormluarioTipoMovimiento => {
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
  };
};
