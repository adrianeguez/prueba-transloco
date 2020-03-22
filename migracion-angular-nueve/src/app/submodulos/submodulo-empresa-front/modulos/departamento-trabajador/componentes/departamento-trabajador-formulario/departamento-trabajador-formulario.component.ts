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
import { DepartamentoTrabajador } from './departamento-trabajador';
import { DepartamentoTrabajadorFormulario } from './departamento-trabajador-formulario';
import { debounceTime } from 'rxjs/operators';
import { TipoCargoRestService } from '../../../../servicios/rest/tipo-cargo-rest.service';
import { ContactoEmpresaRestService } from '../../../../servicios/rest/contacto-empresa-rest.service';
import { ContactoEmpresaInterface } from '../../../../interfaces/contacto-empresa.interface';
import { TipoCargoInterface } from '../../../../interfaces/tipo-cargo.interface';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-departamento-trabajador-formulario',
  templateUrl: './departamento-trabajador-formulario.component.html',
})
export class DepartamentoTrabajadorFormularioComponent implements OnInit {
  @Output() departamentoTrabajadorValido: EventEmitter<
    DepartamentoTrabajador | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDepartamentoTrabajador;

  @Input() idEmpresa: number;

  departamentoTrabajador: DepartamentoTrabajadorFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesDepartamentoTrabajador = {
    contactoEmpresas: [],
    tipoCargos: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _contactoEmpresaRestService: ContactoEmpresaRestService,
    private _tipoCargoRestService: TipoCargoRestService,
  ) {}

  ngOnInit() {
    this.departamentoTrabajador = new DepartamentoTrabajadorFormulario(
      this.configuracionDisabled.ContactoEmpresa.valor,
      this.configuracionDisabled.Nombres.valor,
      this.configuracionDisabled.Apellidos.valor,
      this.configuracionDisabled.TipoCargo.valor,
      this.configuracionDisabled.Descripcion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(
      this.configuracionDisabled,
      this.departamentoTrabajador,
    );
    this.departamentoTrabajador.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.departamentoTrabajador),
    );
    generarMensajesFormGroup(
      this.configuracionDisabled,
      this.departamentoTrabajador,
    );
    generarEmiteEmpezoTipear(this.departamentoTrabajador, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.departamentoTrabajador.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (
          this.validacionesCampos() &&
          this.departamentoTrabajador.formGroup.valid
        ) {
          this.departamentoTrabajadorValido.emit(
            generarCampos(this.departamentoTrabajador),
          );
          this._toasterService.pop(
            'info',
            'Valido',
            'Departamento de trabajador válida ',
          );
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.departamentoTrabajadorValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return (
      this.validarEjemplo() &&
      this.validarContactoEmpresa() &&
      this.validarTipoCargo()
    );
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarContactoEmpresa() {
    if (
      this.departamentoTrabajador.formGroup.get('contactoEmpresa').value !==
      null
    ) {
      const contactoEmpresaValorActual = this.departamentoTrabajador.formGroup.get(
        'contactoEmpresa',
      ).value.id;
      // tslint:disable-next-line:max-line-length
      const contactoEmpresaEncontrado = this.objetoVariablesGlobales.contactoEmpresas.find(
        registro => registro.id === contactoEmpresaValorActual,
      );
      if (contactoEmpresaEncontrado || contactoEmpresaValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione un contacto válido';
        // tslint:disable-next-line:max-line-length
        const camposNombresYApellidosExisten =
          this.departamentoTrabajador.formGroup.get('nombres').value &&
          this.departamentoTrabajador.formGroup.get('apellidos').value;
        if (camposNombresYApellidosExisten) {
          this.departamentoTrabajador.formGroup.patchValue({
            nombres: null,
            apellidos: null,
          });
        }
        return false;
      }
    }
  }

  buscarContactoEmpresas(evento) {
    this._cargandoService.habilitarCargando();
    let contactoEmpresas$;
    if (evento.query === '') {
      const consulta = {
        where: { empresa: this.idEmpresa, habilitado: ESTADOS.Activo },
        relations: ['datosUsuario', 'empresa'],
      };
      contactoEmpresas$ = this._contactoEmpresaRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    } else {
      const consulta = {
        // lenar la consulta
        camposABuscar: [
          {
            campo: 'habilitado',
            valor: ESTADOS.Activo,
          },
        ],
        relations: [
          {
            key: 'empresa',
            entidad: 'empresa',
            query: [
              {
                campo: 'id',
                valor: +this.idEmpresa,
              },
            ],
          },
          {
            key: 'datosUsuario',
            entidad: 'datosUsuario',
            query: [
              {
                campo: 'identificacionPais',
                valor: `%25${evento.query}%25`,
                like: true,
              },
            ],
          },
        ],
      };
      contactoEmpresas$ = this._contactoEmpresaRestService.findWhereOr(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }
    contactoEmpresas$.subscribe(
      (contactoEmpresas: any[]) => {
        this.objetoVariablesGlobales.contactoEmpresas = contactoEmpresas[0];
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

  seleccionarContacto(evento) {
    this.departamentoTrabajador.formGroup.patchValue({
      nombres: evento.datosUsuario.nombres,
      apellidos: evento.datosUsuario.apellidos,
    });
  }

  validarTipoCargo() {
    if (this.departamentoTrabajador.formGroup.get('tipoCargo').value !== null) {
      const tipoCargoValorActual = this.departamentoTrabajador.formGroup.get(
        'tipoCargo',
      ).value.id;
      const tipoCargoEncontrado = this.objetoVariablesGlobales.tipoCargos.find(
        registro => registro.id === tipoCargoValorActual,
      );
      if (tipoCargoEncontrado || tipoCargoValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione un Tipo de Cargo válido';
        return false;
      }
    }
  }

  buscarTipoCargos(evento) {
    this._cargandoService.habilitarCargando();
    let tipoCargos$;
    const consulta = {
      // lenar la consulta
      where: {
        nombre: `Like(\"%25${evento.query}%25\")`,
        empresa: this.idEmpresa,
        habilitado: ESTADOS.Activo,
      },
    };
    tipoCargos$ = this._tipoCargoRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(consulta),
    );
    tipoCargos$.subscribe(
      (tipoCargos: [TipoCargoInterface[], number]) => {
        this.objetoVariablesGlobales.tipoCargos = tipoCargos[0];
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
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesDepartamentoTrabajador {
  contactoEmpresas: ContactoEmpresaInterface[];
  tipoCargos: TipoCargoInterface[];
}

export interface ConfiguracionFormluarioDepartamentoTrabajador {
  Id?: ConfiguracionDisabledInterfaz;
  ContactoEmpresa?: ConfiguracionDisabledInterfaz;
  Nombres?: ConfiguracionDisabledInterfaz;
  Apellidos?: ConfiguracionDisabledInterfaz;
  TipoCargo?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DEPARTAMENTOTRABAJADOR = (): ConfiguracionFormluarioDepartamentoTrabajador => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    ContactoEmpresa: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Nombres: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Apellidos: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    TipoCargo: {
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
  };
};
