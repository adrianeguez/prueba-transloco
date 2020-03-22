import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionEscalaVendedorComponent } from './rutas/ruta-gestion-escala-vendedor/ruta-gestion-escala-vendedor.component';

const routes: Routes = [
  {
    path: 'gestion-escala-vendedor',
    component: RutaGestionEscalaVendedorComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-escala-vendedor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscalaVendedorRoutingModule {}
