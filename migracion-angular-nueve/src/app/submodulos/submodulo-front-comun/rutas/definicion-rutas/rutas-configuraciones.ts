import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_CONFIGURACIONES = {
  _rutaConfiguraciones: {
    ruta: 'configuraciones',
    nombre: 'Configuraciones',
    generarRuta: () => {
      return 'configuraciones';
    },
  },

  rutaConfiguraciones: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaConfiguraciones];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
