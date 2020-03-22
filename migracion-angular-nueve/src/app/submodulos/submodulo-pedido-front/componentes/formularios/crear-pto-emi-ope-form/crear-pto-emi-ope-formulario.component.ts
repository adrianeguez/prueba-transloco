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
import { CrearPtoEmiOpe } from './crear-pto-emi-ope';
import { CrearPtoEmiOpeFormulario } from './crear-pto-emi-ope-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-app-crear-pto-emi-ope-formulario',
  templateUrl: './crear-pto-emi-ope-formulario.component.html',
})
export class CrearPtoEmiOpeFormularioComponent implements OnInit {
  @Output() crearPtoEmiOpeValido: EventEmitter<
    CrearPtoEmiOpe | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCrearPtoEmiOpe;

  crearPtoEmiOpe: CrearPtoEmiOpeFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCrearPtoEmiOpe = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.crearPtoEmiOpe = new CrearPtoEmiOpeFormulario(
      this.configuracionDisabled.ValorInicia.valor,
      this.configuracionDisabled.NovedadInicio.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.crearPtoEmiOpe);
    this.crearPtoEmiOpe.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.crearPtoEmiOpe),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.crearPtoEmiOpe);
    generarEmiteEmpezoTipear(this.crearPtoEmiOpe, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.crearPtoEmiOpe.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.crearPtoEmiOpe.formGroup);

        this.mensajeToaster = '';

        if (this.crearPtoEmiOpe.formGroup.valid && this.validacionesCampos()) {
          this.crearPtoEmiOpeValido.emit(generarCampos(this.crearPtoEmiOpe));
          this._toasterService.pop('info', 'Valido', 'Caja inicial válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.crearPtoEmiOpeValido.emit(false);
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
interface ObjetoVariablesGlobalesCrearPtoEmiOpe {}

export interface ConfiguracionFormluarioCrearPtoEmiOpe {
  Id?: ConfiguracionDisabledInterfaz;
  ValorInicia?: ConfiguracionDisabledInterfaz;
  NovedadInicio?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CREARPTOEMIOPE = (): ConfiguracionFormluarioCrearPtoEmiOpe => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    ValorInicia: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    NovedadInicio: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
