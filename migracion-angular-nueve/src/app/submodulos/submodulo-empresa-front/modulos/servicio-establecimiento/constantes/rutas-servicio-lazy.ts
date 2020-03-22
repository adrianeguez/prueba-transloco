export const RUTAS_SERVICIO_ESTABLECIMIENTO_LAZY = [
  {
    path: 'empresa-modulo/:idEmpresa/edificio-modulo/:idEdificio/establecimiento-modulo/:idEstablecimiento/servicio-modulo',
    loadChildren: () =>
      import(
        '../servicio-establecimiento.module'
        )
        .then(
          mod => mod.ServicioEstablecimientoModule
        )
  },
  {
    path: 'cliente-modulo/curso-modulo/menu-mis-cursos/:idCurso/establecimientos-curso-modulo',
    loadChildren: () =>
      import(
        '../servicio-establecimiento.module'
        ).then(
        mod => mod.ServicioEstablecimientoModule
      )
  }
];
