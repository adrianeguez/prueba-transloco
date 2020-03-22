import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionContenidoComponent} from './rutas/ruta-gestion-contenido/ruta-gestion-contenido.component';

const routes: Routes = [
  {
    path: 'gestion-contenidos',
    component: RutaGestionContenidoComponent
  },
  {
    path: '',
    redirectTo: 'gestion-contenidos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoRoutingModule { }
