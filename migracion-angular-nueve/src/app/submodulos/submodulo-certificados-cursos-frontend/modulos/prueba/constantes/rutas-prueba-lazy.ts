export const RUTAS_PRUEBA_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo/:idModuloCurso/prueba-modulo',
    loadChildren: () =>
      import(
        '../prueba.module'
        ).then(
        mod => mod.PruebaModule,
      )
  },
  {
    path: 'cliente-modulo/curso-modulo/menu-mis-cursos/:idCursoUsuario/modulo-curso-modulo/:idModuloCursoUsuario/:idModuloCurso/tema-modulo/:idTema/diapositiva-modulo/:idPruebaUsuario/prueba-modulo',
    loadChildren: () =>
      import(
        '../prueba.module'
        ).then(
        mod => mod.PruebaModule,
      )
  },
];
