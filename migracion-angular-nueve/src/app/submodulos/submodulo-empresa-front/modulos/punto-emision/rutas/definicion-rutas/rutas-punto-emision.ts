import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_PUNTOS_EMISION = {
  _rutaGestionPuntoEmision: {
    ruta: 'punto-emision-modulo',
    nombre: 'Gestión de Puntos de emisión',
    generarRuta: () => {
      return `punto-emision-modulo/gestion-puntos-emision`;
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

  rutaGestionPuntoEmision: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionEstablecimiento,
      this._rutaGestionPuntoEmision,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
