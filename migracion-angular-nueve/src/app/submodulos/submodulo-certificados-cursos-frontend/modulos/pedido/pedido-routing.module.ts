import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionPedidoCursoComponent} from './rutas/ruta-gestion-pedido-curso/ruta-gestion-pedido-curso.component';
import {RutaRealizarPedidoComponent} from './rutas/ruta-realizar-pedido/ruta-realizar-pedido.component';

const routes: Routes = [
  {
    path: 'gestion-pedido-curso',
    component: RutaGestionPedidoCursoComponent
  },
  {
    path: 'pedido',
    component: RutaRealizarPedidoComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-pedido-curso',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule {
}
