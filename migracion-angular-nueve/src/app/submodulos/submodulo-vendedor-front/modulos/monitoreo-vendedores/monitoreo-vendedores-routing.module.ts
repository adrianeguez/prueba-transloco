import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaMonitoreoVendedoresComponent } from './rutas/ruta-monitoreo-vendedores/ruta-monitoreo-vendedores.component';

const routes: Routes = [
  {
    path: 'gestion-monitoreo-vendedores',
    component: RutaMonitoreoVendedoresComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-monitoreo-vendedores',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoreoVendedoresRoutingModule {}
