import {GUARDS_FRONT_COMUN} from '../../submodulo-front-comun/constantes/guards-front-comun';

export const RUTAS_EMPRESA = [
  {
    path: 'empresa-modulo',
    canActivate: GUARDS_FRONT_COMUN,
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-empresa-front/modulos/empresa/empresa.module'
      ).then(mod => mod.EmpresaModule),
  },
  {
    path: 'codigo-pais-modulo',
    canActivate: GUARDS_FRONT_COMUN,
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-empresa-front/modulos/codigo-pais/codigo-pais.module'
      ).then(mod => mod.CodigoPaisModule),
  },
  {
    path: 'tipo-sistema-modulo',
    canActivate: GUARDS_FRONT_COMUN,
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-empresa-front/modulos/tipo-sistema/tipo-sistema.module'
      ).then(mod => mod.TipoSistemaModule),
  },
];
