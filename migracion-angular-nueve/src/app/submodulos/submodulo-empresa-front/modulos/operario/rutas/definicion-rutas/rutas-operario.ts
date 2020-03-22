import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_OPERARIO = {
  _rutaGestionOperario: {
    ruta: 'operario-modulo',
    nombre: 'Gestión de Operarios',
    generarRuta: () => {
      return `operario-modulo/gestion-operarios`;
    },
  },

  _rutaGestionPuntoEmision: {
    ruta: 'punto-emision-modulo',
    nombre: 'Gestión de Puntos de emisión',
    generarRuta: (...argumentos) => {
      return `punto-emision-modulo/${argumentos[3]}`;
    },
  },

  _rutaGestionEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestión de establecimientos',
    generarRuta: (...argumentos) => {
      return `establecimiento-modulo/${argumentos[2]}`;
    },
  },

  _rutaGestionEdificio: {
    ruta: 'edificio-modulo',
    nombre: 'Gestión de Edificios',
    generarRuta: (...argumentos) => {
      return `edificio-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionOperario: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionEstablecimiento,
      this._rutaGestionPuntoEmision,
      this._rutaGestionOperario,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
