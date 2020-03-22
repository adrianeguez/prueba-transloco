
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
import {NombrePermiso} from './nombre-permiso';
import {NombrePermisoFormulario} from './nombre-permiso-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';


@Component({
  selector: 'ml-nombre-permiso-formulario',
  templateUrl: './nombre-permiso-formulario.component.html'
})

export class NombrePermisoFormularioComponent implements OnInit {

  @Output() nombrePermisoValido: EventEmitter<NombrePermiso | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioNombrePermiso;

  nombrePermiso: NombrePermisoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  modulos = [];

  objetoVariablesGlobales: ObjetoVariablesGlobalesNombrePermiso = {

  };

  constructor(private _formBuilder: FormBuilder,
              private _cargandoService: CargandoService,
              private _toasterService: ToasterService,

  ) {

  }

  ngOnInit() {

    this.nombrePermiso = new NombrePermisoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.NombreModulo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.nombrePermiso);
    this.nombrePermiso.formGroup = this._formBuilder.group(encerarFormBuilder(this.nombrePermiso));
    generarMensajesFormGroup(this.configuracionDisabled, this.nombrePermiso);
    generarEmiteEmpezoTipear(this.nombrePermiso, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.nombrePermiso
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          console.log(this.nombrePermiso.formGroup);

          this.mensajeToaster = '';

          if (this.nombrePermiso.formGroup.valid && this.validacionesCampos()) {

            this.nombrePermisoValido.emit(generarCampos(this.nombrePermiso));
            this._toasterService.pop('info', 'Valido', 'NombrePermiso válida ');

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
            }
            this.nombrePermisoValido.emit(false);
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
interface ObjetoVariablesGlobalesNombrePermiso {

}

export interface ConfiguracionFormluarioNombrePermiso {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  NombreModulo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_NOMBREPERMISO = (): ConfiguracionFormluarioNombrePermiso => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Nombre: {
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
