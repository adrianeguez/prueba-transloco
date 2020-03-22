import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisarCarritoRoutingModule } from './revisar-carrito-routing.module';
import { RutaPedidosPendientesComponent } from './rutas/ruta-pedidos-pendientes/ruta-pedidos-pendientes.component';
import { ManLabNgBootstrapModule } from 'man-lab-ng';

@NgModule({
  declarations: [RutaPedidosPendientesComponent],
  imports: [CommonModule, RevisarCarritoRoutingModule, ManLabNgBootstrapModule],
})
export class RevisarCarritoModule {}
