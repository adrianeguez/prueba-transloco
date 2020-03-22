import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionHorarioComponent } from './rutas/ruta-gestion-horario/ruta-gestion-horario.component';

const routes: Routes = [
  {
    path: 'gestion-horario',
    component: RutaGestionHorarioComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-horario',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioRoutingModule {}
