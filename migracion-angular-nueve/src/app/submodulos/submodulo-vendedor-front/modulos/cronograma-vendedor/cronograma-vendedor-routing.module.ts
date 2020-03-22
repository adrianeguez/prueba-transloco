import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionCronogramaVendedorComponent } from './rutas/ruta-gestion-cronograma-vendedor/ruta-gestion-cronograma-vendedor.component';
import { RutaGestionCronogramaDetalleComponent } from './rutas/ruta-gestion-cronograma-detalle/ruta-gestion-cronograma-detalle.component';

const routes: Routes = [
  {
    path: 'gestion-cronogramas',
    component: RutaGestionCronogramaVendedorComponent,
  },
  {
    path: 'gestion/:idCronogramaCabecera/detalle/:idRuta',
    component: RutaGestionCronogramaDetalleComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-cronogramas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CronogramaVendedorRoutingModule {}
