import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionSubgruposComponent } from './rutas/ruta-gestion-subgrupos/ruta-gestion-subgrupos.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionSubgruposComponent,
  },
  {
    path: ':idSubgrupo/articulo-modulo',
    loadChildren: () =>
      import('../articulo/articulo.module').then(mod => mod.ArticuloModule),
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
export class SubgrupoRoutingModule {}
