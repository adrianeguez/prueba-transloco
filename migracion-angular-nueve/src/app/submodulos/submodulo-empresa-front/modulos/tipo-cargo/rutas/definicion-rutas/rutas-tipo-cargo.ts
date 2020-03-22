import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_TIPO_CARGO = {
  _rutaGestionTipoCargo: {
    ruta: 'tipo-cargo-modulo',
    nombre: 'Gestión de Tipos de Cargo',
    generarRuta: () => {
      return `tipo-cargo-modulo/gestion-tipos-cargo`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionTipoCargo: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaGestionEmpresa, this._rutaGestionTipoCargo];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
