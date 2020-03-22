import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_TIPOS_LOGROS_VISITA = {
  _rutaGestionTipoLogroVisita: {
    ruta: 'tipo-logro-visita-modulo',
    nombre: 'Gestión tipo logro visita',
    generarRuta: () => {
      return 'tipo-logro-visita-modulo';
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionTipoLogroVisita: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionTipoLogroVisita,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
