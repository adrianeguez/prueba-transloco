import { ESTADOS } from './../../../../../../enums/estados';
import {
  toastExitoEditar,
  toastErrorEditar,
  toastExitoCrear,
} from './../../../../../../constantes/mensajes-toaster';
import {
  ConfiguracionFormluarioPrecio,
  CONFIGURACION_PRECIO,
} from '../../componentes/precio-formulario/precio-formulario.component';
import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { PreciosInterface } from '../../../../interfaces/precios.interface';
import { PreciosRestService } from '../../../../servicios/rest/precios-rest.service';

@Component({
  selector: 'ml-crear-editar-precio',
  templateUrl: './crear-editar-precio.component.html',
  styleUrls: ['./crear-editar-precio.component.sass'],
})
export class CrearEditarPrecioComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  precioCrearEditar: PreciosInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionPrecio: ConfiguracionFormluarioPrecio;
  constructor(
    public dialogo: MatDialogRef<CrearEditarPrecioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      precio: PreciosInterface;
      idArticuloEmpresa: any;
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
    this.configuracionPrecio.ValorIncentivo.disabled = true;
    this.configuracionPrecio.ValorIncentivo.hidden = true;
    if (this.data.precio) {
      // tslint:disable-next-line: no-unused-expression
      this.configuracionPrecio.EsPrincipal.hidden = true;
      // tslint:disable-next-line:no-unused-expression
      this.data.esIncentivo === 0
        ? (this.configuracionPrecio.ValorIncentivo.hidden = true)
        : null;
      const precioEditar = this.data.precio;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPrecio,
        precioEditar,
      );
    } else {
      // tslint:disable-next-line: no-unused-expression
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
      this.precioCrearEditar.esPrincipal =
        this.precioCrearEditar.esPrincipal === 0;
      this._preciosRestService
        .updateOne(this.data.precio.id, this.precioCrearEditar)
        .subscribe(
          (respuesta: PreciosInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            respuesta.esPrincipal = respuesta.esPrincipal ? 0 : 1;
            this.dialogo.close(respuesta);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.precioCrearEditar.articuloPorEmpresa = this.data.idArticuloEmpresa;
      this.precioCrearEditar.habilitado = ESTADOS.Activo;
      const precioCrear = {
        idArticuloEmpresa: this.data.idArticuloEmpresa,
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
