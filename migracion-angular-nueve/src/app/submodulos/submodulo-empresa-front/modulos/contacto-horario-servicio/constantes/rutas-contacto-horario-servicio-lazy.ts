export const RUTAS_CONTACTO_HORARIO_SERVICIO_LAZY = [
  {
    // tslint:disable-next-line:max-line-length
    path: 'empresa-modulo/:idEmpresa/edificio-modulo/:idEdificio/establecimiento-modulo/:idEstablecimiento/servicio-modulo/:idServicio/horario-servicio-modulo/:idHorarioServicio/contacto-horario-servicio-modulo',
    loadChildren: () =>
      import('../contacto-horario-servicio.module')
        .then(
          mod => mod.ContactoHorarioServicioModule
        )
  },
];
