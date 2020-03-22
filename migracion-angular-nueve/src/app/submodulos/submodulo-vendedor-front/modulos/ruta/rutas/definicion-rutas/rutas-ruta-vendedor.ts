import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_RUTA = {
  _rutaGestionRuta: {
    ruta: 'ruta-modulo',
    nombre: 'Gestión zonas vendedor',
    generarRuta: () => {
      return 'ruta-modulo';
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionRutas: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaGestionEmpresa, this._rutaGestionRuta];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
