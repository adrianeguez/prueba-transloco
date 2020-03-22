
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
import {Opcion} from './opcion';
import {OpcionFormulario} from './opcion-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';


@Component({
    selector: 'ml-opcion-formulario',
    templateUrl: './opcion-formulario.component.html'
})

export class OpcionFormularioComponent implements OnInit {

    @Output() opcionValido: EventEmitter<Opcion | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioOpcion;

    opcion: OpcionFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesOpcion = {

    };

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _cargandoService: CargandoService,
        private readonly _translocoService: TranslocoService,
        private _toasterService: ToasterService,

        ) {

    }

    ngOnInit() {

        this.opcion = new OpcionFormulario(
             this.configuracionDisabled.Descripcion.valor,
             this.configuracionDisabled.EsRespuesta.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.opcion);
        this.opcion.formGroup = this._formBuilder.group(encerarFormBuilder(this.opcion));
        generarMensajesFormGroup(this.configuracionDisabled, this.opcion);
        generarEmiteEmpezoTipear(this.opcion, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.opcion
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    console.log(this.opcion.formGroup);

                    this.mensajeToaster = '';

                    if (this.opcion.formGroup.valid && this.validacionesCampos()) {

                        this.opcionValido.emit(generarCampos(this.opcion));
                        this
                            ._toasterService
                            .pop(
                                'info',
                                this._translocoService.translate('formularios.comunes.valido'),
                                this._translocoService.translate('submoduloCertificadosCuros.opcionModulo.opcionFormulario.toasterGeneral')
                            );

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
                        }
                        this.opcionValido.emit(false);
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
interface ObjetoVariablesGlobalesOpcion {

}

export interface ConfiguracionFormluarioOpcion {
  Id?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  EsRespuesta?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_OPCION = (): ConfiguracionFormluarioOpcion => {
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

        EsRespuesta: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
