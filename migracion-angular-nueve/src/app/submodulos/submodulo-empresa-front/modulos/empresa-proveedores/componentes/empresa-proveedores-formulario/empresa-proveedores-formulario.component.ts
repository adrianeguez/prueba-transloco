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
import { EmpresaProveedores } from './empresa-proveedores';
import { EmpresaProveedoresFormulario } from './empresa-proveedores-formulario';
import { debounceTime } from 'rxjs/operators';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-empresa-proveedores-formulario',
  templateUrl: './empresa-proveedores-formulario.component.html',
})
export class EmpresaProveedoresFormularioComponent implements OnInit {
  @Output() empresaProveedoresValido: EventEmitter<
    EmpresaProveedores | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioEmpresaProveedores;

  @Input() idEmpresa: number;

  empresaProveedores: EmpresaProveedoresFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesEmpresaProveedores = {
    empresas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _empresaRestService: EmpresaRestService,
  ) {}

  ngOnInit() {
    this.empresaProveedores = new EmpresaProveedoresFormulario(
      this.configuracionDisabled.EmpresaProveedor.valor,
      this.configuracionDisabled.RazonSocial.valor,
      this.configuracionDisabled.Ruc.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(
      this.configuracionDisabled,
      this.empresaProveedores,
    );
    this.empresaProveedores.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.empresaProveedores),
    );
    generarMensajesFormGroup(
      this.configuracionDisabled,
      this.empresaProveedores,
    );
    generarEmiteEmpezoTipear(this.empresaProveedores, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.empresaProveedores.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (
          this.validacionesCampos() &&
          this.empresaProveedores.formGroup.valid
        ) {
          this.empresaProveedoresValido.emit(
            generarCampos(this.empresaProveedores),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Empresa de proveedores válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.empresaProveedoresValido.emit(false);
        }
      });
  }

  validacionesCampos(): boolean {
    return this.validarEjemplo() && this.validarEmpresa();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarEmpresa() {
    if (
      this.empresaProveedores.formGroup.get('empresaProveedor').value !== null
    ) {
      const empresaProveedorValorActual = this.empresaProveedores.formGroup.get(
        'empresaProveedor',
      ).value.id;
      const empresaEncontrado = this.objetoVariablesGlobales.empresas.find(
        registro => registro.id === empresaProveedorValorActual,
      );
      if (empresaEncontrado || empresaProveedorValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione una empresa válida';
        const razonSocial = this.empresaProveedores.formGroup.get('razonSocial')
          .value;
        const ruc = this.empresaProveedores.formGroup.get('ruc').value;
        if (razonSocial && ruc) {
          this.empresaProveedores.formGroup.patchValue({
            razonSocial: undefined,
            ruc: undefined,
          });
        }
        return false;
      }
    }
  }

  //
  buscarEmpresas(evento) {
    this._cargandoService.habilitarCargando();
    let empresaProveedors$;
    const consulta = {
      // lenar la consulta
      where: [
        {
          razonSocial: `Like(\"%25${evento.query}%25\")`,
          habilitado: ESTADOS.Activo,
          id: `Not(\"Equal(\"${this.idEmpresa}\")\")`,
        },
        {
          ruc: `Like(\"%25${evento.query}%25\")`,
          habilitado: ESTADOS.Activo,
          id: `Not(\"Equal(\"${this.idEmpresa}\")\")`,
        },
      ],
    };
    empresaProveedors$ = this._empresaRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(consulta),
    );
    empresaProveedors$.subscribe(
      (empresas: any[]) => {
        this.objetoVariablesGlobales.empresas = empresas[0];
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
    this.empresaProveedores.formGroup.patchValue({
      razonSocial: evento.razonSocial,
      ruc: evento.ruc,
    });
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesEmpresaProveedores {
  empresas: EmpresaInterface[];
}

export interface ConfiguracionFormluarioEmpresaProveedores {
  Id?: ConfiguracionDisabledInterfaz;
  EmpresaProveedor?: ConfiguracionDisabledInterfaz;
  RazonSocial?: ConfiguracionDisabledInterfaz;
  Ruc?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_EMPRESAPROVEEDORES = (): ConfiguracionFormluarioEmpresaProveedores => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    EmpresaProveedor: {
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
  };
};
