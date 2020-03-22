export const RUTAS_PEDIDO_CURSO_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/edificio-modulo/:idEdificio/establecimiento-modulo/:idEstablecimiento/servicio-modulo/:idServicio/pedido-curso-modulo',
    loadChildren: () =>
      import(
        '../pedido.module'
        )
        .then(
          mod => mod.PedidoModule
        )
  },
  {
    path: 'empresa-modulo/:idEmpresa/curso-modulo/:idCurso/servicio-modulo/:idEstablecimiento/horario-modulo/:idHorario/pedido-curso-modulo',
    loadChildren: () =>
      import('../pedido.module')
        .then(mod => mod.PedidoModule)
  },
];
