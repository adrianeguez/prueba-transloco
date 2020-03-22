import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionTipoVendedorComponent } from './rutas/ruta-gestion-tipo-vendedor/ruta-gestion-tipo-vendedor.component';

const routes: Routes = [
  {
    path: 'gestion-tipo-vendedor',
    component: RutaGestionTipoVendedorComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-tipo-vendedor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoVendedorRoutingModule {}
