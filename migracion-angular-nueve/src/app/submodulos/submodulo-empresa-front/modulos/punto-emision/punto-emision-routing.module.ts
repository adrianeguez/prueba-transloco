import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionPuntosEmisionComponent } from './rutas/ruta-gestion-puntos-emision/ruta-gestion-puntos-emision.component';

const routes: Routes = [
  {
    path: 'gestion-puntos-emision',
    component: RutaGestionPuntosEmisionComponent,
  },
  {
    path: ':idPuntoEmision/operario-modulo',
    loadChildren: () =>
      import('../operario/operario.module').then(mod => mod.OperarioModule),
  },
  {
    path: '',
    redirectTo: 'gestion-puntos-emision',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntoEmisionRoutingModule {}
