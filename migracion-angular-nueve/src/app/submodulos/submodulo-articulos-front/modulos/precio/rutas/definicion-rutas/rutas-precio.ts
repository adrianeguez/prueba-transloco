import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_PRECIO = {
  _rutaGestionPrecio: {
    ruta: 'precio-modulo',
    nombre: 'Gestíon de precios',
    generarRuta: (idGrupo, idSubgrupo, idArticulo) => {
      return `${idArticulo}/precio-modulo/gestion`;
    },
  },

  _rutaGestionArticulo: {
    ruta: 'articulo-modulo',
    nombre: 'Gestíon de artículos',
    generarRuta: (idGrupo, idSubgrupo) => {
      return `${idSubgrupo}/articulo-modulo`;
    },
  },

  _rutaGestionSubgrupo: {
    ruta: 'subgrupo-modulo',
    nombre: 'Gestíon de subgrupos',
    generarRuta: idGrupo => {
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

  rutaGestionPrecio: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionGrupo,
      this._rutaGestionSubgrupo,
      this._rutaGestionArticulo,
      this._rutaGestionPrecio,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
