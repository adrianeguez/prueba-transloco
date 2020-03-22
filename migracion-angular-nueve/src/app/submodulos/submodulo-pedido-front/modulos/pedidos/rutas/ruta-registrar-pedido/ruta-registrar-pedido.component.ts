import { Component, OnInit } from '@angular/core';
import { MigaDePanInterface, RutaConMigasDePan } from '@manticore-labs/ng-api';
import { EmitirMigaPanService } from 'man-lab-ng';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_PEDIDOS } from '../definicion-rutas/rutas-pedidos';
import { StockArticuloService } from '../../../../componentes/stock-articulo/servicios/stock-articulo.service';

@Component({
  selector: 'mlab-ruta-registrar-pedido',
  templateUrl: './ruta-registrar-pedido.component.html',
  styleUrls: ['./ruta-registrar-pedido.component.scss'],
})
export class RutaRegistrarPedidoComponent extends RutaConMigasDePan
  implements OnInit {
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private readonly _stockArticuloService: StockArticuloService,
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_PEDIDOS.rutaRegistrarPedido(false, true),
    ];
    this.establecerMigas(rutas);

    this._stockArticuloService.iniciar();
  }
}
