import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionAreasTrabajadorComponent } from './rutas/ruta-gestion-areas-trabajador/ruta-gestion-areas-trabajador.component';

const routes: Routes = [
  {
    path: 'gestion-areas-trabajador',
    component: RutaGestionAreasTrabajadorComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-areas-trabajador',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaTrabajadorRoutingModule {}
