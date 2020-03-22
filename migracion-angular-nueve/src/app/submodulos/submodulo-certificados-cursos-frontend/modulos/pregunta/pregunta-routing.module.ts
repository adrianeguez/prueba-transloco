import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionPreguntaComponent} from './rutas/ruta-gestion-pregunta/ruta-gestion-pregunta.component';
import {RutaAsignacionPreguntaComponent} from './rutas/ruta-asignacion-pregunta/ruta-asignacion-pregunta.component';

const routes: Routes = [
  {
    path: 'gestion-pregunta',
    component: RutaGestionPreguntaComponent,
  },
  {
    path: 'asignacion-pregunta',
    component: RutaAsignacionPreguntaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-pregunta',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntaRoutingModule { }
