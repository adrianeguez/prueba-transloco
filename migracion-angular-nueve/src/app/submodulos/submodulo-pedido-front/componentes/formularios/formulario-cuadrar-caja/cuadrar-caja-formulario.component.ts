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
import {CuadrarCaja} from './cuadrar-caja';
import {CuadrarCajaFormulario} from './cuadrar-caja-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';


@Component({
  selector: 'app-cuadrar-caja-formulario',
  templateUrl: './cuadrar-caja-formulario.component.html'
})

export class CuadrarCajaFormularioComponent implements OnInit {

  @Output() cuadrarCajaValido: EventEmitter<CuadrarCaja | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCuadrarCaja;

  cuadrarCaja: CuadrarCajaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCuadrarCaja = {};

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,
  ) {

  }

  ngOnInit() {

    this.cuadrarCaja = new CuadrarCajaFormulario(
      this.configuracionDisabled.ValorCuadre.valor,
      this.configuracionDisabled.NovedadCierre.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.cuadrarCaja);
    this.cuadrarCaja.formGroup = this._formBuilder.group(encerarFormBuilder(this.cuadrarCaja));
    generarMensajesFormGroup(this.configuracionDisabled, this.cuadrarCaja);
    generarEmiteEmpezoTipear(this.cuadrarCaja, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.cuadrarCaja
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          console.log(this.cuadrarCaja.formGroup);

          this.mensajeToaster = '';

          if (this.cuadrarCaja.formGroup.valid && this.validacionesCampos()) {

            this.cuadrarCajaValido.emit(generarCampos(this.cuadrarCaja));
            this._toasterService.pop('info', 'Valido', 'CuadrarCaja válida ');

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
            }
            this.cuadrarCajaValido.emit(false);
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
interface ObjetoVariablesGlobalesCuadrarCaja {

}

export interface ConfiguracionFormluarioCuadrarCaja {
  Id?: ConfiguracionDisabledInterfaz;
  ValorCuadre?: ConfiguracionDisabledInterfaz;
  NovedadCierre?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CUADRARCAJA = (): ConfiguracionFormluarioCuadrarCaja => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    ValorCuadre: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    NovedadCierre: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
