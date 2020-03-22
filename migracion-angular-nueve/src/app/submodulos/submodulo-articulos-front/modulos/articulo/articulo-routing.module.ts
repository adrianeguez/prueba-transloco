import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionArticulosComponent } from './rutas/ruta-gestion-articulos/ruta-gestion-articulos.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionArticulosComponent,
  },
  {
    path: ':idArticulo/precio-modulo',
    loadChildren: () =>
      import('../precio/precio.module').then(mod => mod.PrecioModule),
  },
  {
    path: ':idArticulo/detalle-adicional-modulo',
    loadChildren: () =>
      import('../detalle-adicional/detalle-adicional.module').then(
        mod => mod.DetalleAdicionalModule,
      ),
  },
  {
    path: ':idArticulo/historial-impuesto-modulo',
    loadChildren: () =>
      import('../historial-impuesto/historial-impuesto.module').then(
        mod => mod.HistorialImpuestoModule,
      ),
  },
  {
    path: ':idArticulo/articulo-unidad-medida-modulo',
    loadChildren: () =>
      import('../articulo-unidad-medida/articulo-unidad-medida.module').then(
        mod => mod.ArticuloUnidadMedidaModule,
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
export class ArticuloRoutingModule {}
