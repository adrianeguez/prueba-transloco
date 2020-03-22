import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionTarifaComponent } from './rutas/ruta-gestion-tarifa/ruta-gestion-tarifa.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionTarifaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifaRoutingModule {}
