import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_CALIFICACION_PROVEEDOR = {
  _rutaGestionCalificacionProveedor: {
    ruta: 'calificacion-proveedor-modulo',
    nombre: 'Gestión de Calificaciones',
    generarRuta: () => {
      return `calificacion-proveedor-modulo/gestion-calificaciones-proveedor`;
    },
  },

  _rutaGestionEmpresaProveedor: {
    ruta: 'empresa-proveedores-modulo',
    nombre: 'Gestión de Empresas Proveedor',
    generarRuta: (...argumentos) => {
      return `empresa-proveedores-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionCalificacionProveedor: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEmpresaProveedor,
      this._rutaGestionCalificacionProveedor,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
