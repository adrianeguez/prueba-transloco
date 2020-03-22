import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionTiposCargosComponent } from './rutas/ruta-gestion-tipos-cargos/ruta-gestion-tipos-cargos.component';

const routes: Routes = [
  {
    path: 'gestion-tipos-cargo',
    component: RutaGestionTiposCargosComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-tipos-cargo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoCargoRoutingModule {}
