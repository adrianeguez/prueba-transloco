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
import { AreaTrabajador } from './area-trabajador';
import { AreaTrabajadorFormulario } from './area-trabajador-formulario';
import { debounceTime } from 'rxjs/operators';
import { ContactoEmpresaRestService } from '../../../../servicios/rest/contacto-empresa-rest.service';
import { ContactoEmpresa } from '../../../contacto-empresa/componentes/contacto-empresa-formulario/contacto-empresa';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-area-trabajador-formulario',
  templateUrl: './area-trabajador-formulario.component.html',
})
export class AreaTrabajadorFormularioComponent implements OnInit {
  @Output() areaTrabajadorValido: EventEmitter<
    AreaTrabajador | boolean
  > = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioAreaTrabajador;

  @Input() idEmpresa;

  areaTrabajador: AreaTrabajadorFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesAreaTrabajador = {
    contactoEmpresas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _contactoEmpresaRestService: ContactoEmpresaRestService,
  ) {}

  ngOnInit() {
    this.areaTrabajador = new AreaTrabajadorFormulario(
      this.configuracionDisabled.ContactoEmpresa.valor,
      this.configuracionDisabled.Nombres.valor,
      this.configuracionDisabled.Apellidos.valor,
      this.configuracionDisabled.DescripcionUbicacion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.areaTrabajador);
    this.areaTrabajador.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.areaTrabajador),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.areaTrabajador);
    generarEmiteEmpezoTipear(this.areaTrabajador, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.areaTrabajador.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.validacionesCampos() && this.areaTrabajador.formGroup.valid) {
          this.areaTrabajadorValido.emit(generarCampos(this.areaTrabajador));
          this._toasterService.pop('info', 'Valido', 'Area trabajador válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.areaTrabajadorValido.emit(false);
        }
      });
  }

  seleccionarUsuario(evento) {
    this.areaTrabajador.formGroup.patchValue({
      nombres: evento.datosUsuario.nombres,
      apellidos: evento.datosUsuario.apellidos,
    });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarContactoEmpresa();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarContactoEmpresa() {
    if (this.areaTrabajador.formGroup.get('contactoEmpresa').value !== null) {
      const contactoEmpresaValorActual = this.areaTrabajador.formGroup.get(
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
          this.areaTrabajador.formGroup.get('nombres').value &&
          this.areaTrabajador.formGroup.get('apellidos').value;
        if (camposNombresYApellidosExisten) {
          this.areaTrabajador.formGroup.patchValue({
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
      (contactoEmpresas: [ContactoEmpresa[], number]) => {
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
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesAreaTrabajador {
  contactoEmpresas: ContactoEmpresa[];
}

export interface ConfiguracionFormluarioAreaTrabajador {
  Id?: ConfiguracionDisabledInterfaz;
  ContactoEmpresa?: ConfiguracionDisabledInterfaz;
  Nombres?: ConfiguracionDisabledInterfaz;
  Apellidos?: ConfiguracionDisabledInterfaz;
  DescripcionUbicacion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_AREATRABAJADOR = (): ConfiguracionFormluarioAreaTrabajador => {
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

    DescripcionUbicacion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};
