import {

  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {CargandoService, EstaTipeandoComponent} from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import {
  CONFIGURACION_CONTACTOEMPRESA,
  ConfiguracionFormluarioContactoEmpresa,
} from '../../../componentes/contacto-empresa-formulario/contacto-empresa-formulario.component';
import {ContactoEmpresaRestService} from '../../../../../servicios/rest/contacto-empresa-rest.service';
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../../constantes/mensajes-toaster';
import {ContactoEmpresaInterface} from '../../../../../interfaces/contacto-empresa.interface';
import {DatosUsuarioInterface} from '../../../../../interfaces/datos-usuario.interface';
import {TipoCargoInterface} from '../../../../../interfaces/tipo-cargo.interface';

@Component({
  selector: 'ml-crear-editar-contacto-empresa',
  templateUrl: './crear-editar-contacto-empresa.component.html',
  styleUrls: ['./crear-editar-contacto-empresa.component.sass'],
})
export class CrearEditarContactoEmpresaComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  contactoEmpresaCrearEditar: ContactoEmpresaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionContactoEmpresa: ConfiguracionFormluarioContactoEmpresa;
  datosUsuarioSeleccionado: DatosUsuarioInterface;
  tipoCargoSeleccionado: TipoCargoInterface;

  constructor(
    public dialogo: MatDialogRef<CrearEditarContactoEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { contactoEmpresa: ContactoEmpresaInterface; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _contactoEmpresaRestService: ContactoEmpresaRestService,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.contactoEmpresa ? 'Llene' : 'Modifique'
    } los campos necesarios para el contacto.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionContactoEmpresa = CONFIGURACION_CONTACTOEMPRESA();
    this.configuracionContactoEmpresa.Nombres.disabled = true;
    this.configuracionContactoEmpresa.Apellidos.disabled = true;
    if (this.data.contactoEmpresa) {
      const contactoEmpresaEditar = this.data.contactoEmpresa;
      contactoEmpresaEditar.datosUsuario = contactoEmpresaEditar.datosUsuario as DatosUsuarioInterface;
      this.configuracionContactoEmpresa.Nombres.valor = contactoEmpresaEditar.datosUsuario.nombres;
      this.configuracionContactoEmpresa.Apellidos.valor = contactoEmpresaEditar.datosUsuario.apellidos;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionContactoEmpresa,
        contactoEmpresaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionContactoEmpresa,
        {},
      );
    }
  }

  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }

  establecerFormularioInvalido() {
    this.formularioValido = false;
    this.mostrarEstaTipeando();
  }

  validarFormulario(contactoEmpresa: ContactoEmpresaInterface | boolean) {
    if (contactoEmpresa) {
      contactoEmpresa = contactoEmpresa as ContactoEmpresaInterface;
      delete contactoEmpresa.nombres;
      delete contactoEmpresa.apellidos;
      this.contactoEmpresaCrearEditar = contactoEmpresa;
      this.datosUsuarioSeleccionado = contactoEmpresa.datosUsuario as DatosUsuarioInterface;
      this.tipoCargoSeleccionado = contactoEmpresa.tipoCargo as TipoCargoInterface;
      this.contactoEmpresaCrearEditar.datosUsuario = this.datosUsuarioSeleccionado.id;
      this.contactoEmpresaCrearEditar.tipoCargo = this.tipoCargoSeleccionado.id;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.contactoEmpresaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this.contactoEmpresaCrearEditar.esOperario = +this.contactoEmpresaCrearEditar.esOperario ? 1 : 0;
    this.contactoEmpresaCrearEditar.esAdminPtoEmi = +this.contactoEmpresaCrearEditar.esAdminPtoEmi ? 1 : 0;
    this._cargandoService.habilitarCargando();
    if (this.data.contactoEmpresa) {
      this._contactoEmpresaRestService
        .updateOne(
          this.data.contactoEmpresa.id,
          this.contactoEmpresaCrearEditar,
        )
        .subscribe(
          (contactoEmpresaEditado: ContactoEmpresaInterface) => {
            contactoEmpresaEditado.datosUsuario = this.datosUsuarioSeleccionado;
            contactoEmpresaEditado.tipoCargo = this.tipoCargoSeleccionado;
            this._toasterService.pop(toastExitoEditar);
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(contactoEmpresaEditado);
          },
          error => {
            console.error(
              {
                error,
                mensaje: 'Error al editar el contacto empresa',
                data: {
                  id: this.data.contactoEmpresa.id,
                  contactoEmpresa: this.contactoEmpresaCrearEditar
                }
              },
            );
            this._toasterService.pop(
              generarToasterErrorEditarCampoRepetido('usuario'),
            );
            this._cargandoService.deshabilitarCargando();
          },
        );
    } else {
      this.contactoEmpresaCrearEditar.empresa = this.data.idEmpresa;
      this._contactoEmpresaRestService
        .create(this.contactoEmpresaCrearEditar)
        .subscribe(
          (contactoEmpresaCreado: ContactoEmpresaInterface) => {
            contactoEmpresaCreado.datosUsuario = this.datosUsuarioSeleccionado;
            contactoEmpresaCreado.tipoCargo = this.tipoCargoSeleccionado;
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(contactoEmpresaCreado);
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(
              {
                error,
                mensaje: 'Error al crear el contacto empresa',
                data: {
                  contactoEmpresa: this.contactoEmpresaCrearEditar
                }
              },
            );
            this._toasterService.pop(
              generarToasterErrorCrearCampoRepetido('usuario'),
            );
            this._cargandoService.deshabilitarCargando();
          },
        );
    }
  }
}
