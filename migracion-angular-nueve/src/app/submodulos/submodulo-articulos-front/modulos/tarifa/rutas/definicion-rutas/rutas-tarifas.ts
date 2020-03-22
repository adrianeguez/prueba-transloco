import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_TARIFA = {
  _rutaGestionTarifa: {
    ruta: 'tarifa-modulo',
    nombre: 'Gestíon de tarifas',
    generarRuta: idTipoImpuesto => {
      return `${idTipoImpuesto}/tarifa-modulo`;
    },
  },

  _rutaGestionTipoImpuesto: {
    ruta: 'tipo-impuesto-modulo',
    nombre: 'Gestión de tipos de impuestos',
    generarRuta: () => {
      return `tipo-impuesto-modulo`;
    },
  },

  _rutaMenuArticulo: {
    ruta: 'configuraciones/articulo',
    nombre: 'Menú artículos',
    generarRuta: () => {
      return 'configuraciones/articulo';
    },
  },

  rutaGestionTarifa: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaMenuArticulo,
      this._rutaGestionTipoImpuesto,
      this._rutaGestionTarifa,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
