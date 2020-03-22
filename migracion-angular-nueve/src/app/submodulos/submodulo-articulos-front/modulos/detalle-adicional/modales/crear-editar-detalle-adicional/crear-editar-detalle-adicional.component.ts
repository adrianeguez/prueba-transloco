import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { RutaGestionDetalleAdicionalComponent } from '../../rutas/ruta-gestion-detalle-adicional/ruta-gestion-detalle-adicional.component';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { DetalleAdicionalInterface } from './../../../../interfaces/detalle-adicional.interface';
import { DetalleAdicionalRestService } from './../../../../servicios/rest/detalle-adicional-rest.service';
// tslint:disable-next-line: max-line-length
import {
  ConfiguracionFormluarioDetalleAdicional,
  CONFIGURACION_DETALLEADICIONAL,
} from './../../componentes/detalle-adicional-formulario/detalle-adicional-formulario.component';

@Component({
  selector: 'ml-crear-editar-detalle-adicional',
  templateUrl: './crear-editar-detalle-adicional.component.html',
  styleUrls: ['./crear-editar-detalle-adicional.component.sass'],
})
export class CrearEditarDetalleAdicionalComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  detalleAdicionalCrearEditar: DetalleAdicionalInterface;
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionDetalleAdicionalArticulo: ConfiguracionFormluarioDetalleAdicional;

  constructor(
    public dialogo: MatDialogRef<RutaGestionDetalleAdicionalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { detalleAdicional: DetalleAdicionalInterface; idArticulo },
    private readonly _toasterService: ToasterService,
    private readonly _detalleAdicionalRestService: DetalleAdicionalRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.detalleAdicional ? 'Llene' : 'Modifique'
    } los campos necesarios para el detalle adicional.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionDetalleAdicionalArticulo = CONFIGURACION_DETALLEADICIONAL();
    if (this.data.detalleAdicional) {
      const detalleAdicionalEditar = this.data.detalleAdicional;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDetalleAdicionalArticulo,
        detalleAdicionalEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDetalleAdicionalArticulo,
        {},
      );
    }
  }

  ngAfterViewInit() {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  ocultarEstaTipeando() {
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

  validarFormulario(precio) {
    if (precio) {
      this.detalleAdicionalCrearEditar = precio;
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.detalleAdicionalCrearEditar = null;
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.detalleAdicional) {
      this._detalleAdicionalRestService
        .updateOne(
          this.data.detalleAdicional.id,
          this.detalleAdicionalCrearEditar,
        )
        .subscribe(
          (respuesta: DetalleAdicionalInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuesta);
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.detalleAdicionalCrearEditar.articulo = this.data.idArticulo;
      this._detalleAdicionalRestService
        .create(this.detalleAdicionalCrearEditar)
        .subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(respuesta);
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
