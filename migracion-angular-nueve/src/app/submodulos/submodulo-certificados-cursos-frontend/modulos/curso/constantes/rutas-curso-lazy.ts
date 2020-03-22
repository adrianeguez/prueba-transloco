export const RUTAS_CURSO_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo',
    loadChildren: () =>
      import(
        '../curso.module'
        ).then(mod => mod.CursoModule),
  },
  {
    path: 'cliente-modulo/curso-modulo',
    loadChildren: () =>
      import(
        '../curso.module'
        ).then(mod => mod.CursoModule),
  },
  {
    path: 'cliente-modulo/curso-modulo/seleccionar-curso',
    loadChildren: () =>
      import(
        '../curso.module'
        ).then(
          mod => mod.CursoModule
      )
  }
];
