import {generarRespuestaRuta} from '@manticore-labs/ng-api';

export const RUTAS_PEDIDOS = {

  _rutaRecepcionCompras: {
    ruta: 'recepcion-compras',
    nombre: 'Recepción de compras',
    generarRuta: () => {
      return 'recepcion-compras';
    },
  },

  _rutaRegistrarPedido: {
    ruta: 'registrar-pedido',
    nombre: 'Registrar pedido',
    generarRuta: () => {
      return 'registrar-pedido';
    },
  },

  _rutaPedidos: {
    ruta: 'pedidos',
    nombre: 'Pedidos',
    generarRuta: () => {
      return 'pedidos';
    },
  },

  _rutaCrearPedido: {
    ruta: 'crear-pedido',
    nombre: 'Crear pedido',
    generarRuta: () => {
      return 'crear-pedido';
    },
  },

  _rutaCargarDatos: {
    ruta: 'cargar-datos',
    nombre: 'Gestionar datos locales',
    generarRuta: () => {
      return 'cargar-datos';
    },
  },

  _rutaListarPedidos: {
    ruta: 'listar-pedidos',
    nombre: 'Listar pedidos',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}/pedidos-modulo/gestion-listar-pedidos`;
    }
  },

  _rutaDetalleCompra: {
    ruta: 'detalle-pedido-compra',
    nombre: 'Detalle de la compra',
    generarRuta: (...argumentos) => {
      return `detalle-pedido-compra/${argumentos[1]}`;
    }
  },

  _rutaDetalleIngresoEgreso: {
    ruta: 'detalle-pedido-ingreso-egreso',
    nombre: 'Detalle ingreso-egreso',
    generarRuta: (...argumentos) => {
      return `detalle-pedido-ingreso-egreso/${argumentos[1]}`;
    }
  },

  _rutaDetalleTransferencia: {
    ruta: 'detalle-pedido-transferencia',
    nombre: 'Detalle de la transferencia',
    generarRuta: (...argumentos) => {
      return `detalle-pedido-transferencia/${argumentos[1]}`;
    }
  },

  _rutaVentas: {
    ruta: 'venta',
    nombre: 'Venta',
    generarRuta: () => {
      return 'venta';
    },
  },

  rutaRecepcionCompra: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaPedidos,
      this._rutaRecepcionCompras
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutaRegistrarPedido: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaPedidos,
      this._rutaRegistrarPedido
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutaCrearPedido: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaPedidos,
      this._rutaCrearPedido
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaCargarDatos: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaPedidos,
      this._rutaCargarDatos
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutaListarPedidos: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaListarPedidos
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaVentas: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaPedidos,
      this._rutaVentas
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaDetalleCompra: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaListarPedidos,
      this._rutaDetalleCompra
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaDetalleIngresoEgreso: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaListarPedidos,
      this._rutaDetalleIngresoEgreso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaDetalleTransferencia: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaListarPedidos,
      this._rutaDetalleTransferencia
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  }

};
