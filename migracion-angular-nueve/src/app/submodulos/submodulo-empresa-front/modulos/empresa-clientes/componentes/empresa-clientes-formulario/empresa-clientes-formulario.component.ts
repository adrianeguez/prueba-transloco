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
import { EmpresaClientes } from './empresa-clientes';
import { EmpresaClientesFormulario } from './empresa-clientes-formulario';
import { debounceTime } from 'rxjs/operators';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-empresa-clientes-formulario',
  templateUrl: './empresa-clientes-formulario.component.html',
})
export class EmpresaClientesFormularioComponent implements OnInit {
  @Output() empresaClientesValido: EventEmitter<
    EmpresaClientes | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioEmpresaClientes;

  @Input() idEmpresa: number;

  empresaClientes: EmpresaClientesFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesEmpresaClientes = {
    empresas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _empresaRestService: EmpresaRestService,
  ) {}

  ngOnInit() {
    this.empresaClientes = new EmpresaClientesFormulario(
      this.configuracionDisabled.EmpresaCliente.valor,
      this.configuracionDisabled.RazonSocial.valor,
      this.configuracionDisabled.Ruc.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.empresaClientes);
    this.empresaClientes.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.empresaClientes),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.empresaClientes);
    generarEmiteEmpezoTipear(this.empresaClientes, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.empresaClientes.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.validacionesCampos() && this.empresaClientes.formGroup) {
          this.empresaClientesValido.emit(generarCampos(this.empresaClientes));
          this._toasterService.pop('info', 'Valido', 'Empresa de clientes válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.empresaClientesValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarEmpresa();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarEmpresa() {
    if (this.empresaClientes.formGroup.get('empresaCliente').value !== null) {
      const empresaClienteValorActual = this.empresaClientes.formGroup.get(
        'empresaCliente',
      ).value.id;
      const empresaEncontrado = this.objetoVariablesGlobales.empresas.find(
        registro => registro.id === empresaClienteValorActual,
      );
      if (empresaEncontrado || empresaClienteValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione una empresa válida';
        const razonSocial = this.empresaClientes.formGroup.get('razonSocial')
          .value;
        const ruc = this.empresaClientes.formGroup.get('ruc').value;
        if (razonSocial && ruc) {
          this.empresaClientes.formGroup.patchValue({
            razonSocial: undefined,
            ruc: undefined,
          });
        }
        return false;
      }
    }
  }

  buscarEmpresas(evento) {
    this._cargandoService.habilitarCargando();
    let empresaClientes$;
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
    empresaClientes$ = this._empresaRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(consulta),
    );
    empresaClientes$.subscribe(
      (empresas: any[]) => {
        this.objetoVariablesGlobales.empresas = empresas[0];
        this.validarEmpresa();
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
    this.empresaClientes.formGroup.patchValue({
      razonSocial: evento.razonSocial,
      ruc: evento.ruc,
    });
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesEmpresaClientes {
  empresas: EmpresaInterface[];
}

export interface ConfiguracionFormluarioEmpresaClientes {
  Id?: ConfiguracionDisabledInterfaz;
  EmpresaCliente?: ConfiguracionDisabledInterfaz;
  RazonSocial?: ConfiguracionDisabledInterfaz;
  Ruc?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_EMPRESACLIENTES = (): ConfiguracionFormluarioEmpresaClientes => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    EmpresaCliente: {
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
