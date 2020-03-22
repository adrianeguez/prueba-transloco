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
import {ContactoEmpresa} from './contacto-empresa';
import {ContactoEmpresaFormulario} from './contacto-empresa-formulario';
import {debounceTime} from 'rxjs/operators';
import {DatosUsuarioRestService} from '../../../../servicios/rest/datos-usuario-rest.service';
import {TipoCargoRestService} from '../../../../servicios/rest/tipo-cargo-rest.service';
import {DatosUsuarioInterface} from '../../../../interfaces/datos-usuario.interface';
import {TipoCargoInterface} from '../../../../interfaces/tipo-cargo.interface';
import {ESTADOS} from '../../../../../../enums/estados';
import {CargandoService} from 'man-lab-ng';

@Component({
  selector: 'ml-contacto-empresa-formulario',
  templateUrl: './contacto-empresa-formulario.component.html',
})
export class ContactoEmpresaFormularioComponent implements OnInit {
  @Output() contactoEmpresaValido: EventEmitter<ContactoEmpresa | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioContactoEmpresa;

  @Input() idEmpresa: number;

  contactoEmpresa: ContactoEmpresaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesContactoEmpresa = {
    datosUsuarios: [],
    tipoCargos: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _datosUsuarioRestService: DatosUsuarioRestService,
    private _tipoCargoRestService: TipoCargoRestService,
  ) {
  }

  ngOnInit() {
    this.contactoEmpresa = new ContactoEmpresaFormulario(
      this.configuracionDisabled.DatosUsuario.valor,
      this.configuracionDisabled.Nombres.valor,
      this.configuracionDisabled.Apellidos.valor,
      this.configuracionDisabled.TipoCargo.valor,
      this.configuracionDisabled.Observacion.valor,
      this.configuracionDisabled.EsOperario.valor,
      this.configuracionDisabled.EsAdminPtoEmi.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.contactoEmpresa);
    this.contactoEmpresa.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.contactoEmpresa),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.contactoEmpresa);
    generarEmiteEmpezoTipear(this.contactoEmpresa, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.contactoEmpresa.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.validacionesCampos() && this.contactoEmpresa.formGroup.valid) {
          this.contactoEmpresaValido.emit(generarCampos(this.contactoEmpresa));
          this._toasterService.pop('info', 'Valido', 'Contacto de empresa válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.contactoEmpresaValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return (
      this.validarEjemplo() &&
      this.validarDatosUsuario() &&
      this.validarTipoCargo()
    );
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarDatosUsuario() {
    if (this.contactoEmpresa.formGroup.get('datosUsuario').value !== null) {
      const datosUsuarioValorActual = this.contactoEmpresa.formGroup.get(
        'datosUsuario',
      ).value.id;
      const datosUsuarioEncontrado = this.objetoVariablesGlobales.datosUsuarios.find(
        registro => registro.id === datosUsuarioValorActual,
      );
      if (datosUsuarioEncontrado || datosUsuarioValorActual) {
        return true;
      } else {
        this.mensajeToaster = 'Seleccione un contacto válido';
        if (
          this.contactoEmpresa.formGroup.get('nombres').value &&
          this.contactoEmpresa.formGroup.get('apellidos').value
        ) {
          this.contactoEmpresa.formGroup.patchValue({
            nombres: null,
            apellidos: null,
          });
        }
        return false;
      }
    }
  }

  seleccionarContacto(evento) {
    this.contactoEmpresa.formGroup.patchValue({
      nombres: evento.nombres,
      apellidos: evento.apellidos,
    });
  }

  buscarDatosUsuarios(evento) {
    this._cargandoService.habilitarCargando();
    let datosUsuarios$;
    const consulta = {
      where: {
        identificacionPais: [`Like(\"%25${evento.query}%25\")`],
        apellidos: [`Like(\"%25${evento.query}%25\")`],
        mlabOr: true,
      }
    };
    datosUsuarios$ = this._datosUsuarioRestService
      .findAll(
        'criterioBusqueda=' + JSON.stringify(consulta)
      );
    datosUsuarios$
      .subscribe(
        (datosUsuarios: [DatosUsuarioInterface[], number]) => {
          console.log(datosUsuarios);
          this.objetoVariablesGlobales.datosUsuarios = datosUsuarios[0];
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._toasterService.pop(
            'error',
            'ERROR',
            'Revisa tu conexion o intentalo mas tarde',
          );
          this._cargandoService.deshabilitarCargando();
          // Manejar errores
        },
      );
  }

  validarTipoCargo() {
    if (this.contactoEmpresa.formGroup.get('tipoCargo').value !== null) {
      const tipoCargoValorActual = this.contactoEmpresa.formGroup.get(
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
      where: {
        nombre: `Like(\"%25${evento.query}%25\")`,
        empresa: {
          id: this.idEmpresa
        },
        habilitado: ESTADOS.Activo,
      },
    };
    tipoCargos$ = this._tipoCargoRestService
      .findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    tipoCargos$
      .subscribe(
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
interface ObjetoVariablesGlobalesContactoEmpresa {
  datosUsuarios: DatosUsuarioInterface[];
  tipoCargos: TipoCargoInterface[];
}

export interface ConfiguracionFormluarioContactoEmpresa {
  Id?: ConfiguracionDisabledInterfaz;
  DatosUsuario?: ConfiguracionDisabledInterfaz;
  Nombres?: ConfiguracionDisabledInterfaz;
  Apellidos?: ConfiguracionDisabledInterfaz;
  TipoCargo?: ConfiguracionDisabledInterfaz;
  Observacion?: ConfiguracionDisabledInterfaz;
  EsOperario?: ConfiguracionDisabledInterfaz;
  EsAdminPtoEmi?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CONTACTOEMPRESA = (): ConfiguracionFormluarioContactoEmpresa => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    DatosUsuario: {
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

    Observacion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    EsOperario: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    EsAdminPtoEmi: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
  };
};
