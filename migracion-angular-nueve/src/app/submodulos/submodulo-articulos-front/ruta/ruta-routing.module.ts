import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaMenuArticuloComponent } from './ruta-menu-articulo/ruta-menu-articulo.component';

const routes: Routes = [
  {
    path: 'menu',
    component: RutaMenuArticuloComponent,
  },
  {
    path: 'grupo-modulo',
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-articulos-front/modulos/grupo/grupo.module'
      ).then(mod => mod.GrupoModule),
  },
  {
    path: 'tipo-impuesto-modulo',
    loadChildren: () =>
      // tslint:disable-next-line: max-line-length
      import(
        './../../../submodulos/submodulo-articulos-front/modulos/tipo-impuesto/tipo-impuesto.module'
      ).then(mod => mod.TipoImpuestoModule),
  },
  {
    path: 'unidad-medida-modulo',
    loadChildren: () =>
      // tslint:disable-next-line: max-line-length
      import(
        './../../../submodulos/submodulo-articulos-front/modulos/unidad-medida/unidad-medida.module'
      ).then(mod => mod.UnidadMedidaModule),
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaRoutingModule {}
