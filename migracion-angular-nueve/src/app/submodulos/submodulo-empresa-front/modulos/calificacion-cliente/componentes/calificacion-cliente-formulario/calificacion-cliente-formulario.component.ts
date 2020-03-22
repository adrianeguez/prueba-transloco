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
import { CalificacionCliente } from './calificacion-cliente';
import { CalificacionClienteFormulario } from './calificacion-cliente-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-calificacion-cliente-formulario',
  templateUrl: './calificacion-cliente-formulario.component.html',
})
export class CalificacionClienteFormularioComponent implements OnInit {
  @Output() calificacionClienteValido: EventEmitter<
    CalificacionCliente | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCalificacionCliente;

  calificacionCliente: CalificacionClienteFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCalificacionCliente = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.calificacionCliente = new CalificacionClienteFormulario(
      this.configuracionDisabled.Calificacion.valor,
      this.configuracionDisabled.Observacion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(
      this.configuracionDisabled,
      this.calificacionCliente,
    );
    this.calificacionCliente.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.calificacionCliente),
    );
    generarMensajesFormGroup(
      this.configuracionDisabled,
      this.calificacionCliente,
    );
    generarEmiteEmpezoTipear(this.calificacionCliente, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.calificacionCliente.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (
          this.calificacionCliente.formGroup.valid &&
          this.validacionesCampos()
        ) {
          this.calificacionClienteValido.emit(
            generarCampos(this.calificacionCliente),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Calificacion de cliente válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.calificacionClienteValido.emit(false);
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
interface ObjetoVariablesGlobalesCalificacionCliente {}

export interface ConfiguracionFormluarioCalificacionCliente {
  Id?: ConfiguracionDisabledInterfaz;
  Calificacion?: ConfiguracionDisabledInterfaz;
  Observacion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CALIFICACIONCLIENTE = (): ConfiguracionFormluarioCalificacionCliente => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    Calificacion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Observacion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
