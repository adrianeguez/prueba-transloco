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
import {Tema} from './tema';
import {TemaFormulario} from './tema-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {FORMATO_AUDIO} from '../../constantes/formato-audio';


@Component({
  selector: 'ml-tema-formulario',
  templateUrl: './tema-formulario.component.html'
})

export class TemaFormularioComponent implements OnInit {

  @Output() temaValido: EventEmitter<Tema | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioTema;

  tema: TemaFormulario;
  formato = FORMATO_AUDIO;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesTema = {};

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
  ) {

  }

  ngOnInit() {

    this.tema = new TemaFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.tema);
    this.tema.formGroup = this._formBuilder.group(encerarFormBuilder(this.tema));
    generarMensajesFormGroup(this.configuracionDisabled, this.tema);
    generarEmiteEmpezoTipear(this.tema, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.tema
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          this.mensajeToaster = '';

          if (this.tema.formGroup.valid && this.validacionesCampos()) {

            this.temaValido.emit(generarCampos(this.tema));
            this
              ._toasterService
              .pop(
                'info',
                this._translocoService.translate('formularios.comunes.valido'),
                this._translocoService.translate('submoduloCertificadosCuros.tema.temaFormulario.toasterGeneral')
              );

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
            }
            this.temaValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesTema {

}

export interface ConfiguracionFormluarioTema {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  UrlAudio?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TEMA = (): ConfiguracionFormluarioTema => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Nombre: {
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

  };
};
