
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
import {ModulosSistema} from './modulos-sistema';
import {ModulosSistemaFormulario} from './modulos-sistema-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';


@Component({
    selector: 'app-modulos-sistema-formulario',
    templateUrl: './modulos-sistema-formulario.component.html'
})

export class ModulosSistemaFormularioComponent implements OnInit {

    @Output() modulosSistemaValido: EventEmitter<ModulosSistema | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioModulosSistema;

    modulosSistema: ModulosSistemaFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesModulosSistema = {

    };

    constructor(private _formBuilder: FormBuilder,
        private _cargandoService: CargandoService,
        private _toasterService: ToasterService,

        ) {

    }

    ngOnInit() {

        this.modulosSistema = new ModulosSistemaFormulario(
             this.configuracionDisabled.NombreModulo.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.modulosSistema);
        this.modulosSistema.formGroup = this._formBuilder.group(encerarFormBuilder(this.modulosSistema));
        generarMensajesFormGroup(this.configuracionDisabled, this.modulosSistema);
        generarEmiteEmpezoTipear(this.modulosSistema, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.modulosSistema
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    console.log(this.modulosSistema.formGroup);

                    this.mensajeToaster = '';

                    if (this.modulosSistema.formGroup.valid && this.validacionesCampos()) {

                        this.modulosSistemaValido.emit(generarCampos(this.modulosSistema));
                        this._toasterService.pop('info', 'Valido', 'ModulosSistema válida ');

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
                        }
                        this.modulosSistemaValido.emit(false);
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
interface ObjetoVariablesGlobalesModulosSistema {

}

export interface ConfiguracionFormluarioModulosSistema {
  Id?: ConfiguracionDisabledInterfaz;
  NombreModulo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_MODULOSSISTEMA = (): ConfiguracionFormluarioModulosSistema => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        NombreModulo: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
