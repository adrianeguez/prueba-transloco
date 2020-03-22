import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionSubempresasComponent } from './rutas/ruta-gestion-subempresas/ruta-gestion-subempresas.component';

const routes: Routes = [
  {
    path: 'gestion-subempresas',
    component: RutaGestionSubempresasComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-subempresas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubempresaRoutingModule {}
