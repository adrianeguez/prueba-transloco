import { generarRespuestaRuta } from '@manticore-labs/ng-api';
export const RUTAS_MONITOREO = {
  _rutaMonitoreoVendedores: {
    ruta: 'monitoreo-vendedores-modulo',
    nombre: 'Monitoreo de vendedores',
    generarRuta: () => {
      return 'monitoreo-vendedores-modulo/gestion-monitoreo-vendedores';
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

  rutaMonitoreoVendedores: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDatosVendedor,
      this._rutaMonitoreoVendedores,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
