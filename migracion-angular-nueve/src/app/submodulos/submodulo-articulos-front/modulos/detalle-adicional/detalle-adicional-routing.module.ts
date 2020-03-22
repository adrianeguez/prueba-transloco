import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionDetalleAdicionalComponent } from './rutas/ruta-gestion-detalle-adicional/ruta-gestion-detalle-adicional.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionDetalleAdicionalComponent,
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
export class DetalleAdicionalRoutingModule {}
