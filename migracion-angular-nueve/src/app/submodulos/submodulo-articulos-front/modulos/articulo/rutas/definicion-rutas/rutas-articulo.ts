import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_ARTICULO = {
  _rutaGestionArticulo: {
    ruta: 'articulo-modulo',
    nombre: 'Gestíon de artículos',
    generarRuta: (idGrupo, idSubgrupo) => {
      return `${idSubgrupo}/articulo-modulo/gestion`;
    },
  },
  _rutaGestionSubgrupo: {
    ruta: 'subgrupo-modulo',
    nombre: 'Gestíon de subgrupos',
    generarRuta: (idGrupo, idSubgrupo) => {
      return `${idGrupo}/subgrupo-modulo`;
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

  rutaGestionArticulo: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionGrupo,
      this._rutaGestionSubgrupo,
      this._rutaGestionArticulo,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
