import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionMenuLateralComponent } from './rutas/ruta-gestion-menu-lateral/ruta-gestion-menu-lateral.component';

const routes: Routes = [
  {
    path: 'gestion-menu',
    component: RutaGestionMenuLateralComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuLateralRoutingModule {}
