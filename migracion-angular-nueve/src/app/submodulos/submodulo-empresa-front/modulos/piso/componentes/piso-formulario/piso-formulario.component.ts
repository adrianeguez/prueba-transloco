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
import { Piso } from './piso';
import { PisoFormulario } from './piso-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-piso-formulario',
  templateUrl: './piso-formulario.component.html',
})
export class PisoFormularioComponent implements OnInit {
  @Output() pisoValido: EventEmitter<Piso | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioPiso;

  piso: PisoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesPiso = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.piso = new PisoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.OrdenPiso.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.piso);
    this.piso.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.piso),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.piso);
    generarEmiteEmpezoTipear(this.piso, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.piso.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.piso.formGroup.valid && this.validacionesCampos()) {
          this.pisoValido.emit(generarCampos(this.piso));
          this._toasterService.pop('info', 'Valido', 'Piso válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.pisoValido.emit(false);
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
interface ObjetoVariablesGlobalesPiso {}

export interface ConfiguracionFormluarioPiso {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  OrdenPiso?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_PISO = (): ConfiguracionFormluarioPiso => {
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

    OrdenPiso: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
