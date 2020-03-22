import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {
  TransferenciaCabeceraInterface
} from '../../../../servicios/rest/transferencia-cabecera/interfaces/transferencia-cabecera.interface';
import {BodegaInterface} from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_PEDIDOS} from '../definicion-rutas/rutas-pedidos';
import {TransferenciaCabeceraRestService} from '../../../../servicios/rest/transferencia-cabecera/transferencia-cabecera-rest.service';
import {BodegaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/bodega-rest.service';
import {COLUMNAS_TRANSFERENCIA_DETALLE, COLUMNAS_TRANSFERENCIAS_BODEGA} from '../../../../constantes/columnas-tablas';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';
import {MovimientoDetalleInterface} from '../../../../interfaces/movimientos/movimiento-detalle.interface';
import {TransferenciaDetalleInterface} from '../../../../servicios/rest/transferencia-detalle/interfaces/transferencia-detalle.interface';
import {TransferenciaDetalleRestService} from '../../../../servicios/rest/transferencia-detalle/transferencia-detalle-rest.service';
import {ToasterService} from 'angular2-toaster';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-ruta-detalle-pedido-transferencia',
  templateUrl: './ruta-detalle-pedido-transferencia.component.html',
  styleUrls: ['./ruta-detalle-pedido-transferencia.component.scss']
})
export class RutaDetallePedidoTransferenciaComponent extends RutaConMigasDePan implements OnInit {

  idEmpresa: number;

  idTransferencia: number;

  pedidoTransferencia: TransferenciaCabeceraInterface;

  bodegaDestino: BodegaInterface;

  columnasTransferenciaDetalle = COLUMNAS_TRANSFERENCIA_DETALLE;

