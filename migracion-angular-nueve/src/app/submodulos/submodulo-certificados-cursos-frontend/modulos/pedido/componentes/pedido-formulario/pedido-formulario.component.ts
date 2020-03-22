
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
import {Pedido} from './pedido';
import {PedidoFormulario} from './pedido-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';


@Component({
    selector: 'ml-pedido-formulario',
    templateUrl: './pedido-formulario.component.html'
})

export class PedidoFormularioComponent implements OnInit {

    @Output() pedidoValido: EventEmitter<Pedido | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioPedido;

    pedido: PedidoFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesPedido = {

    };

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _cargandoService: CargandoService,
        private readonly _translocoService: TranslocoService,
        private _toasterService: ToasterService,

        ) {

    }

    ngOnInit() {

        this.pedido = new PedidoFormulario(
             this.configuracionDisabled.Curso.valor,
             this.configuracionDisabled.HorarioServicio.valor,
             this.configuracionDisabled.Valor.valor,
             this.configuracionDisabled.Nombres.valor,
             this.configuracionDisabled.Apellidos.valor,
        );
        console.log('llega al form', this.pedido);

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.pedido);
        this.pedido.formGroup = this._formBuilder.group(encerarFormBuilder(this.pedido));
        generarMensajesFormGroup(this.configuracionDisabled, this.pedido);
        generarEmiteEmpezoTipear(this.pedido, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.pedido
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    console.log(this.pedido.formGroup);

                    this.mensajeToaster = '';

                    if (this.pedido.formGroup.valid && this.validacionesCampos()) {

                        this.pedidoValido.emit(generarCampos(this.pedido));
                        this
                            ._toasterService
                            .pop(
                                'info',
                                this._translocoService.translate('formularios.comunes.valido'),
                                this._translocoService.translate('submoduloCertificadosCuros.pedido.pedidoFormulario.toasterGeneral')
                            );

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
                        }
                        this.pedidoValido.emit(false);
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
interface ObjetoVariablesGlobalesPedido {

}

export interface ConfiguracionFormluarioPedido {
  Id?: ConfiguracionDisabledInterfaz;
  Curso?: ConfiguracionDisabledInterfaz;
  HorarioServicio?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
  Nombres?: ConfiguracionDisabledInterfaz;
  Apellidos?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_PEDIDO = (): ConfiguracionFormluarioPedido => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        Curso: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        HorarioServicio: {
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

        Nombres: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Apellidos: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
