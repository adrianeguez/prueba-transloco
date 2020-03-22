import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_CODIGO_PAIS = {
  _rutaGestionCodigoPais: {
    ruta: 'codigo-pais-modulo',
    nombre: 'Gestión de Código ISO 3166',
    generarRuta: () => {
      return 'codigo-pais-modulo/gestion-codigos-pais';
    },
  },

  rutaGestionCodigoPias: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaGestionCodigoPais];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
