import { generarRespuestaRuta } from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';

export const RUTAS_CONTACTO_EMPRESA = {
  _rutaInicioContactoEmpresa: {
    ruta: ':idEmpresa/contacto-empresa-modulo',
    nombre: 'Módulo Contacto Empresa',
    generarRuta: (...argumentos) => {
      return `${argumentos[0]}/contacto-empresa-modulo`;
    },
  },

  rutaInicioContactoEmpresa: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioContactoEmpresa,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },

  _rutaGestionContactoEmpresa: {
    ruta: 'gestion-contactos-empresa',
    nombre: 'Gestión de trabajadores',
    generarRuta: () => {
      return `gestion-contactos-empresa`;
    },
  },

  rutaGestionContactoEmpresa: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioContactoEmpresa,
      this._rutaGestionContactoEmpresa,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },
  _rutaInicioContactoEmpresaCertificado: {
    ruta: ':idHorario/contacto-empresa-modulo',
    nombre: 'Módulo Contacto Empresa',
    generarRuta: (...argumentos) => {
      return `${argumentos[4]}/contacto-empresa-modulo`;
    },
  },

  rutaInicioContactoEmpresaCertificado: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioContactoEmpresaCertificado,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },
  _rutaInicioEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestion Establecimientos',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/establecimiento-modulo`;
    },
  },

  rutaGestionContactoEmpresaCertificado: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_EDIFICIO._rutaInicioEdificio,
      this._rutaInicioEstablecimiento,
      RUTAS_SERVICIO_ESTABLECIMIENTO._rutaInicioServicioEstablecimiento,
      RUTAS_HORARIO_SERVICIO._rutaInicioHorarioServicio,
      this._rutaInicioContactoEmpresaCertificado,
      this._rutaGestionContactoEmpresa,
    ];
    return generarRespuestaRuta(
      arreglo,
      migasDePan,
      rutaArreglo,
      argumentos
    );
  },

};
