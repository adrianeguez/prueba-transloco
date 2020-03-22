import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionEstablecimientosComponent } from './rutas/ruta-gestion-establecimientos/ruta-gestion-establecimientos.component';

const routes: Routes = [
  {
    path: 'gestion-establecimientos',
    component: RutaGestionEstablecimientosComponent,
  },
  {
    path: ':idEstablecimiento/punto-emision-modulo',
    loadChildren: () =>
      import('../punto-emision/punto-emision.module').then(
        mod => mod.PuntoEmisionModule,
      ),
  },
  {
    path: ':idEstablecimiento/administrador-establecimiento-modulo',
    loadChildren: () =>
      import('../administrador-establecimiento/administrador-establecimiento.module').then(
        mod => mod.AdministradorEstablecimientoModule,
      ),
  },
  {
    path: ':idEstablecimiento/revisar-carrito-modulo',
    loadChildren: () =>
      import(
        '../../../submodulo-menu-front/modulos/revisar-carrito/revisar-carrito.module'
        ).then(mod => mod.RevisarCarritoModule),
  },

  {
    path: '',
    redirectTo: 'gestion-establecimientos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablecimientoRoutingModule {}
