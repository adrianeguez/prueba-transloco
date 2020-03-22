import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_DATOS_VENDEDOR = {
  _rutaGestionDatosVendedor: {
    ruta: 'vendedor-modulo',
    nombre: 'Gestión de vendedor',
    generarRuta: () => {
      return 'vendedor-modulo';
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionDatosVendedor: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDatosVendedor,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
