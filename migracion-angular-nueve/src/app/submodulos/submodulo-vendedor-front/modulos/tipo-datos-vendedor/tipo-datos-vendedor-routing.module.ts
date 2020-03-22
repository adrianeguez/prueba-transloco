import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaAsignacionVendedorEmpresaComponent} from '../ruta-cliente/rutas/ruta-asignacion-vendedor-empresa/ruta-asignacion-vendedor-empresa.component';
import {RutaTipoDatosVendedorComponent} from './rutas/ruta-tipo-datos-vendedor/ruta-tipo-datos-vendedor.component';

const routes: Routes = [
  {
    path: 'gestion-tipo-datos-vendedor',
    component: RutaTipoDatosVendedorComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-tipo-datos-vendedor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDatosVendedorRoutingModule { }




