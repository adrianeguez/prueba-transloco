import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_RUTA_CLIENTE = {
  _rutaAsignacionVendedorEmpresa: {
    ruta: 'asignar-vendedores-modulo',
    nombre: 'Asignacion de vendedores',
    generarRuta: () => {
      return '/asignar-vendedores-modulo';
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaAsignacionVendedorEmpresa: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaAsignacionVendedorEmpresa,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
