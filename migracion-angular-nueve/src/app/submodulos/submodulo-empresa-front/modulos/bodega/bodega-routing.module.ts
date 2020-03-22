import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionBodegasComponent } from './rutas/ruta-gestion-bodegas/ruta-gestion-bodegas.component';
const routes: Routes = [
  {
    path: 'gestion-bodegas',
    component: RutaGestionBodegasComponent,
  },
  /*{
    path: ':idBodega/articulo-bodega-modulo',
    loadChildren: () =>
      import('../../../submodulo-inventario-front/modulos/articulo-bodega/articulo-bodega.module').then(mod => mod.ArticuloBodegaModule),
  },*/
  {
    path: '',
    redirectTo: 'gestion-bodegas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaRoutingModule {}
