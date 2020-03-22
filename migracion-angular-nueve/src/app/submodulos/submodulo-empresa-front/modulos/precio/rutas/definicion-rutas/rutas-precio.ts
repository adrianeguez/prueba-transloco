import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_PRECIO = {
  _rutaGestionPrecio: {
    ruta: 'precio-modulo',
    nombre: 'Gestión de precios',
    generarRuta: () => {
      return `precio-modulo/gestion-precios`;
    },
  },

  _rutaGestionArticuloEmpresa: {
    ruta: 'articulo-empresa-modulo',
    nombre: 'Gestión de artículos',
    generarRuta: (...argumentos) => {
      return `articulo-empresa-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionPrecio: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionArticuloEmpresa,
      this._rutaGestionPrecio,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
