import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  CONFIGURACION_BODEGA,
  ConfiguracionFormluarioBodega,
} from '../../componentes/formulario-bodega/bodega-formulario.component';
import { BodegaRestService } from '../../../../servicios/rest/bodega-rest.service';
import { BodegaInterface } from '../../../../interfaces/bodega.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ContactoEmpresaInterface } from '../../../../interfaces/contacto-empresa.interface';
import { DatosUsuarioInterface } from '../../../../interfaces/datos-usuario.interface';
@Component({
  selector: 'ml-crear-editar-bodega',
  templateUrl: './crear-editar-bodega.component.html',
  styleUrls: ['./crear-editar-bodega.component.sass'],
})
export class CrearEditarBodegaComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  bodegaCrearEditar: BodegaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionBodega: ConfiguracionFormluarioBodega;

  constructor(
    public dialogo: MatDialogRef<CrearEditarBodegaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { bodega: BodegaInterface; idEdificio; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _bodegaRestService: BodegaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.bodega ? 'Llene' : 'Modifique'
    } los campos necesarios para la bodega.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionBodega = CONFIGURACION_BODEGA();
    this.configuracionBodega.Nombres.disabled = true;
    this.configuracionBodega.Apellidos.disabled = true;
    if (this.data.bodega) {
      const bodegaEditar: BodegaInterface = this.data.bodega;
      const contactoEmpresa: ContactoEmpresaInterface = bodegaEditar.contactoEmpresa as ContactoEmpresaInterface;
      const datosUsuario: DatosUsuarioInterface = contactoEmpresa.datosUsuario as DatosUsuarioInterface;
      this.configuracionBodega.Apellidos.valor = (datosUsuario as DatosUsuarioInterface).apellidos;
      this.configuracionBodega.Nombres.valor = (datosUsuario as DatosUsuarioInterface).nombres;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionBodega,
        bodegaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionBodega,
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

  validarFormulario(bodega) {
    if (bodega) {
      delete bodega.nombres;
      delete bodega.apellidos;
      this.bodegaCrearEditar = bodega;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.bodegaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this.bodegaCrearEditar.esPercha = +this.bodegaCrearEditar.esPercha === 1;
    this._cargandoService.habilitarCargando();
    if (this.data.bodega) {
      this._bodegaRestService
        .updateOne(this.data.bodega.id, this.bodegaCrearEditar)
        .subscribe(
          r => {
            r.esPercha = r.esPercha ? 1 : 0;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.bodegaCrearEditar.habilitado = true;
      this.bodegaCrearEditar.edificio = this.data.idEdificio;
      this._bodegaRestService.create(this.bodegaCrearEditar).subscribe(
        r => {
          r.esPercha = r.esPercha ? 1 : 0;
          r.habilitado = r.habilitado ? 1 : 0;
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoCrear);
          this.dialogo.close(r);
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          console.error(err);
          this._toasterService.pop(toastErrorCrear);
        },
      );
    }
  }
}
