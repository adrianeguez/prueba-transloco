import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionCodigosPaisComponent } from './rutas/ruta-gestion-codigos-pais/ruta-gestion-codigos-pais.component';

const routes: Routes = [
  {
    path: 'gestion-codigos-pais',
    component: RutaGestionCodigosPaisComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-codigos-pais',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoPaisRoutingModule {}
