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
import { Bodega } from './bodega';
import { BodegaFormulario } from './bodega-formulario';
import { debounceTime } from 'rxjs/operators';
import { ContactoEmpresaRestService } from '../../../../servicios/rest/contacto-empresa-rest.service';
import { ContactoEmpresaInterface } from '../../../../interfaces/contacto-empresa.interface';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-bodega-formulario',
  templateUrl: './bodega-formulario.component.html',
})
export class BodegaFormularioComponent implements OnInit {
  @Output() bodegaValido: EventEmitter<Bodega | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioBodega;

  @Input() idEmpresa: number;

  bodega: BodegaFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesBodega = {
    contactoEmpresas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _contactoEmpresaRestService: ContactoEmpresaRestService,
  ) {}

  ngOnInit() {
    this.bodega = new BodegaFormulario(
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Codigo.valor,
      this.configuracionDisabled.Direccion.valor,
      this.configuracionDisabled.EsPercha.valor,
      this.configuracionDisabled.ContactoEmpresa.valor,
      this.configuracionDisabled.Nombres.valor,
      this.configuracionDisabled.Apellidos.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.bodega);
    this.bodega.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.bodega),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.bodega);
    generarEmiteEmpezoTipear(this.bodega, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.bodega.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.validacionesCampos() && this.bodega.formGroup.valid) {
          this.bodegaValido.emit(generarCampos(this.bodega));
          this._toasterService.pop('info', 'Valido', 'Bodega válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.bodegaValido.emit(false);
        }
      });
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarContactoEmpresa();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  validarContactoEmpresa() {
    if (this.bodega.formGroup.get('contactoEmpresa').value !== null) {
      const contactoEmpresaValorActual = this.bodega.formGroup.get(
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
          this.bodega.formGroup.get('nombres').value &&
          this.bodega.formGroup.get('apellidos').value;
        if (camposNombresYApellidosExisten) {
          this.bodega.formGroup.patchValue({
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
        console.log(contactoEmpresas[0]);
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
    this.bodega.formGroup.patchValue({
      nombres: evento.datosUsuario.nombres,
      apellidos: evento.datosUsuario.apellidos,
    });
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesBodega {
  contactoEmpresas: ContactoEmpresaInterface[];
}

export interface ConfiguracionFormluarioBodega {
  Id?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Codigo?: ConfiguracionDisabledInterfaz;
  Direccion?: ConfiguracionDisabledInterfaz;
  EsPercha?: ConfiguracionDisabledInterfaz;
  ContactoEmpresa?: ConfiguracionDisabledInterfaz;
  Nombres?: ConfiguracionDisabledInterfaz;
  Apellidos?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_BODEGA = (): ConfiguracionFormluarioBodega => {
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

    Codigo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Direccion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    EsPercha: {
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
  };
};
