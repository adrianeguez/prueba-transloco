import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_PEDIDOS} from '../definicion-rutas/rutas-pedidos';
import {IngresoEgresoCabeceraRestService} from '../../../../servicios/rest/ingreso-egreso-cabecera/ingreso-egreso-cabecera-rest.service';
import {
  IngresoEgresoCabeceraInterface
} from '../../../../servicios/rest/ingreso-egreso-cabecera/interfaces/ingreso-egreso-cabecera.interface';
import {COLUMNAS_INGRESO_EGRESO, COLUMNAS_INGRESO_EGRESO_DETALLE} from '../../../../constantes/columnas-tablas';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';
import {MovimientoDetalleInterface} from '../../../../interfaces/movimientos/movimiento-detalle.interface';
import {IngresoEgresoDetalleInterface} from '../../../../servicios/rest/ingreso-egreso-detalle/interfaces/ingreso-egreso-detalle.interface';
import {IngresoEgresoDetalleRestService} from '../../../../servicios/rest/ingreso-egreso-detalle/ingreso-egreso-detalle-rest.service';
import {ToasterService} from 'angular2-toaster';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-ruta-detalle-pedido-ingreso-egreso',
  templateUrl: './ruta-detalle-pedido-ingreso-egreso.component.html',
  styleUrls: ['./ruta-detalle-pedido-ingreso-egreso.component.scss']
})
export class RutaDetallePedidoIngresoEgresoComponent extends RutaConMigasDePan implements OnInit {

  idEmpresa: number;

  idIngresoEgreso: number;

  pedidoIngresoEgreso: IngresoEgresoCabeceraInterface;

  columnasIngresoEgresoDetalle = COLUMNAS_INGRESO_EGRESO_DETALLE;

  columnasIngresoEgreso = COLUMNAS_INGRESO_EGRESO;

  pedidoGuardado: boolean;

  crearDetalle: boolean;

  detalleCreado: boolean;

  articuloAgregado: PedidoDetalleInterface;

