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
import { Localizacion } from './localizacion';
import { LocalizacionFormulario } from './localizacion-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-localizacion-formulario',
  templateUrl: './localizacion-formulario.component.html',
})
export class LocalizacionFormularioComponent implements OnInit {
  @Output() localizacionValido: EventEmitter<
    Localizacion | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioLocalizacion;

  localizacion: LocalizacionFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesLocalizacion = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.localizacion = new LocalizacionFormulario(
      this.configuracionDisabled.CoordenadaX.valor,
      this.configuracionDisabled.CoordenadaY.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.localizacion);
    this.localizacion.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.localizacion),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.localizacion);
    generarEmiteEmpezoTipear(this.localizacion, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.localizacion.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.localizacion.formGroup.valid && this.validacionesCampos()) {
          this.localizacionValido.emit(generarCampos(this.localizacion));
          this._toasterService.pop('info', 'Valido', 'Localizacion válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.localizacionValido.emit(false);
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
interface ObjetoVariablesGlobalesLocalizacion {}

export interface ConfiguracionFormluarioLocalizacion {
  Id?: ConfiguracionDisabledInterfaz;
  CoordenadaX?: ConfiguracionDisabledInterfaz;
  CoordenadaY?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_LOCALIZACION = (): ConfiguracionFormluarioLocalizacion => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    CoordenadaX: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    CoordenadaY: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
