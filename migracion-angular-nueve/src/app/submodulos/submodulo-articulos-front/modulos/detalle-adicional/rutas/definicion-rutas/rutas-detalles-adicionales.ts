import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_DETALLE_ADICIONAL = {
  _rutaGestionDetalleAdicional: {
    ruta: 'detalle-adicional-modulo',
    nombre: 'Gestíon de detalles adicionales',
    generarRuta: (idGrupo, idSubgrupo, idArticulo) => {
      return `${idArticulo}/detalle-adicional-modulo/gestion`;
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

  rutaGestionDetalleAdicional: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionGrupo,
      this._rutaGestionSubgrupo,
      this._rutaGestionArticulo,
      this._rutaGestionDetalleAdicional,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
