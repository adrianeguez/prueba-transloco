import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionOpcionComponent} from './rutas/ruta-gestion-opcion/ruta-gestion-opcion.component';

const routes: Routes = [
  {
    path: 'gestion-opcion',
    component: RutaGestionOpcionComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-opcion',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpcionRoutingModule { }
