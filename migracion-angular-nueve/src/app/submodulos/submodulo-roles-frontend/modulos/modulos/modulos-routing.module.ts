import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionModulosSistemaComponent} from './rutas/ruta-gestion-modulos-sistema/ruta-gestion-modulos-sistema.component';

const routes: Routes = [
  {
    path: 'gestion-modulos-sistema',
    component: RutaGestionModulosSistemaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
