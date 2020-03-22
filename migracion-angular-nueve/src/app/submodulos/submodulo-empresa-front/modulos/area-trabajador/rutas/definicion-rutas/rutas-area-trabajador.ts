import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_AREA_TRABAJADOR = {
  _rutaGestionAreaTrabajador: {
    ruta: 'area-trabajador-modulo',
    nombre: 'Gestión de Trabajadores',
    generarRuta: (...argumentos) => {
      return `${argumentos[3]}/area-trabajador-modulo/gestion-areas-trabajador`;
    },
  },

  _rutaGestionAreaPiso: {
    ruta: 'area-piso-modulo',
    nombre: 'Gestión de Áreas',
    generarRuta: (...argumentos) => {
      return `${argumentos[2]}/area-piso-modulo`;
    },
  },

  _rutaGestionPiso: {
    ruta: 'piso-modulo',
    nombre: 'Gestión de Piso',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/piso-modulo`;
    },
  },

  _rutaGestionEdificio: {
    ruta: 'edificio-modulo',
    nombre: 'Gestíon de Edificios',
    generarRuta: (...argumentos) => {
      return `${argumentos[0]}/edificio-modulo`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: () => {
      return `empresa-modulo`;
    },
  },

  rutaGestionAreaTrabajador: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionPiso,
      this._rutaGestionAreaPiso,
      this._rutaGestionAreaTrabajador,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
