import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionUsuarioComponent } from './rutas/ruta-gestion-usuario/ruta-gestion-usuario.component';

const routes: Routes = [
  {
    path: 'gestion-usuarios',
    component: RutaGestionUsuarioComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-usuarios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
