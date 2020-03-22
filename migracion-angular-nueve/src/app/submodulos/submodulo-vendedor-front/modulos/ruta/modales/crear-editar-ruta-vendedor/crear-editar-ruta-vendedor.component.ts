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
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { RutaInterface } from '../../../../interfaces/ruta-interface';
import { RutaRestService } from '../../../../servicios/rest/ruta-rest.service';
import {
  ConfiguracionFormluarioRutaVendedor,
  CONFIGURACION_RUTAVENDEDOR,
} from '../../componentes/ruta-formulario/ruta-vendedor-formulario.component';
import { RutaGestionRutaComponent } from '../../rutas/ruta-gestion-ruta/ruta-gestion-ruta.component';
import { BodegaRestService } from '../../../../../submodulo-empresa-front/servicios/rest/bodega-rest.service';
import {generarToasterErrorConMensaje} from '../../../../constantes/mensajes-toast';

@Component({
  selector: 'ml-crear-editar-ruta-vendedor',
  templateUrl: './crear-editar-ruta-vendedor.component.html',
  styleUrls: ['./crear-editar-ruta-vendedor.component.scss'],
})
export class CrearEditarRutaVendedorComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  rutaVendedorCrearEditar: RutaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionRutaVendedor: ConfiguracionFormluarioRutaVendedor;

  constructor(
    public dialogo: MatDialogRef<RutaGestionRutaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { rutaVendedor: RutaInterface; idEmpresa: number | string },
    private readonly _toasterService: ToasterService,
    private readonly _rutaVendedorRestService: RutaRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _bodegaRestService: BodegaRestService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.rutaVendedor ? 'Llene' : 'Modifique'
    } los campos necesarios para la zona.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionRutaVendedor = CONFIGURACION_RUTAVENDEDOR();

    if (this.data.rutaVendedor) {
      const rutaVendedorEditar = this.data.rutaVendedor;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionRutaVendedor,
        rutaVendedorEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionRutaVendedor,
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

  validarFormulario(rutaVendedor) {
    if (rutaVendedor) {
      this.rutaVendedorCrearEditar = rutaVendedor;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.rutaVendedorCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.rutaVendedor) {
      this._rutaVendedorRestService
        .updateOne(this.data.rutaVendedor.id, this.rutaVendedorCrearEditar)
        .subscribe(
          r => {
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
      this.rutaVendedorCrearEditar.empresa = this.data.idEmpresa;
      this.rutaVendedorCrearEditar.bodega = this.rutaVendedorCrearEditar.bodega.id;
      this.rutaVendedorCrearEditar.habilitado = true;
      this._rutaVendedorRestService
        .create(this.rutaVendedorCrearEditar)
        .subscribe(
          r => {
            this._bodegaRestService.findOne(r.bodega).subscribe(
              respuesta => {
                r.habilitado = +r.habilitado;
                this._cargandoService.deshabilitarCargando();
                this._toasterService.pop(toastExitoCrear);
                r.bodega = respuesta;
                this.dialogo.close(r);
              },
              error => {
                console.error(error);
                this._cargandoService.deshabilitarCargando();
              },
            );
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(generarToasterErrorConMensaje('Error, talvez la zona ya se encuentra registrada en ese lugar'));
          },
        );
    }
  }
}
