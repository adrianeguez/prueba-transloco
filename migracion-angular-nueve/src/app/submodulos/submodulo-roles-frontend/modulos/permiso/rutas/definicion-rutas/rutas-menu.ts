import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export let RUTAS_PERMISO = {
  _rutaInicio: {
    ruta: 'permiso-modulo',
    nombre: 'Menú permiso',
    generarRuta: () => {
      return 'permiso-modulo';
    },
  },
  rutaInicio: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ) {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionNombrePermiso: {
    ruta: 'gestion-nombre-permiso',
    nombre: 'Gestión nombre permiso',
    generarRuta: () => {
      return 'gestion-nombre-permiso';
    },
  },
  rutaGestionNombrePermiso: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionNombrePermiso];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionPermisoRol: {
    ruta: 'gestion-permiso-rol',
    nombre: 'Gestión permiso rol',
    generarRuta: () => {
      return 'gestion-permiso-rol';
    },
  },
  rutaGestionPermisoRol: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionPermisoRol];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaGestionRolMenu: {
    ruta: 'gestion-rol-menu',
    nombre: 'Gestión rol menú',
    generarRuta: () => {
      return 'gestion-rol-menu';
    },
  },
  rutaGestionRolMenu: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionRolMenu];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaGestionUsuarioRol: {
    ruta: 'gestion-usuario-rol',
    nombre: 'Gestión usuario rol',
    generarRuta: () => {
      return 'gestion-usuario-rol';
    },
  },
  rutaGestionUsuarioRol: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionUsuarioRol];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
