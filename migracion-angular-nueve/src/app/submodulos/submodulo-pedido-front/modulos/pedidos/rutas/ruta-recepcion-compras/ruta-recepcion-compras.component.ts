import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpresaProveedoresInterface } from '../../../../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';
import { MigaDePanInterface, RutaConMigasDePan } from '@manticore-labs/ng-api';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_PEDIDOS } from '../definicion-rutas/rutas-pedidos';
import { EmitirMigaPanService } from 'man-lab-ng';
import { MatDialog } from '@angular/material/dialog';
import { ModalListaMovimientoComponent } from '../../../../componentes/modales/modal-lista-movimiento/modal-lista-movimiento/modal-lista-movimiento.component';
import { MovimientoInterface } from '../../../../interfaces/movimiento.interface';

@Component({
  selector: 'ml-ruta-recepcion-compras',
  templateUrl: './ruta-recepcion-compras.component.html',
  styleUrls: ['./ruta-recepcion-compras.component.scss'],
})
export class RutaRecepcionComprasComponent extends RutaConMigasDePan
  implements OnInit {
  @Output() eventoMovimientoSeleccionado: EventEmitter<
    MovimientoInterface
  > = new EventEmitter<MovimientoInterface>();

  movimientoSeleccionado: MovimientoInterface;
  proveedorSeleccionado: EmpresaProveedoresInterface;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    public matDialog: MatDialog,
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_PEDIDOS.rutaRecepcionCompra(false, true),
    ];
    this.establecerMigas(rutas);
  }

  abrirModalMovimiento() {
    const dialogRef = this.matDialog.open(ModalListaMovimientoComponent, {
      width: '600px',
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (movimientoSeleccionado: MovimientoInterface) => {
        const ocultarBotonTipoMovimiento = document.getElementById(
          'button-seleccionar-tipo',
        );
        if (movimientoSeleccionado) {
          this.movimientoSeleccionado = movimientoSeleccionado;
          this.eventoMovimientoSeleccionado.emit(this.movimientoSeleccionado);
          ocultarBotonTipoMovimiento.style.display = 'none';
        }
      },
      error => {
        console.log(error);
      },
    );
  }
}
