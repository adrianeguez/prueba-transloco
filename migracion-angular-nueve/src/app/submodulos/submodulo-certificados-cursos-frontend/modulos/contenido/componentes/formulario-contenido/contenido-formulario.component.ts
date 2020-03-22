
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
import {Contenido} from './contenido';
import {ContenidoFormulario} from './contenido-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
const url = require('valid-url');

@Component({
    selector: 'ml-contenido-formulario',
    templateUrl: './contenido-formulario.component.html'
})

export class ContenidoFormularioComponent implements OnInit {

    @Output() contenidoValido: EventEmitter<Contenido | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioContenido;

    contenido: ContenidoFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesContenido = {

    };

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _cargandoService: CargandoService,
        private readonly _translocoService: TranslocoService,
        private _toasterService: ToasterService,
        ) {

    }

    ngOnInit() {

        this.contenido = new ContenidoFormulario(
             this.configuracionDisabled.Texto.valor,
             this.configuracionDisabled.Link.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.contenido);
        this.contenido.formGroup = this._formBuilder.group(encerarFormBuilder(this.contenido));
        generarMensajesFormGroup(this.configuracionDisabled, this.contenido);
        generarEmiteEmpezoTipear(this.contenido, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.contenido
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    this.mensajeToaster = '';

                    if (this.contenido.formGroup.valid && this.validacionesCampos()) {

                        this.contenidoValido.emit(generarCampos(this.contenido));
                        this
                            ._toasterService
                            .pop(
                                'info',
                                this._translocoService.translate('formularios.comunes.valido'),
                                this._translocoService.translate('submoduloCertificadosCuros.contenido.contenidoFormulario.toasterGeneral')
                            );

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
                        }
                        this.contenidoValido.emit(false);
                    }
                }
            );
    }

    validacionesCampos() {
        if (this.contenido.formGroup.get('link').value) {
          return this.validarLink();
        } else {
          return true;
        }
    }
    validarLink() {
      const link = this.contenido.formGroup.get('link').value;
      if (url.isUri(link)) {
        return true;
      } else {
        return false;
      }
    }



}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesContenido {

}

export interface ConfiguracionFormluarioContenido {
  Id?: ConfiguracionDisabledInterfaz;
  Texto?: ConfiguracionDisabledInterfaz;
  Link?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CONTENIDO = (): ConfiguracionFormluarioContenido => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        Texto: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Link: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
