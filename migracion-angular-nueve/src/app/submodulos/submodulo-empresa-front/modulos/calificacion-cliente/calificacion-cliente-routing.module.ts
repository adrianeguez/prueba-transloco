import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionCalificacionesClienteComponent } from './rutas/ruta-gestion-calificaciones-cliente/ruta-gestion-calificaciones-cliente.component';

const routes: Routes = [
  {
    path: 'gestion-calificaciones-cliente',
    component: RutaGestionCalificacionesClienteComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-calificaciones-cliente',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalificacionClienteRoutingModule {}
