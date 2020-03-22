
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
// tslint:disable-next-line:max-line-length
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
import {TipoSistema} from './tipo-sistema';
import {TipoSistemaFormulario} from './tipo-sistema-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';


@Component({
    selector: 'app-tipo-sistema-formulario',
    templateUrl: './tipo-sistema-formulario.component.html'
})

export class TipoSistemaFormularioComponent implements OnInit {

    @Output() tipoSistemaValido: EventEmitter<TipoSistema | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioTipoSistema;

    tipoSistema: TipoSistemaFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesTipoSistema = {

    };

    constructor(private _formBuilder: FormBuilder,
        private _cargandoService: CargandoService,
        private _toasterService: ToasterService,

        ) {

    }

    ngOnInit() {

        this.tipoSistema = new TipoSistemaFormulario(
             this.configuracionDisabled.Tipo.valor,
             this.configuracionDisabled.Valor.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.tipoSistema);
        this.tipoSistema.formGroup = this._formBuilder.group(encerarFormBuilder(this.tipoSistema));
        generarMensajesFormGroup(this.configuracionDisabled, this.tipoSistema);
        generarEmiteEmpezoTipear(this.tipoSistema, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.tipoSistema
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    console.log(this.tipoSistema.formGroup);

                    this.mensajeToaster = '';

                    if (this.tipoSistema.formGroup.valid && this.validacionesCampos()) {

                        this.tipoSistemaValido.emit(generarCampos(this.tipoSistema));
                        this._toasterService.pop('info', 'Valido', 'Tipo de sistema válida ');

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
                        }
                        this.tipoSistemaValido.emit(false);
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
interface ObjetoVariablesGlobalesTipoSistema {

}

export interface ConfiguracionFormluarioTipoSistema {
  Id?: ConfiguracionDisabledInterfaz;
  Tipo?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TIPOSISTEMA = (): ConfiguracionFormluarioTipoSistema => {
    return {
        Id: {
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

        Valor: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
