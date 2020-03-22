import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionUnidadMedidaComponent } from './rutas/ruta-gestion-unidad-medida/ruta-gestion-unidad-medida.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionUnidadMedidaComponent,
  },
  {
    path: ':idUnidadMedida/unidad-medida-articulo-modulo',
    loadChildren: () =>
      import('../unidad-medida-articulo/unidad-medida-articulo.module').then(
        mod => mod.UnidadMedidaArticuloModule,
      ),
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
export class UnidadMedidaRoutingModule {}
