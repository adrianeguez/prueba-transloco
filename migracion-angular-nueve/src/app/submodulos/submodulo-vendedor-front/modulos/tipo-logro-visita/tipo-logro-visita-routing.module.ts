import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionTipoLogroVisitaComponent } from './rutas/ruta-gestion-tipo-logro-visita/ruta-gestion-tipo-logro-visita.component';

const routes: Routes = [
  {
    path: 'gestion-tipo-logro-visita',
    component: RutaGestionTipoLogroVisitaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-tipo-logro-visita',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoLogroVisitaRoutingModule {}
