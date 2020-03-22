import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionEmpresasClientesComponent } from './rutas/ruta-gestion-empresas-clientes/ruta-gestion-empresas-clientes.component';
import { RutaGestionEdificiosComponent } from '../edificio/rutas/ruta-gestion-edificios/ruta-gestion-edificios.component';

const routes: Routes = [
  {
    path: 'gestion-empresas-clientes',
    component: RutaGestionEmpresasClientesComponent,
  },
  {
    path:
      'gestion-empresas-clientes/:idEmpresaClientes/gestion-edificios-cliente',
    component: RutaGestionEdificiosComponent,
  },
  {
    path: ':idEmpresaClientes/calificacion-cliente-modulo',
    loadChildren: () =>
      import('../calificacion-cliente/calificacion-cliente.module').then(
        mod => mod.CalificacionClienteModule,
      ),
  },
  {
    path: '',
    redirectTo: 'gestion-empresas-clientes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaClientesRoutingModule {}
