import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionPeriodosPorVendedorComponent } from './rutas/ruta-gestion-periodos-por-vendedor/ruta-gestion-periodos-por-vendedor.component';

const routes: Routes = [
  {
    path: 'gestion-periodos-vendedor',
    component: RutaGestionPeriodosPorVendedorComponent,
  },
  {
    path: ':idPeriodo/escala-vendedor-periodo-modulo',
    loadChildren: () =>
      import(
        '../escala-vendedor-por-periodo/escala-vendedor-por-periodo.module'
      ).then(mod => mod.EscalaVendedorPorPeriodoModule),
  },
  {
    path: '',
    redirectTo: 'gestion-periodos-vendedor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodosPorVendedorRoutingModule {}
