import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_TIPO_MOVIMIENTO = {
  _rutaGestionTipoMovimiento: {
    ruta: 'tipo-movimiento-modulo',
    nombre: 'Gestión de Tipos de Movimiento',
    generarRuta: () => {
      return `tipo-movimiento-modulo/gestion-tipos-movimiento`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionTipoMovimiento: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionTipoMovimiento,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
