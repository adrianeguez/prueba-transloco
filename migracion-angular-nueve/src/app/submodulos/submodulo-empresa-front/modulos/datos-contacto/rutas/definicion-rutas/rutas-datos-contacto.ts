import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CONTACTO_EMPRESA} from '../../../contacto-empresa/rutas/definicion-rutas/rutas-contacto-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {RUTAS_CONTACTO_HORARIO_SERVICIO} from '../../../contacto-horario-servicio/rutas/definicion-rutas/rutas-contacto-horario-servicio';

export const RUTAS_DATOS_CONTACTO = {
  _rutaInicioDatosContacto: {
    ruta: ':idContactoEmpresa/datos-contacto-modulo',
    nombre: 'Módulo de Datos de Contacto',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/datos-contacto-modulo`;
    },
  },
  _rutaGestionDatosContacto: {
    ruta: 'gestion-datos-contacto',
    nombre: 'Gestión de Datos Contactos',
    generarRuta: () => {
      return `gestion-datos-contacto`;
    },
  },

  _rutaInicioDatosContactoCertificado: {
    ruta: ':idContactoEmpresa/datos-contacto-modulo',
    nombre: 'Módulo Datos Contacto',
    generarRuta: (...argumentos) => {
      return `${argumentos[5]}/datos-contacto-modulo`;
    },
  },

  rutaInicioDatosContactoCertificado: function (
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

  rutaGestionDatosContacto: function (
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CONTACTO_EMPRESA._rutaInicioContactoEmpresa,
      this._rutaInicioDatosContacto,
      this._rutaGestionDatosContacto,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestion Establecimientos',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/establecimiento-modulo`;
    },
  },

  rutaGestionDatosContactoCertificado: function (
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
      RUTAS_CONTACTO_HORARIO_SERVICIO._rutaInicioContactoHorarioServicio,
      this._rutaInicioDatosContactoCertificado,
      this._rutaGestionDatosContacto,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
