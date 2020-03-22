export const RUTAS_PEDIDOS = [
  {
    path: 'pedidos',
    loadChildren: () =>
      import(
        '../modulos/pedidos/pedidos.module'
        ).then(modulo => modulo.PedidosModule)
  },
  {
    path: 'cajas',
    loadChildren: () =>
      import('./../modulos/cajas/cajas.module').then(
        mod => mod.CajasModule,
      ),
  },
];
