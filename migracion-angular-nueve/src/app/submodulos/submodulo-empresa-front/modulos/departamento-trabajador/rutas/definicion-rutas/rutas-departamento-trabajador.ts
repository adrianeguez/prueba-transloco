import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_DEPARTAMENTO_TRABAJADOR = {
  _rutaGestionDepartamentoTrabajador: {
    ruta: 'departamento-trabajador-modulo',
    nombre: 'Gestión de personal',
    generarRuta: () => {
      return `departamento-trabajador-modulo/gestion-departamentos-trabajador`;
    },
  },

  _rutaGestionDepartamentoEmpresa: {
    ruta: 'departamento-empresa-modulo',
    nombre: 'Gestión de departamentos',
    generarRuta: (...argumentos) => {
      return `departamento-empresa-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionDepartamentoTrabajador: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionDepartamentoEmpresa,
      this._rutaGestionDepartamentoTrabajador,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
