import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_MOVIMIENTO = {
  _rutaGestionMovimiento: {
    ruta: 'movimiento-modulo',
    nombre: 'Gestión de Movimientos',
    generarRuta: () => {
      return `movimiento-modulo/gestion-movimientos`;
    },
  },

  _rutaGestionTipoMovimiento: {
    ruta: 'tipo-movimiento-modulo',
    nombre: 'Gestión de Tipos de movimiento',
    generarRuta: (...argumentos) => {
      return `tipo-movimiento-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionMovimiento: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionTipoMovimiento,
      this._rutaGestionMovimiento,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
