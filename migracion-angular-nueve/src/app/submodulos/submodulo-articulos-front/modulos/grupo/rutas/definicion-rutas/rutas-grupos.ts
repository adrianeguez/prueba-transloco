import {generarRespuestaRuta} from '@manticore-labs/ng-api';

export const RUTAS_GRUPOS = {
  _rutaGestionGrupo: {
    ruta: 'grupo-modulo',
    nombre: 'Gestión de grupos',
    generarRuta: () => {
      return 'grupo-modulo/gestion';
    },
  },

  _rutaMenuArticulo: {
    ruta: 'configuraciones/articulo',
    nombre: 'Menú artículos',
    generarRuta: () => {
      return 'configuraciones/articulo';
    },
  },

  rutaGestionGrupo: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaMenuArticulo, this._rutaGestionGrupo];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
