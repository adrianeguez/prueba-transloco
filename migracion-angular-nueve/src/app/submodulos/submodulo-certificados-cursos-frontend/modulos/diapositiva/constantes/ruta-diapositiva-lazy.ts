import {Routes} from '@angular/router';

export const RUTAS_DIAPOSITIVA_LAZY: Routes = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo/:idModuloCurso/tema-modulo/:idTema/diapositiva-modulo',
    loadChildren: () =>
      import(
        '../diapositiva.module'
        ).then(mod => mod.DiapositivaModule),
  },
  // cliente-modulo/curso-modulo/menu-cursos/:idCurso/modulo-curso-modulo/menu-modulo-curso/:idModuloCurso/tema-modulo
  {
    path: 'cliente-modulo/curso-modulo/menu-mis-cursos/:idCursoUsuario/modulo-curso-modulo/:idModuloCursoUsuario/:idModuloCurso/tema-modulo/:idTema/diapositiva-modulo',
    loadChildren: () =>
      import(
        '../diapositiva.module'
        ).then(mod => mod.DiapositivaModule),
  },
];
