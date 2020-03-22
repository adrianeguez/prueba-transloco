import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_REVISAR_CARRITO = {
  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  _rutaGestionEdificio: {
    ruta: 'edificio-modulo',
    nombre: 'Gestión de Edificios',
    generarRuta: (...argumentos) => {
      return `edificio-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestión de Establecimientos',
    generarRuta: (...argumentos) => {
      return `establecimiento-modulo/gestion-establecimientos/${argumentos[2]}`;
    },
  },

  _rutaPedidosPendientes: {
    ruta: 'revisar-carrito-modulo',
    nombre: 'Pedidos pendientes',
    generarRuta: () => {
      return `revisar-carrito-modulo/pedidos-pendientes`;
    },
  },

  rutaPedidosPendientes: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionEstablecimiento,
      this._rutaPedidosPendientes,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
