export const RUTAS_OPCION_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/modulo-curso-modulo/:idModuloCurso/tema-modulo/:idTema/diapositiva-modulo/:idDiapositiva/pregunta-modulo/:idPregunta/opcion-modulo',
    loadChildren: () =>
      import(
        '../opcion.module'
        ).then(
        mod => mod.OpcionModule,
      )
  }
];
