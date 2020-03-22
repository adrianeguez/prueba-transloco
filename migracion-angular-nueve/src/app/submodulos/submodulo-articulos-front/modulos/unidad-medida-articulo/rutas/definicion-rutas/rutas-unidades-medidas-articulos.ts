import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_UNIDAD_MEDIDA_ARTICULO = {
  _rutaGestionUnidadMedidaArticulo: {
    ruta: 'unidad-medida-articulo-modulo',
    nombre: 'Gestíon de artículos por unidad de medida',
    generarRuta: idUnidadMedida => {
      return `${idUnidadMedida}/unidad-medida-articulo-modulo/gestion`;
    },
  },
  _rutaGestionUnidadMedida: {
    ruta: 'unidad-medida-modulo',
    nombre: 'Gestión de unidad de medida',
    generarRuta: () => {
      return `unidad-medida-modulo`;
    },
  },

  _rutaMenuArticulo: {
    ruta: 'configuraciones/articulo',
    nombre: 'Menú artículos',
    generarRuta: () => {
      return 'configuraciones/articulo';
    },
  },

  rutaGestionUnidadMedidaArticulo: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionUnidadMedida,
      this._rutaGestionUnidadMedidaArticulo,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
