import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionModuloCursoComponent} from './rutas/ruta-gestion-modulo-curso/ruta-gestion-modulo-curso.component';
import {RutaMenuModuloCursoComponent} from './rutas/ruta-menu-modulo-curso/ruta-menu-modulo-curso.component';

const routes: Routes = [
  {
    path: 'gestion-modulo-curso',
    component: RutaGestionModuloCursoComponent
  },
  {
    path: 'menu-modulo-curso',
    component: RutaMenuModuloCursoComponent
  },
  {
    path: '',
    redirectTo: 'gestion-modulo-curso',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloCursoRoutingModule { }
