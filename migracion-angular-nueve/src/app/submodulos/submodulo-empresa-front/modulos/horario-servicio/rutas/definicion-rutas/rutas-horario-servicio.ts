import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {RUTAS_CURSO} from '../../../../../submodulo-certificados-cursos-frontend/modulos/curso/rutas/definicion-rutas/definicion-rutas-curso';
import {
  RUTA_TRADUCCION_HORARIO_SERVICIO,
  RUTA_TRADUCCION_HORARIO_SERVICIO_CURSO
} from '../../constantes/ruta-traduccion-horario-servicio';

export let RUTAS_HORARIO_SERVICIO = {
  _rutaInicioHorarioServicio: {
    ruta: ':idServicio/horario-servicio-modulo',
    nombre: 'Modulo Horarios de Servicio',
    generarRuta: (...argumentos) => {
      return `${argumentos[3]}/horario-servicio-modulo`;
    }
  },
  rutaInicioHorarioServicio: function (arreglo = false, migasDePan = false, argumentos?: any[]) {
    const rutaArreglo = [this._rutaInicioHorarioServicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestion Establecimientos',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/establecimiento-modulo`;
    },
  },
  _rutaGestionHorarioServicio: {
    ruta: 'gestion-horario-servicio',
    nombre: `${RUTA_TRADUCCION_HORARIO_SERVICIO}.migasDePan.horarioServicio`,
    generarRuta: () => {
      return 'gestion-horario-servicio';
    }
  },
  rutaGestionHorario: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_EDIFICIO._rutaInicioEdificio,
      this._rutaInicioEstablecimiento,
      RUTAS_SERVICIO_ESTABLECIMIENTO._rutaInicioServicioEstablecimiento,
      this._rutaInicioHorarioServicio,
      this._rutaGestionHorarioServicio,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  // lado del cliente
  _rutaInicioHorarioEstablecimientoCurso: {
    ruta: ':idEstablecimiento/horario-modulo',
    nombre: 'Inicio Horario Establecimiento Curso',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/horario-modulo`;
    }
  },
  rutaInicioHorarioEstablecimientoCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioHorarioEstablecimientoCurso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaHorarioEstablecimientoCurso: {
    ruta: 'horario-establecimiento-curso',
    nombre: `${RUTA_TRADUCCION_HORARIO_SERVICIO_CURSO}.migasDePan.horarioEstablecimientoCurso`,
    generarRuta: () => {
      return `horario-establecimiento-curso`;
    }
  },
  rutaHorarioEstablecimientoCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio, // cliente-modulo
      RUTAS_CURSO._rutaInicioUsuarioCurso, // curso-modulo
      RUTAS_CURSO._rutaMenuMisCursos, // menu-mis-cursos
      RUTAS_SERVICIO_ESTABLECIMIENTO._rutaInicioEstablecimientosCurso, // :idCurso/establecimientos-curso-modulo
      this._rutaInicioHorarioEstablecimientoCurso, // :idservicioEstablecimiento/horario-modulo
      this._rutaHorarioEstablecimientoCurso, // horario-establecimiento-curso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};

