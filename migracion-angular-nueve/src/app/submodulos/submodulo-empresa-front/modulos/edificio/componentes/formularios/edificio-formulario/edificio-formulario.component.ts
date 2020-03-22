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
import { Edificio } from './edificio';
import { EdificioFormulario } from './edificio-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-edificio-formulario',
  templateUrl: './edificio-formulario.component.html',
})
export class EdificioFormularioComponent implements OnInit {
  @Output() edificioValido: EventEmitter<
    Edificio | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioEdificio;

  edificio: EdificioFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesEdificio = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.edificio = new EdificioFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.EsMatriz.valor,
      this.configuracionDisabled.Telefono.valor,
      this.configuracionDisabled.Extension.valor,
      this.configuracionDisabled.Whatsapp.valor,
      this.configuracionDisabled.NombreResponsable.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.edificio);
    this.edificio.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.edificio),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.edificio);
    generarEmiteEmpezoTipear(this.edificio, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.edificio.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.edificio.formGroup.valid && this.validacionesCampos()) {
          this.edificioValido.emit(generarCampos(this.edificio));
          this._toasterService.pop('info', 'Valido', 'Edificio válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.edificioValido.emit(false);
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
interface ObjetoVariablesGlobalesEdificio {}

export interface ConfiguracionFormluarioEdificio {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  EsMatriz?: ConfiguracionDisabledInterfaz;
  Telefono?: ConfiguracionDisabledInterfaz;
  Extension?: ConfiguracionDisabledInterfaz;
  Whatsapp?: ConfiguracionDisabledInterfaz;
  NombreResponsable?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_EDIFICIO = (): ConfiguracionFormluarioEdificio => {
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

    EsMatriz: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Telefono: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Extension: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Whatsapp: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    NombreResponsable: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
