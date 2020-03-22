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
import {IngresarKardexCaja} from './ingresar-kardex-caja';
import {IngresarKardexCajaFormulario} from './ingresar-kardex-caja-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';


@Component({
  selector: 'app-ingresar-kardex-caja-formulario',
  templateUrl: './ingresar-kardex-caja-formulario.component.html'
})

export class IngresarKardexCajaFormularioComponent implements OnInit {

  @Output() ingresarKardexCajaValido: EventEmitter<IngresarKardexCaja | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioIngresarKardexCaja;

  ingresarKardexCaja: IngresarKardexCajaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesIngresarKardexCaja = {};

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,
  ) {

  }

  ngOnInit() {

    this.ingresarKardexCaja = new IngresarKardexCajaFormulario(
      this.configuracionDisabled.Valor.valor,
      this.configuracionDisabled.OperacionSuma.valor,
      this.configuracionDisabled.Razon.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.ingresarKardexCaja);
    this.ingresarKardexCaja.formGroup = this._formBuilder.group(encerarFormBuilder(this.ingresarKardexCaja));
    generarMensajesFormGroup(this.configuracionDisabled, this.ingresarKardexCaja);
    generarEmiteEmpezoTipear(this.ingresarKardexCaja, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.ingresarKardexCaja
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          console.log(this.ingresarKardexCaja.formGroup);

          this.mensajeToaster = '';

          if (this.ingresarKardexCaja.formGroup.valid && this.validacionesCampos()) {

            this.ingresarKardexCajaValido.emit(generarCampos(this.ingresarKardexCaja));
            this._toasterService.pop('info', 'Valido', 'IngresarKardexCaja válida ');

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
            }
            this.ingresarKardexCajaValido.emit(false);
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
interface ObjetoVariablesGlobalesIngresarKardexCaja {

}

export interface ConfiguracionFormluarioIngresarKardexCaja {
  Id?: ConfiguracionDisabledInterfaz;
  Valor?: ConfiguracionDisabledInterfaz;
  OperacionSuma?: ConfiguracionDisabledInterfaz;
  Razon?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_INGRESARKARDEXCAJA = (): ConfiguracionFormluarioIngresarKardexCaja => {
  return {
    Id: {
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

    OperacionSuma: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Razon: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
