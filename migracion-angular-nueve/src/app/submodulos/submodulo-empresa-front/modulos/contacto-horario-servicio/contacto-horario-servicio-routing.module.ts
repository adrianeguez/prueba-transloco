import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionContactoHorarioServicioComponent} from './rutas/ruta-gestion-contacto-horario-servicio/ruta-gestion-contacto-horario-servicio.component';

const routes: Routes = [
  {
    path: 'gestion-contacto-horario',
    component: RutaGestionContactoHorarioServicioComponent
  },
  {
    path: '',
    redirectTo: 'gestion-contacto-horario',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoHorarioServicioRoutingModule { }
