import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionDatosVendedorComponent } from './rutas/ruta-gestion-datos-vendedor/ruta-gestion-datos-vendedor.component';

const routes: Routes = [
  {
    path: 'gestion-vendedor',
    component: RutaGestionDatosVendedorComponent,
  },
  {
    path: ':idVendedor/periodo-vendedor-modulo',
    loadChildren: () =>
      import('../periodos-por-vendedor/periodos-por-vendedor.module').then(
        mod => mod.PeriodosPorVendedorModule,
      ),
  },
  {
    path: ':idVendedor/visita-modulo',
    loadChildren: () =>
      import('../visita/visita.module').then(mod => mod.VisitaModule),
  },
  {
    path: ':idVendedor/monitoreo-vendedores-modulo',
    loadChildren: () =>
      import('../monitoreo-vendedores/monitoreo-vendedores.module').then(
        mod => mod.MonitoreoVendedoresModule,
      ),
  },
  {
    path: ':idVendedor/tipo-datos-vendedor-modulo',
    loadChildren: () =>
      import('../tipo-datos-vendedor/tipo-datos-vendedor.module').then(mod => mod.TipoDatosVendedorModule),
  },
  {
    path: '',
    redirectTo: 'gestion-vendedor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosVendedorRoutingModule {}
