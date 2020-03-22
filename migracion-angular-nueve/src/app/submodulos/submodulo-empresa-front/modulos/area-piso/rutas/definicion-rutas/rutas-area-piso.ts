import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_AREA_PISO = {
  _rutaGestionAreaPiso: {
    ruta: 'area-piso-modulo',
    nombre: 'Gestión de Áreas',
    generarRuta: () => {
      return `area-piso-modulo/gestion-areas-piso`;
    },
  },

  _rutaGestionPiso: {
    ruta: 'piso-modulo',
    nombre: 'Gestión de Pisos',
    generarRuta: (...argumentos) => {
      return `piso-modulo/${argumentos[2]}`;
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

  rutaGestionAreaPiso: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionPiso,
      this._rutaGestionAreaPiso,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
