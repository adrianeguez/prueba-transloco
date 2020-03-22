import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { PreciosRestService } from '../../../../servicios/rest/precios-rest.service';
import {
  ConfiguracionFormluarioPrecio,
  CONFIGURACION_PRECIO,
} from '../../componentes/precio-formulario/precio-formulario.component';
import { RutaGestionPreciosComponent } from '../../rutas/ruta-gestion-precios/ruta-gestion-precios.component';
import {
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from './../../../../../../enums/estados';
import { PreciosInterface } from './../../../../interfaces/precios.interface';

@Component({
  selector: 'ml-crear-editar-precio',
  templateUrl: './crear-editar-precio.component.html',
  styleUrls: ['./crear-editar-precio.component.sass'],
})
export class CrearEditarPrecioComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  precioCrearEditar: PreciosInterface;
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionPrecio: ConfiguracionFormluarioPrecio;

  constructor(
    public dialogo: MatDialogRef<RutaGestionPreciosComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      precio: PreciosInterface;
      idArticulo: any;
      esIncentivo: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _preciosRestService: PreciosRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.precio ? 'Llene' : 'Modifique'
    } los campos necesarios para el precio.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionPrecio = CONFIGURACION_PRECIO();
    if (this.data.precio) {
      // tslint:disable-next-line: no-unused-expression
      this.configuracionPrecio.EsPrincipal.hidden = true;
      const precioEditar = this.data.precio;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPrecio,
        precioEditar,
      );
    } else {
      this.data.esIncentivo === 0
        ? (this.configuracionPrecio.ValorIncentivo.hidden = true)
        : null;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPrecio,
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
      this.precioCrearEditar = precio;
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.precioCrearEditar = {};
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    this.precioCrearEditar.esPrincipal = +this.precioCrearEditar.esPrincipal;
    if (this.data.precio) {
      this._preciosRestService
        .updateOne(this.data.precio.id, this.precioCrearEditar)
        .subscribe(
          (respuesta: PreciosInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuesta);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.precioCrearEditar.articulo = this.data.idArticulo;
      this.precioCrearEditar.habilitado = ESTADOS.Activo;
      const precioCrear = {
        idArticulo: this.data.idArticulo,
        precio: this.precioCrearEditar,
      };
      this._preciosRestService
        .busarCrearYActualizarPrecioEsPrincipal(precioCrear)
        .subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(respuesta);
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    }
  }
}
