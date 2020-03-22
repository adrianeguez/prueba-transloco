import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionRutaComponent } from './rutas/ruta-gestion-ruta/ruta-gestion-ruta.component';

const routes: Routes = [
  {
    path: 'gestion-ruta',
    component: RutaGestionRutaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-ruta',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaRoutingModule {}
