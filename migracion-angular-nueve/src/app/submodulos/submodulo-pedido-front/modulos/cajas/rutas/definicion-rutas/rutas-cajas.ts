import {generarRespuestaRuta} from '@manticore-labs/ng-api';

export const RUTAS_CAJAS = {
  _rutaCajas: {
    ruta: 'cajas',
    nombre: 'Cajas',
    generarRuta: () => {
      return 'cajas';
    },
  },
  _rutaGestionCajas: {
    ruta: 'gestion-cajas',
    nombre: 'Gestión de cajas',
    generarRuta: () => {
      return 'gestion-cajas';
    },
  },
  _rutaCaja: {
    ruta: 'caja/:idPuntoEmisionOperario',
    nombre: 'Visualizar caja',
    generarRuta: (...params) => {
      return `caja/${params[0]}`;
    },
  },
  _rutaMiCaja: {
    ruta: 'mi-caja',
    nombre: 'Resumen de mi caja',
    generarRuta: () => {
      return 'mi-caja';
    },
  },

  _rutaGestionVentas: {
    ruta: 'gestion-ventas',
    nombre: 'Gestión de ventas',
    generarRuta: () => {
      return 'gestion-ventas';
    },
  },

  _rutaRegistroVenta: {
    ruta: 'registrar-venta',
    nombre: 'Registro de venta',
    generarRuta: (...argumentos) => {
      return `registrar-venta/${argumentos[0]}`;
    },
  },
  rutaGestionCajas: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaCajas, this._rutaGestionCajas];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutaMiCaja: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaCajas, this._rutaMiCaja];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutaCaja: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaCajas, this._rutaCaja];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutaGestionVentas: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaCajas, this._rutaMiCaja, this._rutaGestionVentas];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  rutaRegistroVenta: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [this._rutaCajas, this._rutaMiCaja, this._rutaGestionVentas, this._rutaRegistroVenta];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
