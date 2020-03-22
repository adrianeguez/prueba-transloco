import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionVisitaComponent } from './rutas/ruta-gestion-visita/ruta-gestion-visita.component';

const routes: Routes = [
  {
    path: 'gestion-visitas',
    component: RutaGestionVisitaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-visitas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaRoutingModule {}
