import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionHorarioServicioComponent} from './rutas/ruta-gestion-horario-servicio/ruta-gestion-horario-servicio.component';
import {RutaHorarioEstablecimientoCursoComponent} from './rutas/ruta-horario-establecimiento-curso/ruta-horario-establecimiento-curso.component';

const routes: Routes = [
  {
    path: 'gestion-horario-servicio',
    component: RutaGestionHorarioServicioComponent
  },
  {
    path: 'horario-establecimiento-curso',
    component: RutaHorarioEstablecimientoCursoComponent
  },
  {
    path: '',
    redirectTo: 'gestion-horario-servicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioServicioRoutingModule { }
