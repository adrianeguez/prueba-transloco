import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_ARTICULO_UNIDAD_MEDIDA = {
  _rutaGestionArticuloUnidadMedida: {
    ruta: 'articulo-unidad-medida-modulo',
    nombre: 'Gestíon de unidades de medida por artículo',
    generarRuta: (idGrupo, idSubgrupo, idArticulo) => {
      return `${idArticulo}/articulo-unidad-medida-modulo`;
    },
  },
  _rutaGestionArticulo: {
    ruta: 'articulo-modulo',
    nombre: 'Gestíon de artículos',
    generarRuta: (idGrupo, idSubgrupo, idArticulo) => {
      return `${idSubgrupo}/articulo-modulo`;
    },
  },
  _rutaGestionSubgrupo: {
    ruta: 'subgrupo-modulo',
    nombre: 'Gestíon de subgrupos',
    generarRuta: (idGrupo, idSubgrupo, idArticulo) => {
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

  rutaGestionArticuloUnidadMedida: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionGrupo,
      this._rutaGestionSubgrupo,
      this._rutaGestionArticulo,
      this._rutaGestionArticuloUnidadMedida,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
