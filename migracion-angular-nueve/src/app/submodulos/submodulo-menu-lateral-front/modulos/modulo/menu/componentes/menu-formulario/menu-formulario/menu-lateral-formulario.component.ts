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
import { MenuLateral } from './menu-lateral';
import { MenuLateralFormulario } from './menu-lateral-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-menu-formulario',
  templateUrl: './menu-lateral-formulario.component.html',
})
export class MenuLateralFormularioComponent implements OnInit {
  @Output() menuValido: EventEmitter<MenuLateral | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioMenu;

  menu: MenuLateralFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesMenu = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.menu = new MenuLateralFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.RouterLink.valor,
      this.configuracionDisabled.Url.valor,
      this.configuracionDisabled.Icono.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.menu);
    this.menu.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.menu),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.menu);
    generarEmiteEmpezoTipear(this.menu, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.menu.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.menu.formGroup);

        this.mensajeToaster = '';

        if (this.menu.formGroup.valid && this.validacionesCampos()) {
          this.menuValido.emit(generarCampos(this.menu));
          this._toasterService.pop('info', 'Valido', 'Menu válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.menuValido.emit(false);
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
interface ObjetoVariablesGlobalesMenu {}

export interface ConfiguracionFormluarioMenu {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  RouterLink?: ConfiguracionDisabledInterfaz;
  Url?: ConfiguracionDisabledInterfaz;
  Icono?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_MENU = (): ConfiguracionFormluarioMenu => {
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

    RouterLink: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Url: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Icono: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
