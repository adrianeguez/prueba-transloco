import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_MENU_ARTICULO = {
  _rutaMenuArticulo: {
    ruta: 'configuraciones/articulo',
    nombre: 'Menú artículos',
    generarRuta: () => {
      return 'configuraciones/articulo/menu';
    },
  },

  rutaMenuArticulo: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaMenuArticulo];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
