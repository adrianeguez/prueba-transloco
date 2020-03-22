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
import { Establecimiento } from './establecimiento';
import { EstablecimientoFormulario } from './establecimiento-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-establecimiento-formulario',
  templateUrl: './establecimiento-formulario.component.html',
})
export class EstablecimientoFormularioComponent implements OnInit {
  @Output() establecimientoValido: EventEmitter<
    Establecimiento | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDireccion;

  establecimiento: EstablecimientoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesEstablecimiento = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.establecimiento = new EstablecimientoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Codigo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.establecimiento);
    this.establecimiento.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.establecimiento),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.establecimiento);
    generarEmiteEmpezoTipear(this.establecimiento, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.establecimiento.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.establecimiento.formGroup.valid && this.validacionesCampos()) {
          this.establecimientoValido.emit(generarCampos(this.establecimiento));
          this._toasterService.pop('info', 'Valido', 'Establecimiento válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.establecimientoValido.emit(false);
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
interface ObjetoVariablesGlobalesEstablecimiento {}

export interface ConfiguracionFormluarioDireccion {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_ESTABLECIMIENTO = (): ConfiguracionFormluarioDireccion => {
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
  };
};
