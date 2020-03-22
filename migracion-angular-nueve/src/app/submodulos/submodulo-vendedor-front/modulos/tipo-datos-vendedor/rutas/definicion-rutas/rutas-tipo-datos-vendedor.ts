import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_TIPO_DATOS_VENDEDOR = {
  _rutaGestionTipoDatosVen: {
    ruta: 'tipo-datos-vendedor-modulo',
    nombre: 'Gestión tipo datos vendedor',
    generarRuta: () => {
      return `tipo-datos-vendedor-modulo`;
    },
  },

  _rutaGestionDatosVendedor: {
    ruta: 'vendedor-modulo',
    nombre: 'Gestión de vendedor',
    generarRuta: (...argumentos) => {
      return `vendedor-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionTipoDatosVen: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDatosVendedor,
      this._rutaGestionTipoDatosVen,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};


