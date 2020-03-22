import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionArticulosEmpresaComponent } from './rutas/gestion-articulos-empresa/gestion-articulos-empresa.component';

const routes: Routes = [
  {
    path: 'gestion-articulos-empresa',
    component: GestionArticulosEmpresaComponent,
  },
  {
    path: ':idArticuloEmpresa/precio-modulo',
    loadChildren: () =>
      import('../precio/precio.module').then(mod => mod.PrecioModule),
  },
  {
    path: '',
    redirectTo: 'gestion-articulos-empresa',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticuloEmpresaRoutingModule {}
