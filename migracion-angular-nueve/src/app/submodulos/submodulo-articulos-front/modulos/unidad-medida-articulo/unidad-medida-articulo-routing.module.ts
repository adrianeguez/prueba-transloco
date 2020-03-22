// tslint:disable-next-line: max-line-length
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { RutaGestionUnidadMedidaArticuloComponent } from './rutas/ruta-gestion-unidad-medida-articulo/ruta-gestion-unidad-medida-articulo.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionUnidadMedidaArticuloComponent,
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
export class UnidadMedidaArticuloRoutingModule {}
