import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  establecerCamposDisabled,
  NO_EXISTEN_REGISTROS,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CodigoPais } from './codigo-pais';
import { CodigoPaisFormulario } from './codigo-pais-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-codigo-pais-formulario',
  templateUrl: './codigo-pais-formulario.component.html',
})
export class CodigoPaisFormularioComponent implements OnInit {
  @Output() codigoPaisValido: EventEmitter<
    CodigoPais | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCodigoPais;

  codigoPais: CodigoPaisFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCodigoPais = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.codigoPais = new CodigoPaisFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.CodigoIso3166.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.codigoPais);
    this.codigoPais.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.codigoPais),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.codigoPais);
    generarEmiteEmpezoTipear(this.codigoPais, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.codigoPais.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.codigoPais.formGroup.valid && this.validacionesCampos()) {
          this.codigoPaisValido.emit(generarCampos(this.codigoPais));
          this._toasterService.pop('info', 'Valido', 'Codigo de país válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.codigoPaisValido.emit(false);
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
interface ObjetoVariablesGlobalesCodigoPais {}

export interface ConfiguracionFormluarioCodigoPais {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  CodigoIso3166?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CODIGOPAIS = (): ConfiguracionFormluarioCodigoPais => {
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

    CodigoIso3166: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
