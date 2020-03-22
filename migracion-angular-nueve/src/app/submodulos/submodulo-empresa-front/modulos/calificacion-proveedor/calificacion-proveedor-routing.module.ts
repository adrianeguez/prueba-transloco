import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionCalificacionesProveedorComponent } from './rutas/ruta-gestion-calificaciones-proveedor/ruta-gestion-calificaciones-proveedor.component';

const routes: Routes = [
  {
    path: 'gestion-calificaciones-proveedor',
    component: RutaGestionCalificacionesProveedorComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-calificaciones-proveedor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalificacionProveedorRoutingModule {}
