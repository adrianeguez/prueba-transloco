import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionPreciosComponent } from './rutas/ruta-gestion-precios/ruta-gestion-precios.component';

const routes: Routes = [
  {
    path: 'gestion-precios',
    component: RutaGestionPreciosComponent,
  },
  {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrecioRoutingModule {}
