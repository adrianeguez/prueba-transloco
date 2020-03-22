import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionCursosComponent} from './rutas/ruta-gestion-cursos/ruta-gestion-cursos.component';
import {RutaMenuMisCursosComponent} from './rutas/ruta-menu-mis-cursos/ruta-menu-mis-cursos.component';
import {RutaInicioCursoComponent} from './rutas/ruta-inicio-curso/ruta-inicio-curso.component';
import {RutaSeleccionarCursoComponent} from './rutas/ruta-seleccionar-curso/ruta-seleccionar-curso.component';

const routes: Routes = [
  {
    path: 'gestion-cursos',
    component: RutaGestionCursosComponent
  },
  {
    path: 'inicio-curso/seleccionar-curso',
    component: RutaSeleccionarCursoComponent
  },
  {
    path: 'inicio-curso/menu-mis-cursos',
    component: RutaMenuMisCursosComponent
  },
  {
    path: 'inicio-curso',
    component: RutaInicioCursoComponent
  },
  {
    path: 'seleccionar-curso',
    component: RutaSeleccionarCursoComponent
  },
  {
    path: '',
    redirectTo: 'gestion-cursos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoRoutingModule {
}
