import {GUARDS_FRONT_COMUN} from '../../submodulo-front-comun/constantes/guards-front-comun';

export const RUTAS_CARGAS_MASIVAS = [
  {
    path: 'configuraciones/cargas-masivas',
    canActivate: GUARDS_FRONT_COMUN,
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-cargas-masivas-front/modulos/cargas-masivas/cargas-masivas.module'
        ).then(mod => mod.CargasMasivasModule),
  },
];
