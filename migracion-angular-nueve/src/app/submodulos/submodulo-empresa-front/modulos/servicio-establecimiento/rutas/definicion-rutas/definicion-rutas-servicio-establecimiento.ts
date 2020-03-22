import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../../../submodulo-certificados-cursos-frontend/modulos/curso/rutas/definicion-rutas/definicion-rutas-curso';
import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {
  RUTA_TRADUCCION_ESTABLECIMIENTOS_CURSO,
  RUTA_TRADUCCION_GESTION_SERVICIO_ESTABLECIMIENTO
} from '../../constantes/rutas-traduccion-servicio-establecimiento';

export let RUTAS_SERVICIO_ESTABLECIMIENTO = {
  _rutaInicioServicioEstablecimiento: {
    ruta: ':idEstablecimiento/servicio-modulo',
    nombre: 'Modulo de Servicios',
    generarRuta: (...ids) => {
      return `${ids[2]}/servicio-modulo`;
    }
  },
  rutaInicioServicioEstablecimiento: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicioServicioEstablecimiento];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestion Establecimientos',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/establecimiento-modulo`;
    },
  },
  _rutaGestionServicio: {
    ruta: 'gestion-servicio',
    nombre: `${RUTA_TRADUCCION_GESTION_SERVICIO_ESTABLECIMIENTO}.migasDePan.gestionServicio`,
    generarRuta: () => {
      return 'gestion-servicio';
    }
  },
  rutaGestionServicio: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_EDIFICIO._rutaInicioEdificio,
      this._rutaInicioEstablecimiento,
      this._rutaInicioServicioEstablecimiento,
      this._rutaGestionServicio,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioMenuServicioEstablecimiento: {
    ruta: ':idCurso/servicio-modulo',
    nombre: 'Modulo de Servicios',
    generarRuta: (...ids) => {
      return `${ids[1]}/servicio-modulo`;
    }
  },
  rutaInicioMenuServicioEstablecimiento: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicioMenuServicioEstablecimiento];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaMenuServicio: {
    ruta: 'menu-establecimiento',
    nombre: 'Menu de establecimientos',
    generarRuta: () => {
      return `menu-establecimiento`;
    }
  },

  rutaMenuServicio: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      this._rutaInicioMenuServicioEstablecimiento,
      this._rutaMenuServicio,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  // PARTE DEL CLIENTE

  _rutaInicioEstablecimientosCurso: {
    ruta: ':idCurso/establecimientos-curso-modulo',
    nombre: 'Modulo Establecimientos Curso',
    generarRuta: (...ids) => {
      return `${ids[0]}/establecimientos-curso-modulo`;
    }
  },

  rutaInicioEstablecimientosCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicioEstablecimientosCurso];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaEstablecimientosCurso: {
    ruta: 'establecimientos-curso',
    nombre: `${RUTA_TRADUCCION_ESTABLECIMIENTOS_CURSO}.migasDePan.establecimientosCurso`,
    generarRuta: () => {
      return `establecimientos-curso`;
    }
  },
  rutaEstablecimientosCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio, // cliente-modulo
      RUTAS_CURSO._rutaInicioUsuarioCurso, // curso-modulo
      RUTAS_CURSO._rutaMenuMisCursos, // menu-mis-cursos
      this._rutaInicioEstablecimientosCurso, // :idCurso/establecimientos-curso-modulo
      this._rutaEstablecimientosCurso, // establecimientos-curso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
