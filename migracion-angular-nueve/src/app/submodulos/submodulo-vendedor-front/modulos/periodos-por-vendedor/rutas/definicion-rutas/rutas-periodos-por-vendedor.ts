import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_PERIODOS_POR_VENDEDOR = {
  _rutaGestionPeriodosPorVendedor: {
    ruta: 'periodo-vendedor-modulo',
    nombre: 'Gestión periodos por vendedor',
    generarRuta: () => {
      return `periodo-vendedor-modulo`;
    },
  },

  _rutaGestionDatosVendedor: {
    ruta: 'vendedor-modulo',
    nombre: 'Gestión de vendedor',
    generarRuta: (...argumentos) => {
      return `vendedor-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionPeriodosPorVendedor: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDatosVendedor,
      this._rutaGestionPeriodosPorVendedor,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
