import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_TIPO_VENDEDOR = {
  _rutaGestionTipoVendedor: {
    ruta: 'tipo-vendedor-modulo',
    nombre: 'Gestión tipo rol vendedor',
    generarRuta: () => {
      return 'tipo-vendedor-modulo/gestion-tipo-vendedor';
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionTipoVendedor: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionTipoVendedor,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
