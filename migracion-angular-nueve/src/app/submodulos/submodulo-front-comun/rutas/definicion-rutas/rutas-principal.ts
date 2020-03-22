import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_PRINCIPAL = {
  _rutaMenuPrincipal: {
    ruta: 'inicio',
    nombre: 'Menú principal',
    generarRuta: () => {
      return 'inicio';
    },
  },
  rutaMenuPrincipal: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaMenuPrincipal];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
