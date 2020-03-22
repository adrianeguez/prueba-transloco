import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_GESTION_CRONOGRAMAS = {
  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },
  _rutaCronogramas: {
    ruta: 'cronogramas-modulo',
    nombre: 'Cronogramas',
    generarRuta: () => {
      return 'cronogramas-modulo';
    },
  },
  _rutaGestionCronogramas: {
    ruta: 'gestion-cronogramas',
    nombre: 'Gestión Cronogramas',
    generarRuta: () => {
      return 'gestion-cronogramas';
    },
  },
  _rutaGestionCronogramasDetalle: {
    ruta: 'gestion/:idCronogramaCabecera/detalle/:idRuta',
    nombre: 'Detalle horarios',
    generarRuta: (...argumentos) => {
      return `gestion/${argumentos[1]}/detalle/${argumentos[2]}`;
    },
  },
  rutagestionCronograma: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaCronogramas,
      this._rutaGestionCronogramas,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutagestionCronogramaDetalle: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaCronogramas,
      this._rutaGestionCronogramasDetalle,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
