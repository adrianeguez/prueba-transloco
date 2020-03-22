import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_ARTICULO_EMPRESA = {
  _rutaGestionArticuloEmpresa: {
    ruta: 'articulo-empresa-modulo',
    nombre: 'Gestión de Artículos',
    generarRuta: () => {
      return `articulo-empresa-modulo/gestion-articulos-empresa`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionArticuloEmpresa: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionArticuloEmpresa,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
