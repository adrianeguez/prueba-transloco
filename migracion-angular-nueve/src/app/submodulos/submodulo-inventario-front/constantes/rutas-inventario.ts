import {GUARDS_FRONT_COMUN} from '../../submodulo-front-comun/constantes/guards-front-comun';

export const RUTAS_INVENTARIO = [
  {
    path: 'inventario',
    canActivate: GUARDS_FRONT_COMUN,
    loadChildren: () =>
      import(
        '../../../submodulos/submodulo-inventario-front/modulos/articulo-bodega/articulo-bodega.module'
        ).then(modulo => modulo.ArticuloBodegaModule)
  }
];
