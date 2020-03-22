import { generarRespuestaRuta } from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA_CLIENTES} from '../../../empresa-clientes/rutas/definicion-rutas/rutas-empresa-clientes';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';

export const RUTAS_EDIFICIO = {

  _rutaInicioEdificio: {
    ruta: ':idEmpresa/edificio-modulo',
    nombre: 'Módulo edificio',
    generarRuta: (...argumentos) => {
      return `${argumentos[0]}/edificio-modulo`;
    }
  },

  _rutaInicioDesdeEmpresaCliente: {
    ruta: ':idEmpresaClientes/edificio-modulo',
    nombre: 'Módulo edificio',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/edificio-modulo`;
    }
  },

  rutaInicioEdificio: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioEdificio,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },

  _rutaGestionEdificio: {
    ruta: 'gestion-edificios',
    nombre: 'Gestión de Edificios',
    generarRuta: () => {
      return `gestion-edificios`;
    },
  },

  rutaGestionEdificio: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioEdificio,
      this._rutaGestionEdificio,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },

  rutaGestionEdificioClientes: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_EMPRESA_CLIENTES._rutaInicioEmpresaCliente,
      this._rutaInicioEdificio,
      this._rutaGestionEdificio,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },

};
