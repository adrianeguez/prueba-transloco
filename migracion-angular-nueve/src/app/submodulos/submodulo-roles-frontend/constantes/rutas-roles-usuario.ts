import {Routes} from '@angular/router';

export const RUTAS_ROLES_USUARIO: Routes = [
  {
    path: 'permiso-modulo',
    loadChildren: () => import('../modulos/permiso/permiso.module').then(modulo => modulo.PermisoModule)
  },
  {
    path: 'usuario-modulo',
    loadChildren: () => import('../modulos/usuario/usuario.module').then(modulo => modulo.UsuarioModule)
  },
  {
    path: 'rol-modulo',
    loadChildren: () => import('../modulos/rol/rol.module').then(modulo => modulo.RolModule)
  },
  {
    path: 'modulos-sistema-modulo',
    loadChildren: () => import('../modulos/modulos/modulos.module').then(modulo => modulo.ModulosModule),
  }
];
