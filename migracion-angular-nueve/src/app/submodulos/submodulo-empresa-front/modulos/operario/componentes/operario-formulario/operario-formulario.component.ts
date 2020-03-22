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
import {Operario} from './operario';
import {OperarioFormulario} from './operario-formulario';
import {debounceTime} from 'rxjs/operators';
import {ContactoEmpresaRestService} from '../../../../servicios/rest/contacto-empresa-rest.service';
import {ContactoEmpresaInterface} from '../../../../interfaces/contacto-empresa.interface';
import {CargandoService} from 'man-lab-ng';

@Component({
  selector: 'ml-operario-formulario',
  templateUrl: './operario-formulario.component.html',
})
export class OperarioFormularioComponent implements OnInit {
  @Output() operarioValido: EventEmitter<Operario | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioOperario;

  @Input() idEmpresa: number;
  operario: OperarioFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesOperario = {
    contactoEmpresas: [],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private _contactoEmpresaRestService: ContactoEmpresaRestService,
  ) {
  }

  ngOnInit() {
    this.operario = new OperarioFormulario(
      this.configuracionDisabled.ContactoEmpresa.valor,
      this.configuracionDisabled.Nombres.valor,
      this.configuracionDisabled.Apellidos.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.operario);
    this.operario.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.operario),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.operario);
    generarEmiteEmpezoTipear(this.operario, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.operario.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        this.mensajeToaster = '';

        if (this.validacionesCampos() && this.operario.formGroup.valid) {
          this.operarioValido.emit(generarCampos(this.operario));
          this._toasterService.pop('info', 'Valido', 'Operario válida ');
        } else {
          if (this.mensajeToaster !== '') {
            this._toasterService.pop('warning', 'Cuidado', this.mensajeToaster);
          }
          this.operarioValido.emit(false);
        }
      });
    console.log(this.operario.formGroup.get('contactoEmpresa').value);
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarContactoEmpresa();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }

  pene(huevo) {
    console.log('huevo');
    return 'el huevo te encanta';
  }

  validarContactoEmpresa() {
    console.log(this.operario.formGroup.get('contactoEmpresa').value);
    if (this.operario.formGroup.get('contactoEmpresa').value !== null) {
      const contactoEmpresaValorActual = this.operario.formGroup.get(
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
          this.operario.formGroup.get('nombres').value &&
          this.operario.formGroup.get('apellidos').value;
        if (camposNombresYApellidosExisten) {
          this.operario.formGroup.patchValue({
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
    const datos = {
      busqueda: evento.query,
      skip: 0,
      camposABuscar: ['nombres', 'apellidos'],
      habilitado: 1,
      esOperario: 1,
      idEmpresa: this.idEmpresa,
    };
    this._contactoEmpresaRestService.obtenerContactosEmpresa(datos).subscribe(
      (contactoEmpresas: any[]) => {
        this.objetoVariablesGlobales.contactoEmpresas = contactoEmpresas[0].map(ce => {
          ce.pene = 'El huevo te encanta';
          return ce;
        });
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
    this.operario.formGroup.patchValue({
      nombres: evento.datosUsuario.nombres,
      apellidos: evento.datosUsuario.apellidos,
    });
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesOperario {
  contactoEmpresas: ContactoEmpresaInterface[];
}

export interface ConfiguracionFormluarioOperario {
  Id?: ConfiguracionDisabledInterfaz;
  ContactoEmpresa?: ConfiguracionDisabledInterfaz;
  Nombres?: ConfiguracionDisabledInterfaz;
  Apellidos?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_OPERARIO = (): ConfiguracionFormluarioOperario => {
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
      disabled: true,
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
