import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_CALIFICACION_CLIENTE = {
  _rutaGestionCalificacionCliente: {
    ruta: 'calificacion-cliente-modulo',
    nombre: 'Gestión de Calificaciones',
    generarRuta: () => {
      return `calificacion-cliente-modulo/gestion-calificaciones-cliente`;
    },
  },

  _rutaGestionEmpresaClientes: {
    ruta: 'empresa-clientes-modulo',
    nombre: 'Gestión de Empresas Cliente',
    generarRuta: (...argumentos) => {
      return `empresa-clientes-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionCalificacionCliente: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEmpresaClientes,
      this._rutaGestionCalificacionCliente,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
