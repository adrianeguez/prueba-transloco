import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  establecerCamposDisabled,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  NO_EXISTEN_REGISTROS,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { debounceTime } from 'rxjs/operators';
import { TipoVendedor } from './tipo-vendedor';
import { TipoVendedorFormulario } from './tipo-vendedor-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-tipo-vendedor-formulario',
  templateUrl: './tipo-vendedor-formulario.component.html',
})
export class TipoVendedorFormularioComponent implements OnInit {
  @Output() tipoVendedorValido: EventEmitter<
    TipoVendedor | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioTipoVendedor;

  tipoVendedor: TipoVendedorFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesTipoVendedor = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.tipoVendedor = new TipoVendedorFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Codigo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.tipoVendedor);
    this.tipoVendedor.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.tipoVendedor),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.tipoVendedor);
    generarEmiteEmpezoTipear(this.tipoVendedor, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.tipoVendedor.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {

        this.mensajeToaster = '';

        if (this.tipoVendedor.formGroup.valid && this.validacionesCampos()) {
          this.tipoVendedorValido.emit(generarCampos(this.tipoVendedor));
          this._toasterService.pop('info', 'Valido', 'Tipo de vendedor válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.tipoVendedorValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesTipoVendedor {}

export interface ConfiguracionFormluarioTipoVendedor {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_TIPOVENDEDOR = (): ConfiguracionFormluarioTipoVendedor => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    Nombre: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Codigo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
