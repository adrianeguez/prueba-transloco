import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionOperariosComponent } from './rutas/ruta-gestion-operarios/ruta-gestion-operarios.component';

const routes: Routes = [
  {
    path: 'gestion-operarios',
    component: RutaGestionOperariosComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-operarios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperarioRoutingModule {}
