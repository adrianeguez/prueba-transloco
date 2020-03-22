import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_VISITAS = {
  _rutaGestionVisita: {
    ruta: 'visita-modulo',
    nombre: 'Gestión visita',
    generarRuta: () => {
      return `visita-modulo`;
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

  rutaGestionVisita: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDatosVendedor,
      this._rutaGestionVisita,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
