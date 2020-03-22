export const RUTAS_CLIENTE_LAZY = [
  {
    path: 'cliente-modulo',
    loadChildren: () =>
      import(
        '../cliente.module'
        ).then(mod => mod.ClienteModule),
  },
];
