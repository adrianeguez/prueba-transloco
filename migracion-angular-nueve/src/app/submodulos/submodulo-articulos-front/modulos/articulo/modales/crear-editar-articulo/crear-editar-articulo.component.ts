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
import { ArticulosRestService } from '../../../../servicios/rest/articulos-rest.service';
// tslint:disable-next-line:max-line-length
import {
  ConfiguracionFormluarioArticulo,
  CONFIGURACION_ARTICULO,
} from '../../componentes/articulo-formulario/articulo-formulario.component';
import { RutaGestionArticulosComponent } from '../../rutas/ruta-gestion-articulos/ruta-gestion-articulos.component';
// tslint:disable-next-line: max-line-length
import {
  generarToasterErrorCrearCampoRepetido,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
// tslint:disable-next-line:max-line-length
import { ArticuloInterface } from './../../../../interfaces/articulo.interface';

// tslint:disable-next-line: max-line-length

@Component({
  selector: 'ml-crear-editar-articulo',
  templateUrl: './crear-editar-articulo.component.html',
  styleUrls: ['./crear-editar-articulo.component.sass'],
})
export class CrearEditarArticuloComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValidoArticulo: boolean;
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionArticulo: ConfiguracionFormluarioArticulo;
  articuloCrearEditar: ArticuloInterface; // revisar error

  constructor(
    public dialogo: MatDialogRef<RutaGestionArticulosComponent>,
    // tslint:disable-next-line:max-line-length
    @Inject(MAT_DIALOG_DATA)
    public data: { articulo: ArticuloInterface; idSubgrupo: any },
    private readonly _toasterService: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.articulo ? 'Llene' : 'Modifique'
    } los campos necesarios para`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionArticulo = CONFIGURACION_ARTICULO();
    this.configuracionArticulo.HabilitadoStock.hidden = true;
    if (this.data.articulo) {
      this.configuracionArticulo.HabilitadoStock.hidden = true;
      this.configuracionArticulo.UnidadMedida.valor = 'valor';
      this.configuracionArticulo.TipoImpuesto.valor = 'valor';
      this.configuracionArticulo.Tarifa.valor = 'valor';
      this.configuracionArticulo.UnidadMedida.hidden = true;
      this.configuracionArticulo.TipoImpuesto.hidden = true;
      this.configuracionArticulo.Tarifa.hidden = true;
      this.configuracionArticulo.EsServicio.hidden = true;
      const articuloEditar = this.data.articulo;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionArticulo,
        articuloEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionArticulo,
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

  establecerFormularioArticuloInvalido() {
    this.formularioValidoArticulo = false;
    this.mostrarEstaTipeando();
  }

  validarFormularioArticulo(articulo) {
    if (articulo) {
      this.articuloCrearEditar = articulo;
      this.formularioValidoArticulo = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValidoArticulo = false;
      this.articuloCrearEditar = {};
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.articuloCrearEditar.esCurso !== undefined) {
      this.articuloCrearEditar.esCurso = +this.articuloCrearEditar.esCurso === 1 ? 1 : 0;
    }
    console.log('guarda', this.articuloCrearEditar);
    if (this.data.articulo) {
      delete this.articuloCrearEditar.tipoImpuesto;
      delete this.articuloCrearEditar.unidadMedida;
      delete this.articuloCrearEditar.tarifa;
      delete this.articuloCrearEditar.habilitadoStock;
      delete this.articuloCrearEditar.esServicio;
      this._articulosRestService
        .updateOne(this.data.articulo.id, this.articuloCrearEditar)
        .subscribe(
          (respuesta: ArticuloInterface) => {
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
      this.articuloCrearEditar.subgrupo = +this.data.idSubgrupo;
      this.articuloCrearEditar.habilitadoStock =
        +this.articuloCrearEditar.habilitadoStock === 1;
      this.articuloCrearEditar.esServicio =
        +this.articuloCrearEditar.esServicio === 1;
      this.articuloCrearEditar.habilitado = 1;
      this._articulosRestService
        .guardarArticuloDetallePrecioImpuestoUnidadMedida({
          articulo: this.articuloCrearEditar,
        })
        .subscribe(
          (respuesta: ArticuloInterface) => {
            if (respuesta) {
              respuesta.esServicio = +respuesta.esServicio;
              respuesta.habilitado = +respuesta.habilitado;
              respuesta.habilitadoStock = +respuesta.habilitadoStock;
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoCrear);
              this.dialogo.close(respuesta);
            }
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
            this._toasterService.pop(
              generarToasterErrorCrearCampoRepetido(
                'Código o Código barras o Código auxiliar',
              ),
            );
          },
        );
    }
  }
}
