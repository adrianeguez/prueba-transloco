import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_ESCALA_VENDEDOR = {
  _rutaGestionEscalaVendedor: {
    ruta: 'escala-vendedor-modulo',
    nombre: 'Gestión escalas de vendedor',
    generarRuta: () => {
      return 'escala-vendedor-modulo';
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionEscalaVendedor: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEscalaVendedor,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
