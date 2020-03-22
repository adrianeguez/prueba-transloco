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
import {Idioma} from './idioma';
import {IdiomaFormulario} from './idioma-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';


@Component({
  selector: 'ml-idioma-formulario',
  templateUrl: './idioma-formulario.component.html'
})

export class IdiomaFormularioComponent implements OnInit {

  @Output() idiomaValido: EventEmitter<Idioma | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioIdioma;

  idioma: IdiomaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesIdioma = {};

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
  ) {

  }

  ngOnInit() {

    this.idioma = new IdiomaFormulario(
      this.configuracionDisabled.Nombre.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.idioma);
    this.idioma.formGroup = this._formBuilder.group(encerarFormBuilder(this.idioma));
    generarMensajesFormGroup(this.configuracionDisabled, this.idioma);
    generarEmiteEmpezoTipear(this.idioma, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.idioma
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          console.log(this.idioma.formGroup);

          this.mensajeToaster = '';

          if (this.idioma.formGroup.valid && this.validacionesCampos()) {

            this.idiomaValido.emit(generarCampos(this.idioma));
            this
              ._toasterService
              .pop(
                'info',
                this._translocoService.translate('formularios.comunes.valido'),
                this._translocoService.translate('submoduloCertificadosCuros.moduloCurso.idiomaCursoFormulario.toasterGeneral')
              );

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
            }
            this.idiomaValido.emit(false);
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
interface ObjetoVariablesGlobalesIdioma {

}

export interface ConfiguracionFormluarioIdioma {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_IDIOMA = (): ConfiguracionFormluarioIdioma => {
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

  };
};
