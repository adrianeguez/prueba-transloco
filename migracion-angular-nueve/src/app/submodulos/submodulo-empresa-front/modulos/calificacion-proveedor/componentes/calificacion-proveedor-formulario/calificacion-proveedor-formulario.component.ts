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
import { CalificacionProveedor } from './calificacion-proveedor';
import { CalificacionProveedorFormulario } from './calificacion-proveedor-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-calificacion-proveedor-formulario',
  templateUrl: './calificacion-proveedor-formulario.component.html',
})
export class CalificacionProveedorFormularioComponent implements OnInit {
  @Output() calificacionProveedorValido: EventEmitter<
    CalificacionProveedor | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCalificacionProveedor;

  calificacionProveedor: CalificacionProveedorFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCalificacionProveedor = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.calificacionProveedor = new CalificacionProveedorFormulario(
      this.configuracionDisabled.Calificacion.valor,
      this.configuracionDisabled.Observacion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(
      this.configuracionDisabled,
      this.calificacionProveedor,
    );
    this.calificacionProveedor.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.calificacionProveedor),
    );
    generarMensajesFormGroup(
      this.configuracionDisabled,
      this.calificacionProveedor,
    );
    generarEmiteEmpezoTipear(this.calificacionProveedor, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.calificacionProveedor.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (
          this.calificacionProveedor.formGroup.valid &&
          this.validacionesCampos()
        ) {
          this.calificacionProveedorValido.emit(
            generarCampos(this.calificacionProveedor),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Calificacion de proveedor válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.calificacionProveedorValido.emit(false);
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
interface ObjetoVariablesGlobalesCalificacionProveedor {}

export interface ConfiguracionFormluarioCalificacionProveedor {
  Id?: ConfiguracionDisabledInterfaz;
  Calificacion?: ConfiguracionDisabledInterfaz;
  Observacion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CALIFICACIONPROVEEDOR = (): ConfiguracionFormluarioCalificacionProveedor => {
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
