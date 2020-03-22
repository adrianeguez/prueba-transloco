import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { RutaGestionDepartamentoTrabajadorComponent } from './rutas/ruta-gestion-departamentos-trabajador/ruta-gestion-departamentos-trabajador.component';

const routes: Routes = [
  {
    path: 'gestion-departamentos-trabajador',
    component: RutaGestionDepartamentoTrabajadorComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-departamentos-trabajador',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentoTrabajadorRoutingModule {}
