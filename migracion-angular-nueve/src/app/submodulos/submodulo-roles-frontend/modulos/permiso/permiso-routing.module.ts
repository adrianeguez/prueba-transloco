import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaInicioPermisosComponent } from './rutas/ruta-inicio-permisos/ruta-inicio-permisos.component';
import { RutaGestionNombrePermisoComponent } from './rutas/ruta-gestion-nombre-permiso/ruta-gestion-nombre-permiso.component';
import { RutaGestionPermisoRolComponent } from './rutas/ruta-gestion-permiso-rol/ruta-gestion-permiso-rol.component';
import { RutaGestionRolMenuComponent } from './rutas/ruta-gestion-rol-menu/ruta-gestion-rol-menu.component';
import { RutaGestionUsuarioRolComponent } from './rutas/ruta-gestion-usuario-rol/ruta-gestion-usuario-rol.component';

const routes: Routes = [
  {
    path: 'menu-permiso',
    component: RutaInicioPermisosComponent,
  },
  {
    path: 'gestion-nombre-permiso',
    component: RutaGestionNombrePermisoComponent,
  },
  {
    path: 'gestion-permiso-rol',
    component: RutaGestionPermisoRolComponent,
  },
  {
    path: 'gestion-rol-menu',
    component: RutaGestionRolMenuComponent,
  },
  {
    path: 'gestion-usuario-rol',
    component: RutaGestionUsuarioRolComponent,
  },
  {
    path: '',
    redirectTo: 'menu-permiso',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisoRoutingModule {}
