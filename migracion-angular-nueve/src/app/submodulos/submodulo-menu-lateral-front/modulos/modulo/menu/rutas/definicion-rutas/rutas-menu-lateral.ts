import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export let RUTAS_MENU = {
  _rutaInicio: {
    ruta: 'menu-modulo',
    nombre: 'Módulo menú',
    generarRuta: () => {
      return 'menu-modulo';
    },
  },
  _rutaGestionMenu: {
    ruta: 'gestion-menu',
    nombre: 'Gestión menú',
    generarRuta: () => {
      return 'gestion-menu';
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
  rutaGestionMenu: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionMenu];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
