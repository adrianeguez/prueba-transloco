import {generarRespuestaRuta} from '@manticore-labs/ng-api';

export let RUTAS_CLIENTE = {
  _rutaInicio: {
    ruta: 'cliente-modulo',
    nombre: 'modulosGenerales.clienteModulo.migasDePan.inicio',
    generarRuta: () => {
      return 'cliente-modulo';
    }
  },

  rutaInicio: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
