
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
    NO_EXISTEN_REGISTROS
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {AdministradorEstablecimiento} from './administrador-establecimiento';
import {AdministradorEstablecimientoFormulario} from './administrador-establecimiento-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {ContactoEmpresaRestService} from '../../../../servicios/rest/contacto-empresa-rest.service';
import {ContactoEmpresaInterface} from '../../../../interfaces/contacto-empresa.interface';


@Component({
    selector: 'ml-administrador-establecimiento-formulario',
    templateUrl: './administrador-establecimiento-formulario.component.html'
})

export class AdministradorEstablecimientoFormularioComponent implements OnInit {

    @Output() administradorEstablecimientoValido: EventEmitter<AdministradorEstablecimiento | boolean> = new EventEmitter();

    @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

    @Input() configuracionDisabled: ConfiguracionFormluarioAdministradorEstablecimiento;

    @Input() idEmpresa: number;

    administradorEstablecimiento: AdministradorEstablecimientoFormulario;

    NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

    mensajeToaster = '';

    objetoVariablesGlobales: ObjetoVariablesGlobalesAdministradorEstablecimiento = {

        contactoEmpresas: [],
    };

    constructor(private _formBuilder: FormBuilder,
        private _cargandoService: CargandoService,
        private _toasterService: ToasterService,
        private _contactoEmpresaRestService: ContactoEmpresaRestService,

        ) {

    }

    ngOnInit() {

        this.administradorEstablecimiento = new AdministradorEstablecimientoFormulario(
             this.configuracionDisabled.ContactoEmpresa.valor,
             this.configuracionDisabled.NombreContacto.valor,
             this.configuracionDisabled.DocumentoContacto.valor,
             this.configuracionDisabled.GestionaPtoEmision.valor,
        );

        // Empieza la construccion del formulario - No tocar estas lineas

        establecerCamposDisabled(this.configuracionDisabled, this.administradorEstablecimiento);
        this.administradorEstablecimiento.formGroup = this._formBuilder.group(encerarFormBuilder(this.administradorEstablecimiento));
        generarMensajesFormGroup(this.configuracionDisabled, this.administradorEstablecimiento);
        generarEmiteEmpezoTipear(this.administradorEstablecimiento, this.empezoATipear);

        // Termina la construccion del formulario - No tocar estas lineas

        this.administradorEstablecimiento
            .formGroup
            .valueChanges
            .pipe(
                debounceTime(1000)
            )
            .subscribe(
                camposValidados => {


                    this.mensajeToaster = '';

                    if (this.validacionesCampos() && this.administradorEstablecimiento.formGroup.valid) {

                        this.administradorEstablecimientoValido.emit(generarCampos(this.administradorEstablecimiento));
                        this._toasterService.pop('info', 'Valido', 'Administrador de establecimiento válida ');

                    } else {

                        if (this.mensajeToaster !== '') {
                            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
                        }
                        this.administradorEstablecimientoValido.emit(false);
                    }
                }
            );
    }

    validacionesCampos() {
        return this.validarEjemplo() && this.validarContactoEmpresa();
    }

    validarEjemplo() {
        return true; // Implementacion de validacion ejemplo
    }


  validarContactoEmpresa() {
    if (this.administradorEstablecimiento.formGroup.get('contactoEmpresa').value !== null) {
      const contactoEmpresaValorActual = this.administradorEstablecimiento.formGroup.get(
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
          this.administradorEstablecimiento.formGroup.get('nombreContacto').value &&
          this.administradorEstablecimiento.formGroup.get('documentoContacto').value;
        if (camposNombresYApellidosExisten) {
          this.administradorEstablecimiento.formGroup.patchValue({
            nombreContacto: null,
            documentoContacto: null,
          });
        }
        return false;
      }
    }
  }

  buscarContactoEmpresas(evento) {
    this._cargandoService.habilitarCargando();
    const datos = {
      busqueda: evento.query,
      skip: 0,
      camposABuscar: ['nombres', 'apellidos', 'identificacionPais'],
      habilitado: 1,
      esAdminPtoEmi: 1,
      idEmpresa: this.idEmpresa,
    };
    this._contactoEmpresaRestService.obtenerContactosEmpresa(datos).subscribe(
      (contactoEmpresas: [[ContactoEmpresaInterface], number]) => {
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
    this.administradorEstablecimiento.formGroup.patchValue({
      nombreContacto: evento.datosUsuario.nombres + ' ' + evento.datosUsuario.apellidos,
      documentoContacto: evento.datosUsuario.identificacionPais,
    });
  }


}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesAdministradorEstablecimiento {
    contactoEmpresas: ContactoEmpresaInterface[];

}

export interface ConfiguracionFormluarioAdministradorEstablecimiento {
  Id?: ConfiguracionDisabledInterfaz;
  ContactoEmpresa?: ConfiguracionDisabledInterfaz;
  NombreContacto?: ConfiguracionDisabledInterfaz;
  DocumentoContacto?: ConfiguracionDisabledInterfaz;
  GestionaPtoEmision?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_ADMINISTRADORESTABLECIMIENTO = (): ConfiguracionFormluarioAdministradorEstablecimiento => {
    return {
        Id: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },
        ContactoEmpresa: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

        NombreContacto: {
            valor: null,
            disabled: true,
            hidden: false,
            calculoFormulario: undefined
        },

        DocumentoContacto: {
            valor: null,
            disabled: true,
            hidden: false,
            calculoFormulario: undefined
        },

        GestionaPtoEmision: {
            valor: null,
            disabled: false,
            hidden: false,
            calculoFormulario: undefined
        },

    };
};
