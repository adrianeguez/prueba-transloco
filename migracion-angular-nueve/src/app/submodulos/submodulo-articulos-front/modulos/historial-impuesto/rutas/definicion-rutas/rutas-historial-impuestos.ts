import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_HISTORIAL_IMPUESTOS = {
  _rutaGestionHistorialImpuesto: {
    ruta: 'historial-impuesto-modulo',
    nombre: 'Historial de impuestos',
    generarRuta: (idGrupo, idSubgrupo, idArticulo) => {
      return `${idArticulo}/historial-impuesto-modulo/gestion`;
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

  rutaGestionHistorialImpuesto: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionGrupo,
      this._rutaGestionSubgrupo,
      this._rutaGestionArticulo,
      this._rutaGestionHistorialImpuesto,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
