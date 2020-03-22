import { Component, OnInit } from '@angular/core';
import { MigaDePanInterface, RutaConMigasDePan } from '@manticore-labs/ng-api';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { RUTAS_REVISAR_CARRITO } from '../definicion-rutas/rutas-revisar-carrito';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_EMPRESA } from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_EDIFICIO } from '../../../../../submodulo-empresa-front/modulos/edificio/rutas/definicion-rutas/rutas-edificio';
import { RUTAS_ESTABLECIMIENTO } from '../../../../../submodulo-empresa-front/modulos/establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import { CabeceraCarritoGatewayService } from '../../../../servicios/gateways/cabecera-carrito.gateway.service';
import { ParametrosRutaPedidosPendientes } from './interfaces/parametros-ruta-pedidos-pendientes';
import { Subscription } from 'rxjs';
import { CabeceraCarritoInterface } from '../../../../interfaces/cabecera-carrito.interface';

@Component({
  selector: 'app-ruta-pedidos-pendientes',
  templateUrl: './ruta-pedidos-pendientes.component.html',
  styleUrls: ['./ruta-pedidos-pendientes.component.scss'],
})
export class RutaPedidosPendientesComponent extends RutaConMigasDePan
  implements OnInit {
  idEmpresa: number;
  idEdificio: number;
  idEstablecimiento: number;
  suscripciones: Subscription[] = [];
  cabecerasCarrito: CabeceraCarritoInterface[] = [];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private _router: Router,
    private _toasterServicePrivate: ToasterService,
    private _cargandoService: CargandoService,
    private _activatedRoute: ActivatedRoute,
    private _cabeceraCarritoGatewayService: CabeceraCarritoGatewayService,
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    this.conexionConWebSockets();
    this._activatedRoute.params.subscribe(
      (parametros: ParametrosRutaPedidosPendientes) => {
        this.establecerParametrosEnRuta(parametros);
        const migasDePan: MigaDePanInterface[] = this.construirMigasDePan(
          parametros,
        );
        this.establecerMigas(migasDePan);
      },
    );
  }

  conexionConWebSockets() {
    if (this._cabeceraCarritoGatewayService.conectado) {
      this.conectarsePedidos();
    } else {
      setTimeout(() => {
        this.conexionConWebSockets();
      }, 500);
    }
  }

  establecerParametrosEnRuta(parametros: ParametrosRutaPedidosPendientes) {
    this.idEmpresa = +parametros.idEmpresa;
    this.idEdificio = +parametros.idEdificio;
    this.idEstablecimiento = +parametros.idEstablecimiento;
  }

  construirMigasDePan(
    parametros: ParametrosRutaPedidosPendientes,
  ): MigaDePanInterface[] {
    return [
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
      RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [parametros.idEmpresa]),
      RUTAS_ESTABLECIMIENTO.rutaGestionEstablecimiento(false, true, [
        parametros.idEmpresa,
        parametros.idEdificio,
      ]),
      RUTAS_REVISAR_CARRITO.rutaPedidosPendientes(false, true, [
        parametros.idEmpresa,
        parametros.idEdificio,
        parametros.idEstablecimiento,
      ]),
    ];
  }

  conectarsePedidos() {
    this.eventoConectadoCarritoService();
    this.eventoCambioEstado();
    this.unirseAEstablecimiento();
  }

  eventoCambioEstado() {
    this.suscripciones.push(
      this._cabeceraCarritoGatewayService.eventoCambioEstado.subscribe(
        (cabeceraCarritoActualizada: CabeceraCarritoInterface) => {
          const indiceCarrito = this.cabecerasCarrito.findIndex(
            cC => cabeceraCarritoActualizada.id === cC.id,
          );
          const existeCarrito = indiceCarrito !== -1;
          if (existeCarrito) {
            this.cabecerasCarrito[indiceCarrito].estado =
              cabeceraCarritoActualizada.estado;
          } else {
            this.cabecerasCarrito.push(cabeceraCarritoActualizada);
          }
        },
      ),
    );
  }

  eventoConectadoCarritoService() {
    this.suscripciones.push(
      this._cabeceraCarritoGatewayService.eventoConectado.subscribe(() => {
        this.unirseAEstablecimiento();
      }),
    );
  }

  async unirseAEstablecimiento() {
    try {
      const cabecerasCarritoRespuesta = await this._cabeceraCarritoGatewayService.unirseARoomPorIdEstablecimiento(
        this.idEstablecimiento,
      );
      this.cabecerasCarrito = cabecerasCarritoRespuesta[0];
    } catch (error) {
      console.error({
        error,
        mensaje: 'Error uniendose a room por Id Establecimiento',
        data: {
          idEstablecimiento: this.idEstablecimiento,
        },
      });
    }
  }
}
