import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionTipoSistemaComponent} from './rutas/ruta-gestion-tipo-sistema/ruta-gestion-tipo-sistema.component';

const routes: Routes = [
  {
    path: 'gestion-tipo-sistema',
    component: RutaGestionTipoSistemaComponent
  },
  {
    path: '',
    redirectTo: 'gestion-tipo-sistema',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoSistemaRoutingModule { }
