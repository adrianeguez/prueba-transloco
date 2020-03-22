import {Component, Inject, OnInit} from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {TipoDatosVenRestService} from '../../../../../submodulo-vendedor-front/servicios/rest/tipo-datos-ven-rest.service';
import {CargandoService} from 'man-lab-ng';
import {generarToasterErrorConMensaje} from '../../../../../submodulo-vendedor-front/constantes/mensajes-toast';
import {RutasArticuloBodegaComponent} from '../../rutas/rutas-articulo-bodega/rutas-articulo-bodega.component';
import {ArticuloBodegaRestService} from '../../../../servicios/rest/articulo-bodega-rest.service';
import { ArticuloPorEmpresaRestService } from '../../../../servicios/rest/articulo-empresa.service';
import {
  CONFIGURACION_INGRESARDESCUENTOFACTURA,
  ConfiguracionFormluarioIngresarDescuentoFactura
} from '../../../../../submodulo-pedido-front/componentes/formularios/ingresar-descuento-factura/ingresar-descuento-factura-formulario.component';
import {IngresarDescuentoFactura} from '../../../../../submodulo-pedido-front/componentes/formularios/ingresar-descuento-factura/ingresar-descuento-factura';
import {
  CONFIGURACION_ARTICULOBODEGA,
  ConfiguracionFormluarioArticuloBodega
} from '../../../../componentes/formularios/formulario-articulo-bodega/articulo-bodega-formulario.component';
import {ArticuloBodega} from '../../../../componentes/formularios/formulario-articulo-bodega/articulo-bodega';
import {ClaseFormularioContenedor} from '../../../../../submodulo-pedido-front/componentes/modales/modal-descuentos/modal-descuentos/clase-formulario-contenedor';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import {ArticuloBodegaInterface} from '../../../../interfaces/articulo-bodega.interface';
import {ESTADOS} from '../../../../../../enums/estados';
import {generarToasterErrorCrearCampoRepetido, toastExitoCrear} from '../../../../../../constantes/mensajes-toaster';
import {ArticuloEmpresaInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo-empresa.interface';
import {ArticuloInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import * as moment from 'moment';
import {formatearFecha} from '../../../../../submodulo-cargas-masivas-front/funciones/formatear-fecha';
@Component({
  selector: 'app-anadir-articulo-bodega',
  templateUrl: './anadir-articulo-bodega.component.html',
  styleUrls: ['./anadir-articulo-bodega.component.scss']
})
export class AnadirArticuloBodegaComponent extends ClaseFormularioContenedor implements OnInit {
  configuracionArticuloBodega: ConfiguracionFormluarioArticuloBodega;
  articuloBodega = new ArticuloBodega();
  crearArticulobodega: ArticuloBodegaInterface = {};
  constructor(
    public dialogo: MatDialogRef<AnadirArticuloBodegaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idEmpresa: number | string,
    idEdificio: number | string,
    bodega: number | string},
    private readonly _toasterService: ToasterService,
    private readonly _articuloBodegaService: ArticuloBodegaRestService,
    private readonly _cargandoService: CargandoService,
  ) {
    super();
  }
  ngOnInit() {
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionArticuloBodega = CONFIGURACION_ARTICULOBODEGA();
    establecerValoresConfiguracionAbstractControl(
      this.configuracionArticuloBodega,
      {}
    );
  }

  establecerObjetoArticuloBodega(articuloBodega: ArticuloBodega) {
    if (articuloBodega) {
      this.formularioValido = true;
      this.articuloBodega = articuloBodega;
      this.ocultarEstaTipeando();
    } else {
      this.ocultarEstaTipeando();
    }
  }

  agregarArticuloBodega() {
    this._cargandoService.habilitarCargando();
    this._articuloBodegaService.obtenerPeriodo(this.data).subscribe(
    (respuesta) => {
      const periodoVenta = respuesta[0];
      if (periodoVenta[0]) {
        if (+this.articuloBodega.minimoAlerta > +this.articuloBodega.minimo) {
          this.crearArticulobodega = {
            // tslint:disable-next-line:max-line-length
            codigoArticulo: ((this.articuloBodega.articuloEmpresa as ArticuloEmpresaInterface).articulo as ArticuloInterface).codigo.toString(),
            inventarioInicialDinero: +this.articuloBodega.inventarioInicialDinero,
            inventarioInicialCantidad: +this.articuloBodega.inventarioInicialCantidad,
            inventarioFinalCantidad: +this.articuloBodega.inventarioInicialCantidad,
            inventarioFinalDinero: +this.articuloBodega.inventarioInicialDinero,
            inventarioInicialCostoUnitario: (+this.articuloBodega.inventarioInicialDinero / +this.articuloBodega.inventarioInicialCantidad),
            inventarioFinalCostoUnitario: (+this.articuloBodega.inventarioInicialDinero / +this.articuloBodega.inventarioInicialCantidad),
            ingresosCantidad: 0,
            ingresosDinero: 0,
            comprasCantidad: 0,
            comprasDinero: 0,
            devolucionComprasCantidad: 0,
            devolucionComprasDinero: 0,
            ventasCantidad: 0,
            ventasDinero: 0,
            devolucionVentasCantidad: 0,
            devolucionVentasDinero: 0,
            ingresosTransferenciaCantidad: 0,
            ingresosTransferenciaDinero: 0,
            egresosCantidad: 0,
            egresosDinero: 0,
            egresosTransferenciaCantidad: 0,
            egresosTransferenciaDinero: 0,
            empresaProductora: '',
            inventarioInicialCorteAnio: periodoVenta[0].fechaFin.split('-', 1)[0],
            inventarioInicialCorteMes: periodoVenta[0].fechaFin.split('-', 2)[1],
            costoVentas: +0,
            costoGeneralVentas: +0,
            disponibleIncentivo: true,
            habilitado: true,
            cantidadPedida: +0,
            minimo: +this.articuloBodega.minimo,
            maximo: +this.articuloBodega.maximo,
            minimoAlerta: +this.articuloBodega.minimoAlerta,
            ultimaCompraCantidad: 0,
            ultimaCompraCosto: 0,
            ultimaCompraCostoDescuento: 0,
            ultimaVentaCantidad: 0,
            ultimaVentaPrecio: 0,
            ultimaTransferenciaCosto: 0,
            periodoFechaFin: periodoVenta[0].fechaFin,
            periodoFechaInicio: periodoVenta[0].fechaInicio,
            ultimaCompraFecha: '2000-01-01',
            ultimaVentaFecha: '2000-01-01',
            idEdificio: +this.data.idEdificio,
            idEmpresa: +this.data.idEmpresa,
            idPeriodo: periodoVenta[0].id,
            bodega: +this.data.bodega
          };
          this._articuloBodegaService
            .create(JSON.parse(JSON.stringify(this.crearArticulobodega)))
            .subscribe(
              r => {
                r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
                this._cargandoService.deshabilitarCargando();
                this._toasterService.pop(toastExitoCrear);
                this.dialogo.close(r);
              },
              err => {
                this._cargandoService.deshabilitarCargando();
                console.error(err);
                this._toasterService.pop(
                  generarToasterErrorCrearCampoRepetido('articulo en bodega'),
                );
              }
            );
        } else {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            'error',
            'Fallo',
            'Stock Mínimo Alerta debe ser mayor que el Stock  Mínimo');
        }
        } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(
          'error',
          'Fallo',
          'No Existe  periodo venta');
        }
    },
        err => {
        this._cargandoService.deshabilitarCargando();
        console.error(err);
        this._toasterService.pop(
          'error',
          'Fallo',
          'No Existe  periodo venta');
      });
  }
}
