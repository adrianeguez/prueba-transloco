import {Routes} from '@angular/router';

export const RUTAS_TEMA_LAZY: Routes = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo/:idModuloCurso/tema-modulo',
    loadChildren: () =>
      import(
        '../tema.module'
        ).then(mod => mod.TemaModule),
  },
  {
    path: 'cliente-modulo/curso-modulo/menu-mis-cursos/:idCursoUsuario/modulo-curso-modulo/:idModuloCursoUsuario/:idModuloCurso/tema-modulo',
    loadChildren: () =>
      import(
        '../tema.module'
        ).then(mod => mod.TemaModule),
  },
];
