export const RUTAS_HORARIO_SERVICIO_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/edificio-modulo/:idEdificio/establecimiento-modulo/:idEstablecimiento/servicio-modulo/:idServicio/horario-servicio-modulo',
    loadChildren: () =>
      import('../horario-servicio.module')
        .then(
          mod => mod.HorarioServicioModule
        )
  },
  {
    path: 'cliente-modulo/curso-modulo/menu-mis-cursos/:idCurso/establecimientos-curso-modulo/:idServicioEstablecimiento/horario-modulo',
    loadChildren: () =>
      import(
        '../horario-servicio.module'
        ).then(
        mod => mod.HorarioServicioModule
      )
  },
];
