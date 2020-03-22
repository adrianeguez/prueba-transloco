import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export let RUTAS_ROL = {
  _rutaInicio: {
    ruta: 'rol-modulo',
    nombre: 'Módulo rol',
    generarRuta: () => {
      return 'rol-modulo';
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
  _rutaGestionRoles: {
    ruta: 'gestion-rol',
    nombre: 'Gestión roles',
    generarRuta: () => {
      return 'gestion-rol';
    },
  },
  rutaGestionRoles: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionRoles];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
