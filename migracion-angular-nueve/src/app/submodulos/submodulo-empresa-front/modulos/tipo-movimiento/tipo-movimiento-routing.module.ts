import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionTiposMovimientoComponent } from './rutas/ruta-gestion-tipos-movimiento/ruta-gestion-tipos-movimiento.component';

const routes: Routes = [
  {
    path: 'gestion-tipos-movimiento',
    component: RutaGestionTiposMovimientoComponent,
  },
  {
    path: ':idTipoMovimiento/movimiento-modulo',
    loadChildren: () =>
      import('../movimiento/movimiento.module').then(
        mod => mod.MovimientoModule,
      ),
  },
  {
    path: '',
    redirectTo: 'gestion-tipos-movimiento',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoMovimientoRoutingModule {}
