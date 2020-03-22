import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionAreasPisoComponent } from './rutas/ruta-gestion-areas-piso/ruta-gestion-areas-piso.component';

const routes: Routes = [
  {
    path: 'gestion-areas-piso',
    component: RutaGestionAreasPisoComponent,
  },
  {
    path: ':idAreaPiso/area-trabajador-modulo',
    loadChildren: () =>
      import('../area-trabajador/area-trabajador.module').then(
        mod => mod.AreaTrabajadorModule,
      ),
  },
  {
    path: '',
    redirectTo: 'gestion-areas-piso',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaPisoRoutingModule {}
