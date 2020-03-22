import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaAsignacionVendedorEmpresaComponent } from './rutas/ruta-asignacion-vendedor-empresa/ruta-asignacion-vendedor-empresa.component';

const routes: Routes = [
  {
    path: 'gestion-asignar-vendedores',
    component: RutaAsignacionVendedorEmpresaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-asignar-vendedores',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaClienteRoutingModule {}
