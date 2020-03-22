export const RUTAS_PREGUNTA_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo/:idModuloCurso/tema-modulo/:idTema/diapositiva-modulo/:idDiapositiva/pregunta-modulo',
    loadChildren: () =>
      import(
        '../pregunta.module'
        ).then(
        mod => mod.PreguntaModule,
      )
  },
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo/:idModuloCurso/prueba-modulo/:idPrueba/pregunta-modulo',
    loadChildren: () =>
      import(
        '../pregunta.module'
        ).then(
        mod => mod.PreguntaModule,
      )
  },
];
