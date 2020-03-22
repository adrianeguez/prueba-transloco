import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionMovimientosComponent } from './rutas/ruta-gestion-movimientos/ruta-gestion-movimientos.component';

const routes: Routes = [
  {
    path: 'gestion-movimientos',
    component: RutaGestionMovimientosComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-movimientos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoRoutingModule {}
