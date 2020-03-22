import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export let RUTAS_HORARIO = {
  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  _rutaGestionHorario: {
    ruta: 'horario-modulo',
    nombre: 'Gestión de Horario',
    generarRuta: () => {
      return `horario-modulo/gestion-horario`;
    },
  },

  rutaGestionHorario: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaGestionEmpresa, this._rutaGestionHorario];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
