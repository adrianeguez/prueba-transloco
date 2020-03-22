import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionArticuloProveedorComponent} from './ruta/ruta-gestion-articulo-proveedor/ruta-gestion-articulo-proveedor.component';
const routes: Routes = [
  {
    path: `:idEmpresaProveedor/gestion-articulo-proveedor`,
    component: RutaGestionArticuloProveedorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloProveedorRoutingModule {}
