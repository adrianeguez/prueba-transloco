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
import { EscalaVendedor } from './escala-vendedor';
import { EscalaVendedorFormulario } from './escala-vendedor-formulario';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-escala-vendedor-formulario',
  templateUrl: './escala-vendedor-formulario.component.html',
})
export class EscalaVendedorFormularioComponent implements OnInit {
  @Output() escalaVendedorValido: EventEmitter<
    EscalaVendedor | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioEscalaVendedor;

  escalaVendedor: EscalaVendedorFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesEscalaVendedor = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.escalaVendedor = new EscalaVendedorFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Minimo.valor,
      this.configuracionDisabled.Maximo.valor,
      this.configuracionDisabled.PorcentajeIndividual.valor,
      this.configuracionDisabled.PorcentajeMultiple.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.escalaVendedor);
    this.escalaVendedor.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.escalaVendedor),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.escalaVendedor);
    generarEmiteEmpezoTipear(this.escalaVendedor, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.escalaVendedor.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {

        this.mensajeToaster = '';

        if (this.escalaVendedor.formGroup.valid && this.validacionesCampos()) {
          this.escalaVendedorValido.emit(generarCampos(this.escalaVendedor));
          this._toasterService.pop('info', 'Valido', 'Escala de vendedor válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.escalaVendedorValido.emit(false);
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
interface ObjetoVariablesGlobalesEscalaVendedor {}

export interface ConfiguracionFormluarioEscalaVendedor {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Minimo?: ConfiguracionDisabledInterfaz;
  Maximo?: ConfiguracionDisabledInterfaz;
  PorcentajeIndividual?: ConfiguracionDisabledInterfaz;
  PorcentajeMultiple?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_ESCALAVENDEDOR = (): ConfiguracionFormluarioEscalaVendedor => {
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

    Minimo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Maximo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    PorcentajeIndividual: {
      valor: null,
      disabled: false,
      hidden: true,
      calculoFormulario: undefined,
    },

    PorcentajeMultiple: {
      valor: null,
      disabled: false,
      hidden: true,
      calculoFormulario: undefined,
    },
  };
};
