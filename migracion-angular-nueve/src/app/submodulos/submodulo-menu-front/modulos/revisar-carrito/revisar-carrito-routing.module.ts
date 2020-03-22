import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaPedidosPendientesComponent } from './rutas/ruta-pedidos-pendientes/ruta-pedidos-pendientes.component';

const routes: Routes = [
  {
    path: 'revisar-carrito',
    component: RutaPedidosPendientesComponent,
  },
  {
    path: '',
    redirectTo: 'revisar-carrito',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarCarritoRoutingModule {}
