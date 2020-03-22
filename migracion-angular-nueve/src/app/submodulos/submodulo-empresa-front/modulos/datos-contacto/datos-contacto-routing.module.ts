import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionDatosContactoComponent } from './rutas/ruta-gestion-datos-contacto/ruta-gestion-datos-contacto.component';

const routes: Routes = [
  {
    path: 'gestion-datos-contacto',
    component: RutaGestionDatosContactoComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-datos-contacto',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosContactoRoutingModule {}
