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
import { TipoLogroVisita } from './tipo-logro-visita';
import { TipoLogroVisitaFormulario } from './tipo-logro-visita-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-tipo-logro-visita-formulario',
  templateUrl: './tipo-logro-visita-formulario.component.html',
})
export class TipoLogroVisitaFormularioComponent implements OnInit {
  @Output() tipoLogroVisitaValido: EventEmitter<
    TipoLogroVisita | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioTipoLogroVisita;

  tipoLogroVisita: TipoLogroVisitaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesTipoLogroVisita = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.tipoLogroVisita = new TipoLogroVisitaFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.tipoLogroVisita);
    this.tipoLogroVisita.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.tipoLogroVisita),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.tipoLogroVisita);
    generarEmiteEmpezoTipear(this.tipoLogroVisita, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.tipoLogroVisita.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {

        this.mensajeToaster = '';

        if (this.tipoLogroVisita.formGroup.valid && this.validacionesCampos()) {
          this.tipoLogroVisitaValido.emit(generarCampos(this.tipoLogroVisita));
          this._toasterService.pop('info', 'Valido', 'Tipo de logro visita válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.tipoLogroVisitaValido.emit(false);
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
interface ObjetoVariablesGlobalesTipoLogroVisita {}

export interface ConfiguracionFormluarioTipoLogroVisita {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TIPOLOGROVISITA = (): ConfiguracionFormluarioTipoLogroVisita => {
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

    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
