import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_UNIDADES_MEDIDAS = {
  _rutaGestionUnidadMedida: {
    ruta: 'unidad-medida-modulo',
    nombre: 'Gestión de unidades de medida',
    generarRuta: () => {
      return 'unidad-medida-modulo';
    },
  },

  _rutaMenuArticulo: {
    ruta: 'configuraciones/articulo',
    nombre: 'Menú artículos',
    generarRuta: () => {
      return 'configuraciones/articulo';
    },
  },

  rutaGestionUnidadMedida: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaMenuArticulo, this._rutaGestionUnidadMedida];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
