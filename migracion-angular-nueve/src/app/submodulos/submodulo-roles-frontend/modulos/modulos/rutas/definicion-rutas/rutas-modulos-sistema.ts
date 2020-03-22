import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export let RUTAS_MODULOS_SISTEMA = {
  _rutaInicio: {
    ruta: 'modulos-sistema-modulo',
    nombre: 'Módulo de módulos del sistema',
    generarRuta: () => {
      return 'modulos-sistema-modulo';
    }
  },

  rutaInicio: function (arreglo = false, migasDePan = false, argumentos?: any[]) {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaGestionModulosSistema: {
    ruta: 'gestion-modulos-sistema',
    nombre: 'Gestión de modulos del sistema',
    generarRuta: () => {
      return 'gestion-modulos-sistema';
    }
  },

  rutaGestionModulosSistema: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicio,
      this._rutaGestionModulosSistema
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
