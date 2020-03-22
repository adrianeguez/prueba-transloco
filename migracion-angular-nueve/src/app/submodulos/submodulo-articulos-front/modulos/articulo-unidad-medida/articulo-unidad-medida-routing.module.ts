import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { RutaGestionArticuloUnidadMedidaComponent } from './rutas/ruta-gestion-articulo-unidad-medida/ruta-gestion-articulo-unidad-medida.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionArticuloUnidadMedidaComponent,
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
export class ArticuloUnidadMedidaRoutingModule {}
