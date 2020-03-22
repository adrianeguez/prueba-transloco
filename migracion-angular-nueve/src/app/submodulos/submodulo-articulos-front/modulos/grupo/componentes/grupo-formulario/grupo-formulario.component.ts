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
  NO_EXISTEN_REGISTROS,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {Grupo} from './grupo';
import {GrupoFormulario} from './grupo-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'ml-grupo-formulario',
  templateUrl: './grupo-formulario.component.html',
})
export class GrupoFormularioComponent implements OnInit {
  @Output() grupoValido: EventEmitter<Grupo | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioGrupo;

  grupo: GrupoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesGrupo = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private translocoService: TranslocoService
  ) {
  }

  ngOnInit() {
    const pene = this.translocoService.translate('moduloPrincipal.cabecera.botonPerfil');
    console.log('pene', pene);
    this.grupo = new GrupoFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.EmpresaProductora.valor,
      this.configuracionDisabled.Codigo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.grupo);
    this.grupo.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.grupo),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.grupo);
    generarEmiteEmpezoTipear(this.grupo, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.grupo.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.grupo.formGroup);

        this.mensajeToaster = '';

        if (this.grupo.formGroup.valid && this.validacionesCampos()) {
          this.grupoValido.emit(generarCampos(this.grupo));
          this._toasterService.pop('info', 'Valido', 'Grupo válida');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.grupoValido.emit(false);
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
interface ObjetoVariablesGlobalesGrupo {
}

export interface ConfiguracionFormluarioGrupo {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  EmpresaProductora?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_GRUPO = (): ConfiguracionFormluarioGrupo => {
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

    EmpresaProductora: {
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
