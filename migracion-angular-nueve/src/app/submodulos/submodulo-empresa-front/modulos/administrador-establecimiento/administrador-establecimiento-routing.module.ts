import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionAdministradoresEstablecimientoComponent} from './rutas/ruta-gestion-administradores-establecimiento/ruta-gestion-administradores-establecimiento.component';

const routes: Routes = [
  {
    path: 'gestion-administradores-establecimiento',
    component: RutaGestionAdministradoresEstablecimientoComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-administradores-establecimiento',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorEstablecimientoRoutingModule { }
