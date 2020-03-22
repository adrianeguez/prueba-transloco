
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
import {DatosVendedor} from './datos-vendedor';
import {DatosVendedorFormulario} from './datos-vendedor-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';


@Component({
    selector: 'ml-datos-vendedor-formulario',
    templateUrl: './datos-vendedor-formulario.component.html'
})

export class DatosVendedorFormularioComponent implements OnInit {

    @Output() datosVendedorValido: EventEmitter<DatosVendedor | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioDatosVendedor;

    datosVendedor: DatosVendedorFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesDatosVendedor = {

    };

    constructor(private _formBuilder: FormBuilder,
        private _cargandoService: CargandoService,
        private _toasterService: ToasterService,

        ) {

    }

    ngOnInit() {

        this.datosVendedor = new DatosVendedorFormulario(
             this.configuracionDisabled.NombreVendedor.valor,
             this.configuracionDisabled.ApellidoVendedor.valor,
             this.configuracionDisabled.Documento.valor,
             this.configuracionDisabled.FechaIngreso.valor,
             this.configuracionDisabled.FechaSalida.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.datosVendedor);
        this.datosVendedor.formGroup = this._formBuilder.group(encerarFormBuilder(this.datosVendedor));
        generarMensajesFormGroup(this.configuracionDisabled, this.datosVendedor);
        generarEmiteEmpezoTipear(this.datosVendedor, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.datosVendedor
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {

                    this.mensajeToaster = '';

                    if (this.datosVendedor.formGroup.valid && this.validacionesCampos()) {

                        this.datosVendedorValido.emit(generarCampos(this.datosVendedor));
                        this._toasterService.pop('info', 'Valido', 'Datos de vendedor válida ');

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
                        }
                        this.datosVendedorValido.emit(false);
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
interface ObjetoVariablesGlobalesDatosVendedor {

}

export interface ConfiguracionFormluarioDatosVendedor {
  Id?: ConfiguracionDisabledInterfaz;
  NombreVendedor?: ConfiguracionDisabledInterfaz;
  ApellidoVendedor?: ConfiguracionDisabledInterfaz;
  Documento?: ConfiguracionDisabledInterfaz;
  FechaIngreso?: ConfiguracionDisabledInterfaz;
  FechaSalida?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DATOSVENDEDOR = (): ConfiguracionFormluarioDatosVendedor => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        NombreVendedor: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        ApellidoVendedor: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        Documento: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        FechaIngreso: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        FechaSalida: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
