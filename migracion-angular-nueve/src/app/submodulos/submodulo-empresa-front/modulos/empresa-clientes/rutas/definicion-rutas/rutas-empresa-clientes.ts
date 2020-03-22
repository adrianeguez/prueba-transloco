import { generarRespuestaRuta } from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';

export const RUTAS_EMPRESA_CLIENTES = {
  _rutaInicioEmpresaCliente: {
    ruta: ':idEmpresa/empresa-clientes-modulo',
    nombre: 'Gestión de Empresas Cliente modulo',
    generarRuta: (...argumentos) => {
      return `${argumentos[0]}/empresa-clientes-modulo`;
    },
  },

  rutaInicioEmpresaCliente: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioEmpresaCliente,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },

  _rutaGestionEmpresaClientes: {
    ruta: 'gestion-empresas-clientes',
    nombre: 'Gestión de Empresas Cliente',
    generarRuta: () => {
      return `gestion-empresas-clientes`;
    },
  },

  rutaGestionEmpresaClientes: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioEmpresaCliente,
      this._rutaGestionEmpresaClientes,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },

};
