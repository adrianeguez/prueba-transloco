import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionEscalaVendedorPorPeriodoComponent } from './rutas/ruta-gestion-escala-vendedor-por-periodo/ruta-gestion-escala-vendedor-por-periodo.component';

const routes: Routes = [
  {
    path: 'gestion-escalas-vendedor-periodo',
    component: RutaGestionEscalaVendedorPorPeriodoComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-escalas-vendedor-periodo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscalaVendedorPorPeriodoRoutingModule {}
