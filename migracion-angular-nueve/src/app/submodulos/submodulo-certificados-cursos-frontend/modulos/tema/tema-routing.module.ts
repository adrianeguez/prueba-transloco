import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionTemaComponent} from './rutas/ruta-gestion-tema/ruta-gestion-tema.component';
import {RutaMenuTemaComponent} from './rutas/ruta-menu-tema/ruta-menu-tema.component';

const routes: Routes = [
  {
    path: 'gestion-tema',
    component: RutaGestionTemaComponent
  },
  {
    path: 'menu-tema',
    component: RutaMenuTemaComponent
  },
  {
    path: '',
    redirectTo: 'gestion-tema',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemaRoutingModule { }
