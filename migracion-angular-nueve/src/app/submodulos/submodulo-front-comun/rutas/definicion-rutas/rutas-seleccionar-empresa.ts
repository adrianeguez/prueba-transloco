import {generarRespuestaRuta} from '@manticore-labs/ng-api';

export const RUTAS_SELECCIONAR_EMPRESA = {
  _rutaSeleccionarEmpresa: {
    ruta: 'seleccionar-empresa',
    nombre: 'Seleccionar Empresa',
    generarRuta: () => {
      return 'seleccionar-empresa';
    },
  },
  rutaSeleccionarEmpresa: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaSeleccionarEmpresa];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
