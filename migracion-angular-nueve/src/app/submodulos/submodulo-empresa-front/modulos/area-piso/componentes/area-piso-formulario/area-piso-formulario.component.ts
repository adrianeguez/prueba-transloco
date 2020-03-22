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
import { AreaPiso } from './area-piso';
import { AreaPisoFormulario } from './area-piso-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-area-piso-formulario',
  templateUrl: './area-piso-formulario.component.html',
})
export class AreaPisoFormularioComponent implements OnInit {
  @Output() areaPisoValido: EventEmitter<
    AreaPiso | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioAreaPiso;

  areaPiso: AreaPisoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesAreaPiso = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.areaPiso = new AreaPisoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.Nivel.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.areaPiso);
    this.areaPiso.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.areaPiso),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.areaPiso);
    generarEmiteEmpezoTipear(this.areaPiso, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.areaPiso.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.areaPiso.formGroup.valid && this.validacionesCampos()) {
          this.areaPisoValido.emit(generarCampos(this.areaPiso));
          this._toasterService.pop('info', 'Valido', 'Area piso válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.areaPisoValido.emit(false);
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
interface ObjetoVariablesGlobalesAreaPiso {}

export interface ConfiguracionFormluarioAreaPiso {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  Nivel?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_AREAPISO = (): ConfiguracionFormluarioAreaPiso => {
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

    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Nivel: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
