import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionPisosComponent } from './rutas/ruta-gestion-pisos/ruta-gestion-pisos.component';

const routes: Routes = [
  {
    path: 'gestion-pisos',
    component: RutaGestionPisosComponent,
  },
  {
    path: ':idPiso/area-piso-modulo',
    loadChildren: () =>
      import('../area-piso/area-piso.module').then(mod => mod.AreaPisoModule),
  },
  {
    path: '',
    redirectTo: 'gestion-pisos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PisoRoutingModule {}
