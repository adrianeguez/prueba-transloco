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
import { SubempresaFormulario } from './subempresa-formulario';
import { debounceTime } from 'rxjs/operators';
import { Subempresa } from './subempresa';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { SubempresaInterface } from '../../../../interfaces/subempresa.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-subempresa-formulario',
  templateUrl: './subempresa-formulario.component.html',
})
export class SubempresaFormularioComponent implements OnInit {
  @Output() subempresaValido: EventEmitter<
    Subempresa | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioSubempresa;

  @Input() idEmpresaPadre: number;

  subempresa: SubempresaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesSubempresa = {
    subempresas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private empresaRestService: EmpresaRestService,
  ) {}

  ngOnInit() {
    this.subempresa = new SubempresaFormulario(
      this.configuracionDisabled.EmpresaHijo.valor,
      this.configuracionDisabled.RazonSocial.valor,
      this.configuracionDisabled.Ruc.valor,
      this.configuracionDisabled.Nivel.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.subempresa);
    this.subempresa.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.subempresa),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.subempresa);
    generarEmiteEmpezoTipear(this.subempresa, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.subempresa.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.validacionesCampos() && this.subempresa.formGroup.valid) {
          this.subempresaValido.emit(generarCampos(this.subempresa));
          this._toasterService.pop('info', 'Valido', 'Subempresa válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.subempresaValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarSubempresa();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarSubempresa() {
    if (this.subempresa.formGroup.get('empresaHijo').value !== null) {
      const empresaHijoValorActual = this.subempresa.formGroup.get(
        'empresaHijo',
      ).value.id;
      const subempresaEncontrado = this.objetoVariablesGlobales.subempresas.find(
        registro => registro.id === empresaHijoValorActual,
      );
      if (subempresaEncontrado || empresaHijoValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione una empresa válida';
        const razonSocial = this.subempresa.formGroup.get('razonSocial').value;
        const ruc = this.subempresa.formGroup.get('ruc').value;
        if (razonSocial && ruc) {
          this.subempresa.formGroup.patchValue({
            razonSocial: undefined,
            ruc: undefined,
          });
        }
        return false;
      }
    }
  }

  buscarSubempresas(evento) {
    this._cargandoService.habilitarCargando();
    let empresaHijos$;
    let consulta;
    consulta = {
      idEmpresaPadre: this.idEmpresaPadre,
      habilitado: 1,
    };
    if (evento.query !== '') {
      consulta.camposABuscar = [
        { campo: 'ruc', valor: evento.query },
        { campo: 'razonSocial', valor: evento.query },
      ];
    }
    empresaHijos$ = this.empresaRestService.buscarEmpresasSinPadres(consulta);
    empresaHijos$.subscribe(
      (subempresas: any[]) => {
        this.objetoVariablesGlobales.subempresas = subempresas;
        this.validarSubempresa();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(
          'error',
          'ERROR',
          'Revisa tu conexion o intentalo mas tarde',
        );
        // Manejar errores
      },
    );
  }

  seleccionarEmpresa(evento) {
    this.subempresa.formGroup.patchValue({
      razonSocial: evento.razonSocial,
      ruc: evento.ruc,
    });
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesSubempresa {
  subempresas: SubempresaInterface[];
}

export interface ConfiguracionFormluarioSubempresa {
  Id?: ConfiguracionDisabledInterfaz;
  EmpresaHijo?: ConfiguracionDisabledInterfaz;
  RazonSocial?: ConfiguracionDisabledInterfaz;
  Ruc?: ConfiguracionDisabledInterfaz;
  Nivel?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_SUBEMPRESA = (): ConfiguracionFormluarioSubempresa => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    EmpresaHijo: {
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

    Nivel: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
