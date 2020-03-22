import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionTipoImpuestoComponent } from './rutas/ruta-gestion-tipo-impuesto/ruta-gestion-tipo-impuesto.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionTipoImpuestoComponent,
  },
  {
    path: ':idTipoImpuesto/tarifa-modulo',
    loadChildren: () =>
      import('../tarifa/tarifa.module').then(mod => mod.TarifaModule),
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
export class TipoImpuestoRoutingModule {}
