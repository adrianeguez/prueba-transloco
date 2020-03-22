import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_SUBGRUPO = {
  _rutaGestionSubgrupo: {
    ruta: 'subgrupo-modulo',
    nombre: 'Gestíon de subgrupos',
    generarRuta: idGrupo => {
      return `${idGrupo}/subgrupo-modulo/gestion`;
    },
  },

  _rutaGestionGrupo: {
    ruta: 'grupo-modulo',
    nombre: 'Gestión de grupos',
    generarRuta: () => {
      return `grupo-modulo`;
    },
  },

  _rutaMenuArticulo: {
    ruta: 'configuraciones/articulo',
    nombre: 'Menú artículos',
    generarRuta: () => {
      return 'configuraciones/articulo';
    },
  },

  rutaGestionSubgrupo: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionGrupo,
      this._rutaGestionSubgrupo,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
