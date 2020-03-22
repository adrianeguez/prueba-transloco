import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_DEPARTAMENTO_EMPRESA = {
  _rutaGestionDepartamentoEmpresa: {
    ruta: 'departamento-empresa-modulo',
    nombre: 'Gestión de Departamentos',
    generarRuta: () => {
      return `departamento-empresa-modulo/gestion-departamentos-empresa`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionDepartamentoEmpresa: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDepartamentoEmpresa,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
