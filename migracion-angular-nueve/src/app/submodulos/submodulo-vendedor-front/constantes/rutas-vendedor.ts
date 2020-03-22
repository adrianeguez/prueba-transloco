export const RUTAS_VENDEDORES = [
  {
    path: 'datos-vendedor-modulo',
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-vendedor-front/modulos/datos-vendedor/datos-vendedor.module'
      ).then(mod => mod.DatosVendedorModule),
  },
  {
    path: 'asignar-vendedores-modulo',
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-vendedor-front/modulos/ruta-cliente/ruta-cliente.module'
      ).then(mod => mod.RutaClienteModule),
  },
  {
    path: 'monitoreo-modulo',
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-vendedor-front/modulos/monitoreo-vendedores/monitoreo-vendedores.module'
      ).then(mod => mod.MonitoreoVendedoresModule),
  },
  {
    path: 'tipo-logro-visita-modulo',
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-vendedor-front/modulos/tipo-logro-visita/tipo-logro-visita.module'
      ).then(mod => mod.TipoLogroVisitaModule),
  },
  {
    path: 'tipo-logro-visita-modulo',
    loadChildren: () =>
      import(
        './../../../submodulos/submodulo-vendedor-front/modulos/tipo-logro-visita/tipo-logro-visita.module'
      ).then(mod => mod.TipoLogroVisitaModule),
  },
];
