import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_SUBEMPRESA = {
  _rutaGestionSubempresa: {
    ruta: 'subempresa-modulo',
    nombre: 'Gestión de Subempresas',
    generarRuta: idEmpresa => {
      return `${idEmpresa}/subempresa-modulo/gestion-subempresas`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: () => {
      return `empresa-modulo`;
    },
  },

  rutaGestionSubempresa: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaGestionEmpresa, this._rutaGestionSubempresa];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
