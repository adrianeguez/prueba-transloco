import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { RutaGestionDepartamentosEmpresaComponent } from './rutas/ruta-gestion-departamentos-empresa/ruta-gestion-departamentos-empresa.component';

const routes: Routes = [
  {
    path: 'gestion-departamentos-empresa',
    component: RutaGestionDepartamentosEmpresaComponent,
  },
  {
    path: ':idDepartamentoEmpresa/departamento-trabajador-modulo',
    loadChildren: () =>
      import('../departamento-trabajador/departamento-trabajador.module').then(
        mod => mod.DepartamentoTrabajadorModule,
      ),
  },
  {
    path: '',
    redirectTo: 'gestion-departamentos-empresa',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentoEmpresaRoutingModule {}
