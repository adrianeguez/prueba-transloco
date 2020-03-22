import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_ESCALA_VENDEDOR_POR_PERIODO = {
  _rutaGestionEscalaVendedorPorPeriodo: {
    ruta: 'escala-vendedor-periodo-modulo',
    nombre: 'Gestión escalas vendedor por periodo',
    generarRuta: () => {
      return `escala-vendedor-periodo-modulo`;
    },
  },

  _rutaGestionPeriodosPorVendedor: {
    ruta: 'periodo-vendedor-modulo',
    nombre: 'Gestión periodos por vendedor',
    generarRuta: (...argumentos) => {
      return `periodo-vendedor-modulo/${argumentos[2]}`;
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

  rutaGestionEscalaVendedorPorPeriodo: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDatosVendedor,
      this._rutaGestionPeriodosPorVendedor,
      this._rutaGestionEscalaVendedorPorPeriodo,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
