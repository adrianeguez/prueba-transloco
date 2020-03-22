import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export let RUTAS_TIPO_SISTEMA = {
  _rutaInicio: {
    ruta: 'tipo-sistema-modulo',
    nombre: 'Modulo tipo sistema',
    generarRuta: () => {
      return 'tipo-sistema-modulo';
    }
  },

  rutaInicio: function (arreglo = false, migasDePan = false, argumentos?: any[]) {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaGestionTipoSistema: {
    ruta: 'gestion-tipo-sistema',
    nombre: 'Gestion tipo sistema',
    generarRuta: () => {
      return 'gestion-tipo-sistema';
    }
  },
  rutaGestionTipoSistema: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicio, this._rutaGestionTipoSistema];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
