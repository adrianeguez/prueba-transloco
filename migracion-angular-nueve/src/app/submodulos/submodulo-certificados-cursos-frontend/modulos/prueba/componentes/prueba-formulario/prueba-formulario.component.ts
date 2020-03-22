
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
import {Prueba} from './prueba';
import {PruebaFormulario} from './prueba-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';


@Component({
    selector: 'ml-prueba-formulario',
    templateUrl: './prueba-formulario.component.html'
})

export class PruebaFormularioComponent implements OnInit {

    @Output() pruebaValido: EventEmitter<Prueba | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioPrueba;

    prueba: PruebaFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesPrueba = {

    };

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _cargandoService: CargandoService,
        private readonly _translocoService: TranslocoService,
        private _toasterService: ToasterService,

        ) {

    }

    ngOnInit() {

        this.prueba = new PruebaFormulario(
             this.configuracionDisabled.Nombre.valor,
             this.configuracionDisabled.Tipo.valor,
             this.configuracionDisabled.TiempoMaximo.valor,
             this.configuracionDisabled.NumeroIntentos.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.prueba);
        this.prueba.formGroup = this._formBuilder.group(encerarFormBuilder(this.prueba));
        generarMensajesFormGroup(this.configuracionDisabled, this.prueba);
        generarEmiteEmpezoTipear(this.prueba, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.prueba
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    // console.log(this.prueba.formGroup);

                    this.mensajeToaster = '';

                    if (this.prueba.formGroup.valid && this.validacionesCampos()) {

                        this.pruebaValido.emit(generarCampos(this.prueba));
                        this
                            ._toasterService
                            .pop(
                                'info',
                                this._translocoService.translate('formularios.comunes.valido'),
                                this._translocoService.translate('submoduloCertificadosCuros.pruebaModulo.pruebaFormulario.toasterGeneral')
                            );

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
                        }
                        this.pruebaValido.emit(false);
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
interface ObjetoVariablesGlobalesPrueba {

}

export interface ConfiguracionFormluarioPrueba {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Tipo?: ConfiguracionDisabledInterfaz;
  TiempoMaximo?: ConfiguracionDisabledInterfaz;
  NumeroIntentos?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_PRUEBA = (): ConfiguracionFormluarioPrueba => {
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

        Tipo: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        TiempoMaximo: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        NumeroIntentos: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
