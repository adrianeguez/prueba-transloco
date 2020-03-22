import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RutasArticuloBodegaComponent} from './rutas/rutas-articulo-bodega/rutas-articulo-bodega.component';


const routes: Routes = [
  {
    path: 'gestion-articulos-bodegas',
    component: RutasArticuloBodegaComponent
  },
  {
    path: '',
    redirectTo: 'gestion-articulos-bodegas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloBodegaRoutingModule {}
