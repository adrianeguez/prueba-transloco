export const RUTAS_MENU = [
  {
    path: 'revisar-carrito-modulo',
    loadChildren: () =>
      import('./../modulos/revisar-carrito/revisar-carrito.module').then(
        modulo => modulo.RevisarCarritoModule,
      ),
  },
  // {
  //   path: 'menu-detalle-modulo',
  //   loadChildren: () =>
  //     import('../modulos/menu-detalle/menu-detalle.module').then(
  //       modulo => modulo.MenuDetalleModule,
  //     ),
  // },
  // {
  //   path: 'seccion-menu-modulo',
  //   loadChildren: () =>
  //     import('../modulos/seccion-menu/seccion-menu.module').then(
  //       alv => alv.SeccionMenuModule,
  //     ),
  // },
  // {
  //   path: 'menu-comida-modulo',
  //     loadChildren: () =>
  //     import(
  //        './../../..//submodulos/submodulo-menu-comida-front/modulos/menu-comida/menu-comida.module'
  //     ).then(modulo => modulo.MenuComidaModule),
  // },
  // {
  //   path: 'seccion-menu-modulo',
  //     loadChildren: () =>
  //     import(
  //        './../../..//submodulos/submodulo-menu-comida-front/modulos/seccion-menu/seccion-menu.module'
  //     ).then(modulo => modulo.SeccionMenuModule),
  // },
  // {
  //   path: 'tipo-menu-modulo',
  //     loadChildren: () =>
  //     import(
  //        './../../..//submodulos/submodulo-menu-comida-front/modulos/tipo-menu/tipo-menu.module'
  //     ).then(modulo => modulo.TipoMenuModule),
  // },
];
