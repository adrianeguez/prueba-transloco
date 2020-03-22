import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionRolesComponent } from './rutas/ruta-gestion-roles/ruta-gestion-roles.component';

const routes: Routes = [
  {
    path: 'gestion-rol',
    component: RutaGestionRolesComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-rol',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolRoutingModule {}
