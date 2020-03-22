import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionCajasComponent} from './rutas/ruta-gestion-cajas/ruta-gestion-cajas.component';
import {RutaMiCajaComponent} from './rutas/ruta-mi-caja/ruta-mi-caja.component';
import {RutaGestionVentasComponent} from './rutas/ruta-gestion-ventas/ruta-gestion-ventas.component';
import {RutaVentaComponent} from '../../componentes/ruta-venta/componentes/ruta-venta/ruta-venta.component';

const routes: Routes = [
  {
    path: 'gestion-cajas',
    component: RutaGestionCajasComponent,
  },
  {
    path: 'mi-caja',
    component: RutaMiCajaComponent,
  },
  {
    path: 'mi-caja/gestion-ventas',
    component: RutaGestionVentasComponent,
  },
  {
    path: 'mi-caja/gestion-ventas/registrar-venta/:idVenta',
    component: RutaVentaComponent,
  },
  {
    path: 'caja/:idPuntoEmisionOperario',
    component: RutaMiCajaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-cajas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CajasRoutingModule {
}
