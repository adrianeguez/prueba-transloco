import {generarRespuestaRuta} from '@manticore-labs/ng-api';

export const RUTAS_ARTICULOBODEGA = {

  _rutaArticuloBodega: {
    ruta: 'articulo-bodega-modulo',
    nombre: 'Gestión de artículos bodega',
    generarRuta: () => {
      return 'articulo-bodega-modulo/gestion-articulos-bodegas';
    },
  },

  _rutaGestionBodega: {
    ruta: 'bodega-modulo',
    nombre: 'Gestión de Bodegas',
    generarRuta: (...argumentos) => {
      return `bodega-modulo/${argumentos[2]}`;
    },
  },

  _rutaGestionEdificio: {
    ruta: 'edificio-modulo',
    nombre: 'Gestión de Edificios',
    generarRuta: (...argumentos) => {
      return `edificio-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaArticuloBodega: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionBodega,
      this._rutaArticuloBodega
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
