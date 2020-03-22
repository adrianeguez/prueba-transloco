import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionServicioComponent} from './rutas/ruta-gestion-servicio/ruta-gestion-servicio.component';
import {CrearEditarServicioEstablecimientoComponent} from './modales/modal-articulo-servicio/crear-editar-servicio-establecimiento/crear-editar-servicio-establecimiento.component';
import {RutaEstablecimientosCursoComponent} from './rutas/ruta-establecimientos-curso/ruta-establecimientos-curso.component';

const routes: Routes = [
  {
    path: 'gestion-servicio',
    component: RutaGestionServicioComponent
  },
  {
    path: 'establecimientos-curso',
    component: RutaEstablecimientosCursoComponent
  },
  {
    path: '',
    redirectTo: 'gestion-servicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioEstablecimientoRoutingModule { }
