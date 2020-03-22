import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionPeriodoVentaComponent } from './rutas/ruta-gestion-periodo-venta/ruta-gestion-periodo-venta.component';

const routes: Routes = [
  {
    path: 'gestion-periodo-venta',
    component: RutaGestionPeriodoVentaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-periodo-venta',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodoVentaRoutingModule {}
