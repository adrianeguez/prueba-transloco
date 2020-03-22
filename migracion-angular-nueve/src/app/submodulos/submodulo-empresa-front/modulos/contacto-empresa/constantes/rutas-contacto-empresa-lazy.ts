export const RUTAS_CONTACTO_EMPRESA_LAZY = [
  {
    // tslint:disable-next-line:max-line-length
    path: 'empresa-modulo/:idEmpresa/edificio-modulo/:idEdificio/establecimiento-modulo/:idEstablecimiento/servicio-modulo/:idServicio/horario-servicio-modulo/:idHorarioServicio/contacto-empresa-modulo',
    loadChildren: () =>
      import('../contacto-empresa.module')
        .then(
          mod => mod.ContactoEmpresaModule
        )
  },
];