  columnasTransferencia = COLUMNAS_TRANSFERENCIAS_BODEGA;

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
    private readonly _transferenciaCabeceraRestService: TransferenciaCabeceraRestService,
    private readonly _bodegaRestService: BodegaRestService,
    private readonly  _transferenciaDetalleRestService: TransferenciaDetalleRestService,
    private readonly _toasterService: ToasterService
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(r => {
      this.idEmpresa = r.idEmpresa;
      this.idTransferencia = r.idPedido;
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
        RUTAS_PEDIDOS.rutaListarPedidos(false, true, [this.idEmpresa]),
        RUTAS_PEDIDOS.rutaDetalleTransferencia(false, true, [this.idTransferencia])
      ];
      this.establecerMigas(rutas);
      this._cargandoService.deshabilitarCargando();
    }, error => {
      console.error(error);
      this._cargandoService.deshabilitarCargando();
    });
    this.mostrarDetallePedido(this.idTransferencia);
  }

  mostrarDetallePedido(idTransferencia: number, creoUnoReciente = false) {
    const consulta = {
      where: {
        id: idTransferencia
      },
      relations: ['transferenciaDetalles', 'bodega']
    };
    this._cargandoService.habilitarCargando();
    this._transferenciaCabeceraRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`)
      .subscribe(
        detalleTransferencia => {
          this.pedidoTransferencia = detalleTransferencia[0][0];
          this.arregloArticulosDetalle = this.pedidoTransferencia.transferenciaDetalles;
          if (this.pedidoTransferencia.estatus === 'CR') {
            this.pedidoGuardado = false;
          } else {
            this.pedidoGuardado = true;
          }
          if (this.arregloArticulosDetalle.length > 0) {
            this.detalleCreado = true;
          } else {
            this.detalleCreado = false;
          }
          this._bodegaRestService
            .findOne(this.pedidoTransferencia.idBodegaDestino)
            .subscribe(
              bodegaDestino => {
                this._cargandoService.deshabilitarCargando();
                this.bodegaDestino = bodegaDestino;
                if (creoUnoReciente) {
                  this.crearDetalle = false;
                  this._toasterService.pop(
                    'success',
                    'Éxito',
                    'Se guardaron los cambios de la transferencia'
                  );
                }
              },
              error => {
                console.error({
                  error,
                  mensaje: 'Error consultando detalle de transferencia',
                });
                this._cargandoService.deshabilitarCargando();
                this._toasterService.pop(toastErrorConexionServidor);
              }
            );
        },
        (error) => {
          console.error({
            error,
            mensaje: 'Error consultando cabecera de transferencia',
          });
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
        });
  }


  crearDetallesAEnviar() {
    return this.arregloArticulosDetalle
      .map(
        (articulo) => {
          return {
            codigo: articulo.codigo,
            cantidad: articulo.cantidad,
            cantidadPromocion: 0,
            transferenciaCabecera: this.pedidoTransferencia.id,
          };
        });
  }

  guardarDetalle(respuestaCabecera: any) {

    const detallesAEnviar = this.crearDetallesAEnviar();
    this._cargandoService.habilitarCargando();
    this._transferenciaDetalleRestService
      .guardarDetalle(<any>detallesAEnviar)
      .subscribe(
        (respuesta) => {
          this._cargandoService.deshabilitarCargando();
          this.mostrarDetallePedido(
            this.idTransferencia,
            true,
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

    //   const detalleMovimiento: MovimientoDetalleInterface = {
    //     codigo: this.articuloAgregado.articuloEmpresa.articulo.codigo,
    //     cantidad: this.articuloAgregado.cantidad,
    //     cantidadPromocion: this.articuloAgregado.cantidadPromocion
    //   };
    //   let crearDetalle$;
    //   if (respuestaCabecera.tipoMovimiento === '10') {
    //     const articulosEnDetalle: TransferenciaDetalleInterface[] = [];
    //     detalleMovimiento.transferenciaCabecera = respuestaCabecera.id;
    //     if (detalleMovimiento.cantidad > 0) {
    //       articulosEnDetalle.unshift(detalleMovimiento);
    //       crearDetalle$ = this._transferenciaDetalleRestService.guardarDetalle(articulosEnDetalle);
    //       this._cargandoService.habilitarCargando();
    //     } else if (detalleMovimiento.cantidad === 0) {
    //       this._toasterService.pop(
    //         'error',
    //         'ERROR',
    //         'El artículo debe tener una cantidad mayor a 0'
    //       );
    //     } else {
    //       this._toasterService.pop(
    //         'error',
    //         'ERROR',
    //         'No se ha ingresado un artículo'
    //       );
    //     }
    //   }
    //
    //   crearDetalle$.subscribe(
    //     (respuesta) => {
    //       this.detalleCreado = true;
    //       this.pedidoGuardado = false;
    //       this._toasterService.pop(
    //         'success',
    //         'EXITO',
    //         'El artículo se ha añadido al detalle correctamente'
    //       );
    //       this.obtenerDetallesTransferenciaPorCabecera(respuestaCabecera.id).subscribe((cabecera) => {
    //         cabecera[0].forEach((detalleEnCabecera) => {
    //           this.arregloArticulosDetalle = detalleEnCabecera.transferenciaDetalles;
    //           console.log('?', this.arregloArticulosDetalle);
    //         });
    //       });
    //       this.crearDetalle = false;
    //       console.log('Arreglo de detalles?', this.arregloArticulosDetalle);
    //       console.log('Respuesta detalle', respuesta);
    //       this._cargandoService.deshabilitarCargando();
    //     },
    //     (error) => {
    //       console.error({
    //         error: error,
    //         mensaje: 'Error creando detalle de movimiento'
    //       });
    //       this._cargandoService.deshabilitarCargando();
    //     });
    // }
    //
    //
  }

  guardarPedido(idPedido: number) {
    this._cargandoService.habilitarCargando();
    this._transferenciaDetalleRestService
      .guardarPedido(idPedido)
      .subscribe(
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
          this._toasterService.pop(toastErrorConexionServidor);
        });
  }

  recibirArticulos(articulo) {
    // this.crearDetalle = true;
    // this.detalleCreado = false;
    return this.articuloAgregado = articulo;
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
  }

  obtenerDetallesTransferenciaPorCabecera(id: number) {
    return this._transferenciaCabeceraRestService
      .findAll(`criterioBusqueda={
        "where": {
          "id": ${id}
        },
        "relations": [
          "transferenciaDetalles"
        ]
      }`);
  }

  verificarArticuloDetalle(arregloDetalle: string[], articulo: PedidoDetalleInterface) {
    return arregloDetalle.some(codigoArticulo => codigoArticulo === articulo.codigo);
  }

}
