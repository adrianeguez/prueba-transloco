import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionHistorialImpuestoComponent } from './rutas/ruta-gestion-historial-impuesto/ruta-gestion-historial-impuesto.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionHistorialImpuestoComponent,
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
export class HistorialImpuestoRoutingModule {}
