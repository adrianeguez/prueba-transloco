import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export let RUTAS_USUARIO = {
  _rutaInicio: {
    ruta: 'usuario-modulo',
    nombre: 'Módulo usuario',
    generarRuta: () => {
      return 'usuario-modulo';
    },
  },
  _rutaGestionUsuarios: {
    ruta: 'gestion-usuarios',
    nombre: 'Gestión usuarios',
    generarRuta: () => {
      return 'gestion-usuarios';
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
  rutaGestionUsuarios: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionUsuarios];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
