export const RUTAS_DATOS_CONTACTO_LAZY = [
  {
    // tslint:disable-next-line:max-line-length
    path: 'empresa-modulo/:idEmpresa/edificio-modulo/:idEdificio/establecimiento-modulo/:idEstablecimiento/servicio-modulo/:idServicio/horario-servicio-modulo/:idHorarioServicio/contacto-horario-servicio-modulo/:idContactoEmpresa/datos-contacto-modulo',
    loadChildren: () =>
      import('../datos-contacto.module')
        .then(
          mod => mod.DatosContactoModule
        )
  },
];
