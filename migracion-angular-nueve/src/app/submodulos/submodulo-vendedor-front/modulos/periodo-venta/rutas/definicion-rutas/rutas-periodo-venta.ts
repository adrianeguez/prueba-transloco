import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_PERIODO_VENTA = {
  _rutaGestionPeriodoVenta: {
    ruta: 'periodo-venta-modulo',
    nombre: 'Gestión periodo venta',
    generarRuta: () => {
      return 'periodo-venta-modulo/gestion-periodo-venta';
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionPeriodoVenta: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionPeriodoVenta,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
