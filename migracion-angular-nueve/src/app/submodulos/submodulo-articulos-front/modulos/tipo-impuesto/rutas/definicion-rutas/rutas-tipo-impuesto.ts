import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_TIPOS_IMPUESTOS = {
  _rutaGestionTipoImpuesto: {
    ruta: 'tipo-impuesto-modulo',
    nombre: 'Gestión de tipos de impuestos',
    generarRuta: () => {
      return 'tipo-impuesto-modulo';
    },
  },
  _rutaMenuArticulo: {
    ruta: 'configuraciones/articulo',
    nombre: 'Menú artículos',
    generarRuta: () => {
      return 'configuraciones/articulo';
    },
  },

  rutaGestionTipoImpuesto: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaMenuArticulo, this._rutaGestionTipoImpuesto];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
