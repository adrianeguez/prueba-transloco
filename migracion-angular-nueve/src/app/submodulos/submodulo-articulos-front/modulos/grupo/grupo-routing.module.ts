import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaGestionGruposComponent } from './rutas/ruta-gestion-grupos/ruta-gestion-grupos.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: RutaGestionGruposComponent,
  },
  {
    path: ':idGrupo/subgrupo-modulo',
    loadChildren: () =>
      import('../subgrupo/subgrupo.module').then(mod => mod.SubgrupoModule),
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
export class GrupoRoutingModule {}
