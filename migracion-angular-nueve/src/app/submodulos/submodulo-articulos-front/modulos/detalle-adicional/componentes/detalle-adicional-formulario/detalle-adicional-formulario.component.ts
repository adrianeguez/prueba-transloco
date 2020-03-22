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
import { DetalleAdicional } from './detalle-adicional';
import { DetalleAdicionalFormulario } from './detalle-adicional-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-detalle-adicional-formulario',
  templateUrl: './detalle-adicional-formulario.component.html',
})
export class DetalleAdicionalFormularioComponent implements OnInit {
  @Output() detalleAdicionalValido: EventEmitter<
    DetalleAdicional | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDetalleAdicional;

  detalleAdicional: DetalleAdicionalFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesDetalleAdicional = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.detalleAdicional = new DetalleAdicionalFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Valor.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.detalleAdicional);
    this.detalleAdicional.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.detalleAdicional),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.detalleAdicional);
    generarEmiteEmpezoTipear(this.detalleAdicional, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.detalleAdicional.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (
          this.detalleAdicional.formGroup.valid &&
          this.validacionesCampos()
        ) {
          this.detalleAdicionalValido.emit(
            generarCampos(this.detalleAdicional),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Detalle adicional válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.detalleAdicionalValido.emit(false);
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
interface ObjetoVariablesGlobalesDetalleAdicional {}

export interface ConfiguracionFormluarioDetalleAdicional {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DETALLEADICIONAL = (): ConfiguracionFormluarioDetalleAdicional => {
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

    Valor: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
