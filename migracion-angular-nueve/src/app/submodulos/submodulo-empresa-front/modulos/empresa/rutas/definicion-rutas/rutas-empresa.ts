import { generarRespuestaRuta } from '@manticore-labs/ng-api';

export const RUTAS_EMPRESA = {
  // _rutaInicioEmpresa: {
  //   ruta: 'empresa-modulo',
  //   nombre: 'Módulo empresa',
  //   generarRuta: () => {
  //     return 'empresa-modulo';
  //   }
  // },
  //
  // rutaInicioEmpresa: function (
  //   arreglo = false,
  //   migasDePan = false,
  //   argumentos?: any[],
  // ): any {
  //   const rutaArreglo = [
  //     this._rutaInicioEmpresa,
  //   ];
  //   return generarRespuestaRuta(
  //     arreglo,
  //     migasDePan,
  //     rutaArreglo,
  //     argumentos
  //   );
  // },
  // _rutaGestionEmpresa: {
  //   ruta: 'gestion-empresa',
  //   nombre: 'Gestión de Empresas',
  //   generarRuta: () => {
  //     return 'gestion-empresa';
  //   },
  // },
  // rutaGestionEmpresa: function (
  //   arreglo = false,
  //   migasDePan = false,
  //   argumentos?: any[],
  // ): any {
  //   const rutaArreglo = [
  //     this._rutaInicioEmpresa,
  //     this._rutaGestionEmpresa
  //   ];
  //   return generarRespuestaRuta(
  //     arreglo,
  //     migasDePan,
  //     rutaArreglo,
  //     argumentos
  //   );
  // },

  _inicioModuloEmprsa: {
    ruta: 'empresa-modulo',
    nombre: 'Módulo empresa',
    generarRuta: () => {
      return 'empresa-modulo';
    }
  },
  inicioModuloEmprsa: function (arreglo = false, migasDePan = false, argumentos?: any[]) {
    const rutaArreglo = [this._inicioModuloEmprsa];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresas',
    generarRuta: () => {
      return 'empresa-modulo/gestion';
    },
  },
  rutaGestionEmpresa: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaGestionEmpresa];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
