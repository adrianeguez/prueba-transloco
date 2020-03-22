export const RUTAS_MODULO_CURSO_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo',
    loadChildren: () =>
      import(
        '../modulo.curso.module'
        ).then(mod => mod.ModuloCursoModule),
  },
  {
    path: 'cliente-modulo/curso-modulo/menu-mis-cursos/:idCurso/modulo-curso-modulo',
    loadChildren: () =>
      import(
        '../modulo.curso.module'
        ).then(mod => mod.ModuloCursoModule),
  },
];
