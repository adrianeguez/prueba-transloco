import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionEmpresasProveedoresComponent } from './rutas/ruta-gestion-empresas-proveedores/ruta-gestion-empresas-proveedores.component';

const routes: Routes = [
  {
    path: 'gestion-empresas-proveedor',
    component: RutaGestionEmpresasProveedoresComponent,
  },
  {
    path: ':idEmpresaProveedores/calificacion-proveedor-modulo',
    loadChildren: () =>
      import('../calificacion-proveedor/calificacion-proveedor.module').then(
        mod => mod.CalificacionProveedorModule,
      ),
  },
  {
    path: '',
    redirectTo: 'gestion-empresas-proveedor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaProveedoresRoutingModule {}
