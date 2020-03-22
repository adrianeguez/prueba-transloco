import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_ADMINISTRADOR_ESTABLECIMIENTO = {
  _rutaGestionAdmnistradorEstablecimiento: {
    ruta: 'administrador-establecimiento-modulo',
    nombre: 'Gestión de Adminstradores',
    generarRuta: () => {
      return `administrador-establecimiento-modulo/gestion-administradores-establecimiento`;
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

  rutaGestionAdministadorEstablecimiento: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionEstablecimiento,
      this._rutaGestionAdmnistradorEstablecimiento,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
