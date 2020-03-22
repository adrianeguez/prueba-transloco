import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  establecerCamposDisabled,
  NO_EXISTEN_REGISTROS
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {Pregunta} from './pregunta';
import {PreguntaFormulario} from './pregunta-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {isNumber} from 'util';


@Component({
  selector: 'ml-pregunta-formulario',
  templateUrl: './pregunta-formulario.component.html'
})

export class PreguntaFormularioComponent implements OnInit {

  @Output() preguntaValido: EventEmitter<Pregunta | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioPregunta;

  pregunta: PreguntaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesPregunta = {};

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
  ) {

  }

  ngOnInit() {

    this.pregunta = new PreguntaFormulario(
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.Valor.valor,
      this.configuracionDisabled.TratarDeNuevo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.pregunta);
    this.pregunta.formGroup = this._formBuilder.group(encerarFormBuilder(this.pregunta));
    generarMensajesFormGroup(this.configuracionDisabled, this.pregunta);
    generarEmiteEmpezoTipear(this.pregunta, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.pregunta
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          console.log(this.pregunta.formGroup);

          this.mensajeToaster = '';

          if (this.pregunta.formGroup.valid && this.validacionesCampos()) {

            this.preguntaValido.emit(generarCampos(this.pregunta));
            this
              ._toasterService
              .pop(
                'info',
                this._translocoService.translate('formularios.comunes.valido'),
                this._translocoService.translate('submoduloCertificadosCuros.pregunta.preguntaFormulario.toasterGeneral')
              );

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
            }
            this.preguntaValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarNumero();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarNumero() {
    return isNumber(this.pregunta.formGroup.get('valor').value);
  }


}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesPregunta {

}

export interface ConfiguracionFormluarioPregunta {
  Id?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
  TratarDeNuevo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_PREGUNTA = (): ConfiguracionFormluarioPregunta => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Valor: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    TratarDeNuevo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