  arregloArticulosDetalle: PedidoDetalleInterface[];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _cargandoService: CargandoService,
    protected _toasterService: ToasterService,
    private readonly _ingresoEgresoCabeceraRestService: IngresoEgresoCabeceraRestService,
    private readonly _ingresoEgresoDetalleRestService: IngresoEgresoDetalleRestService,
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute
      .params
      .subscribe(r => {
        this.idEmpresa = r.idEmpresa;
        this.idIngresoEgreso = r.idPedido;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_PEDIDOS.rutaListarPedidos(false, true, [this.idEmpresa]),
          RUTAS_PEDIDOS.rutaDetalleIngresoEgreso(false, true, [this.idIngresoEgreso])
        ];
        this.establecerMigas(rutas);
        this._cargandoService.deshabilitarCargando();
        this.mostrarDetallePedido(this.idIngresoEgreso);
      }, error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      });
  }

  mostrarDetallePedido(idIngresoEgreso: number, creoUnoReciente = false) {
    const consulta = {
      where: {
        id: idIngresoEgreso
      },
      relations: ['ingresoEgresoDetalles', 'bodega']
    };

    this._cargandoService.habilitarCargando();
    this._ingresoEgresoCabeceraRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`)
      .subscribe(
        detalleIngresoEgreso => {
          this._cargandoService.deshabilitarCargando();
          this.pedidoIngresoEgreso = detalleIngresoEgreso[0][0];
          this.arregloArticulosDetalle = this.pedidoIngresoEgreso.ingresoEgresoDetalles;
          if (this.pedidoIngresoEgreso.estatus === 'CR') {
            this.pedidoGuardado = false;
          } else {
            this.pedidoGuardado = true;
          }
          if (this.arregloArticulosDetalle.length > 0) {
            this.detalleCreado = true;
          } else {
            this.detalleCreado = false;
          }
          if (creoUnoReciente) {
            this.crearDetalle = false;
            this._toasterService.pop(
              'info',
              'Éxito',
              'Los artículos se han añadido al detalle correctamente'
            );
          }
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error consultando ingreso egreso cabecera',
          });
          this._toasterService.pop(toastErrorConexionServidor);
        }
      );
  }

  recibirArticulos(articulo) {
    // this.crearDetalle = true;
    // this.detalleCreado = false;
    return this.articuloAgregado = articulo;
  }

  verificarArticuloDetalle(arregloDetalle: string[], articulo: PedidoDetalleInterface) {
    return arregloDetalle.some(codigoArticulo => codigoArticulo === articulo.codigo);
  }

  recibirArregloArticulos(arregloArticulos) {

    const tieneArticulosInvalidos = arregloArticulos.some(a => a.valido === false);
    if (arregloArticulos.length === 0 || tieneArticulosInvalidos) {
      this.crearDetalle = false;
      this.detalleCreado = false;
    } else {
      this.arregloArticulosDetalle = arregloArticulos.filter(a => !a.id);
      if (this.arregloArticulosDetalle.length > 0) {
        this.crearDetalle = true;
        this.detalleCreado = false;
      } else {
        this.crearDetalle = false;
        this.detalleCreado = true;
      }
    }
    //
    // const arregloCodigosDetalle = this.arregloArticulosDetalle.map(codigoArticulo => codigoArticulo.codigo);
    // if (arregloArticulos.length === 0) {
    //   this.crearDetalle = false;
    //   this.detalleCreado = false;
    // } else {
    //   if (this.verificarArticuloDetalle(arregloCodigosDetalle, arregloArticulos.slice(0, 1)[0])) {
    //     this.crearDetalle = false;
    //     this.detalleCreado = true;
    //   } else {
    //     this.crearDetalle = true;
    //     this.detalleCreado = false;
    //   }
    // }
  }

  crearDetallesAEnviar() {
    return this.arregloArticulosDetalle
      .map(
        (articulo) => {
          return {
            codigo: articulo.codigo,
            cantidad: articulo.cantidad,
            cantidadPromocion: 0,
            ingresoEgresoCabecera: this.pedidoIngresoEgreso.id,
          };
        });
  }

  guardarDetalle(respuestaCabecera: any) {

    const detallesAEnviar = this.crearDetallesAEnviar();
    this._cargandoService.habilitarCargando();
    this._ingresoEgresoDetalleRestService
      .guardarDetalle(<any>detallesAEnviar)
      .subscribe(
        (respuesta) => {
          this._cargandoService.deshabilitarCargando();
          this.mostrarDetallePedido(
            this.idIngresoEgreso,
            true
          );
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error: error,
            mensaje: 'Error creando detalle de movimiento'
          });
          this._toasterService.pop(toastErrorConexionServidor);
        });
    // this.crearDetalle = false;
    // const detalleMovimiento: MovimientoDetalleInterface = {
    //   codigo: this.articuloAgregado.articuloEmpresa.articulo.codigo,
    //   cantidad: this.articuloAgregado.cantidad,
    //   cantidadPromocion: this.articuloAgregado.cantidadPromocion
    // };
    // let crearDetalle$;
    // const articulosEnDetalle: IngresoEgresoDetalleInterface[] = [];
    // detalleMovimiento.ingresoEgresoCabecera = respuestaCabecera.id;
    // if (detalleMovimiento.cantidad > 0) {
    //   articulosEnDetalle.unshift(detalleMovimiento);
    //   crearDetalle$ = this._ingresoEgresoDetalleRestService.guardarDetalle(articulosEnDetalle);
    //   this._cargandoService.habilitarCargando();
    // } else if (detalleMovimiento.cantidad === 0) {
    //   this._toasterService.pop(
    //     'error',
    //     'ERROR',
    //     'El artículo debe tener una cantidad mayor a 0'
    //   );
    // } else {
    //   this._toasterService.pop(
    //     'error',
    //     'ERROR',
    //     'No se ha ingresado un artículo'
    //   );
    // }
    // crearDetalle$.subscribe(
    //   (respuesta) => {
    //     this.detalleCreado = true;
    //     this.pedidoGuardado = false;
    //     this._toasterService.pop(
    //       'success',
    //       'EXITO',
    //       'El artículo se ha añadido al detalle correctamente'
    //     );
    //     this.obtenerDetallesIngresEgresoPorCabecera(respuestaCabecera.id).subscribe((cabecera) => {
    //       cabecera[0].forEach((detalleEnCabecera) => {
    //         this.arregloArticulosDetalle = detalleEnCabecera.ingresoEgresoDetalles;
    //         console.log('?', detalleEnCabecera.ingresoEgresoDetalles);
    //       });
    //     });
    //     this.crearDetalle = false;
    //     console.log('respuestaa', respuesta);
    //     this._cargandoService.deshabilitarCargando();
    //   },
    //   (error) => {
    //     console.error({
    //       error: error,
    //       mensaje: 'Error creando detalle de movimiento'
    //     });
    //     this._cargandoService.deshabilitarCargando();
    //   });
  }

  guardarPedido(idPedido: number) {
    let pedido$;
    pedido$ = this._ingresoEgresoDetalleRestService.guardarPedido(idPedido);
    this._cargandoService.habilitarCargando();
    pedido$.subscribe(
      (respuesta) => {
        this.pedidoGuardado = true;
        this._toasterService.pop(
          'success',
          'EXITO',
          'El pedido se ha guardado exitosamente'
        );
        this._cargandoService.deshabilitarCargando();
      }, error => {
        console.error({
          error: error,
          mensaje: 'Error guardando el pedido'
        });
        this._cargandoService.deshabilitarCargando();
      });
  }

  obtenerDetallesIngresEgresoPorCabecera(id: number) {
    return this._ingresoEgresoCabeceraRestService
      .findAll(`criterioBusqueda={
        "where": {
          "id": ${id}
        },
        "relations": [
          "ingresoEgresoDetalles"
        ]
      }`);
  }

}
