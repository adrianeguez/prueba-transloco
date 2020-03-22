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
import { Empresa } from './empresa';
import { EmpresaFormulario } from './empresa-formulario';
import { debounceTime } from 'rxjs/operators';
import { TIPOS_EMPRESA_ENUM } from '../../../tipos-empresa-enums';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-empresa-formulario',
  templateUrl: './empresa-formulario.component.html',
})
export class EmpresaFormularioComponent implements OnInit {
  @Output() empresaValido: EventEmitter<Empresa | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioEmpresa;

  empresa: EmpresaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesEmpresa = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.empresa = new EmpresaFormulario(
      this.configuracionDisabled.NombreComercial.valor,
      this.configuracionDisabled.RazonSocial.valor,
      this.configuracionDisabled.Ruc.valor,
      this.configuracionDisabled.DireccionMatriz.valor,
      this.configuracionDisabled.Telefono.valor,
      this.configuracionDisabled.Correo.valor,
      this.configuracionDisabled.TipoContribuyente.valor,
      this.configuracionDisabled.ContribuyenteEspecial.valor,
      this.configuracionDisabled.ObligadoContabilidad.valor,
      this.configuracionDisabled.Codigo.valor,
      this.configuracionDisabled.Tipo.valor,
      this.configuracionDisabled.EsEstacionServicioPropia.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.empresa);
    this.empresa.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.empresa),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.empresa);
    generarEmiteEmpezoTipear(this.empresa, this.empezoATipear);
    this.mostrarOcultarSelectEstacionServicio();

    // Termina la construccion del formulario - No tocar estas lineas

    this.empresa.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mostrarOcultarSelectEstacionServicio();
        console.log(this.empresa.formGroup);
        if (this.empresa.formGroup.valid && this.validacionesCampos()) {
          this.empresaValido.emit(generarCampos(this.empresa));
          this._toasterService.pop('info', 'Valido', 'Empresa válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.empresaValido.emit(false);
        }
      });
  }

  mostrarOcultarSelectEstacionServicio() {
    this.configuracionDisabled.EsEstacionServicioPropia.hidden = true;
    this.configuracionDisabled.ContribuyenteEspecial.hidden = true;
    const tipoContribuyenteSeleccionado = this.empresa.formGroup.get(
      'tipoContribuyente',
    ).value;
    const esTipoContribuyenteEspecial =
      tipoContribuyenteSeleccionado === 'Especial';
    this.configuracionDisabled.ContribuyenteEspecial.disabled = !esTipoContribuyenteEspecial;
    this.configuracionDisabled.ContribuyenteEspecial.hidden = !esTipoContribuyenteEspecial;
  }

  validacionesCampos() {
    return this.validarEjemplo();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesEmpresa {}

export interface ConfiguracionFormluarioEmpresa {
  Id?: ConfiguracionDisabledInterfaz;
  NombreComercial?: ConfiguracionDisabledInterfaz;
  RazonSocial?: ConfiguracionDisabledInterfaz;
  Ruc?: ConfiguracionDisabledInterfaz;
  DireccionMatriz?: ConfiguracionDisabledInterfaz;
  Telefono?: ConfiguracionDisabledInterfaz;
  Correo?: ConfiguracionDisabledInterfaz;
  TipoContribuyente?: ConfiguracionDisabledInterfaz;
  ContribuyenteEspecial?: ConfiguracionDisabledInterfaz;
  ObligadoContabilidad?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
  Tipo?: ConfiguracionDisabledInterfaz;
  EsEstacionServicioPropia?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_EMPRESA = (): ConfiguracionFormluarioEmpresa => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    NombreComercial: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    RazonSocial: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Ruc: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    DireccionMatriz: {
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

    Correo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    TipoContribuyente: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    ContribuyenteEspecial: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    ObligadoContabilidad: {
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

    Tipo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    EsEstacionServicioPropia: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
