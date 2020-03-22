
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
import {CabeceraCompra} from './cabecera-compra';
import {CabeceraCompraFormulario} from './cabecera-compra-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';


@Component({
    selector: 'ml-cabecera-compra-formulario',
    templateUrl: './cabecera-compra-formulario.component.html'
})

export class CabeceraCompraFormularioComponent implements OnInit {

    @Output() cabeceraCompraValido: EventEmitter<CabeceraCompra | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioCabeceraCompra;

    cabeceraCompra: CabeceraCompraFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    longitudMaximaNumeroAutorizacion: number;

    seleccionoTipoFactura: boolean;

    objetoVariablesGlobales: ObjetoVariablesGlobalesCabeceraCompra = {

    };

    constructor(private _formBuilder: FormBuilder,
        private _cargandoService: CargandoService,
        private _toasterService: ToasterService,

        ) {

    }

    ngOnInit() {

        this.cabeceraCompra = new CabeceraCompraFormulario(
             this.configuracionDisabled.NumeroFactura.valor,
             this.configuracionDisabled.NumeroSerie.valor,
             this.configuracionDisabled.NumeroAutorizacion.valor,
             this.configuracionDisabled.TipoFactura.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.cabeceraCompra);
        this.cabeceraCompra.formGroup = this._formBuilder.group(encerarFormBuilder(this.cabeceraCompra));
        generarMensajesFormGroup(this.configuracionDisabled, this.cabeceraCompra);
        generarEmiteEmpezoTipear(this.cabeceraCompra, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.cabeceraCompra
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    console.log(this.cabeceraCompra.formGroup);

                    this.mensajeToaster = '';

                    if (this.cabeceraCompra.formGroup.controls.tipoFactura.value !== null) {
                      this.seleccionoTipoFactura = true;
                    }

                    if (this.cabeceraCompra.formGroup.controls.tipoFactura.value === 'Electrónica') {
                      this.longitudMaximaNumeroAutorizacion = 39;
                    }

                  if (this.cabeceraCompra.formGroup.controls.tipoFactura.value === 'Física') {
                    this.longitudMaximaNumeroAutorizacion = 15;
                  }

                    if (this.cabeceraCompra.formGroup.valid && this.validacionesCampos()) {

                        this.cabeceraCompraValido.emit(generarCampos(this.cabeceraCompra));
                        this._toasterService.pop('info', 'Valido', 'CabeceraCompra válida ');

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
                        }
                        this.cabeceraCompraValido.emit(false);
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
interface ObjetoVariablesGlobalesCabeceraCompra {

}

export interface ConfiguracionFormluarioCabeceraCompra {
  Id?: ConfiguracionDisabledInterfaz;
  NumeroFactura?: ConfiguracionDisabledInterfaz;
  NumeroSerie?: ConfiguracionDisabledInterfaz;
  NumeroAutorizacion?: ConfiguracionDisabledInterfaz;
  TipoFactura?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CABECERACOMPRA = (): ConfiguracionFormluarioCabeceraCompra => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        NumeroFactura: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        NumeroSerie: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        NumeroAutorizacion: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        TipoFactura: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
