import { generarRespuestaRuta } from '@manticore-labs/ng-api';
import {RUTAS_CURSO} from '../../../../../submodulo-certificados-cursos-frontend/modulos/curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';

export const RUTAS_ESTABLECIMIENTO = {
  _rutaInicioEstablecimiento: {
    ruta: ':idEdificio/establecimiento-modulo',
    nombre: 'Modulo Establecimiento',
    generarRuta: (...ids) => {
      return `${ids[1]}/establecimiento-modulo`;
    }
  },
  rutaInicioEstablecimiento: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioEstablecimiento
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestion Establecimientos',
    generarRuta: () => {
      return `establecimiento-modulo/gestion-establecimientos`;
    },
  },

  _rutaGestionEdificio: {
    ruta: 'edificio-modulo',
    nombre: 'Gestión de Edificios',
    generarRuta: (...argumentos) => {
      return `edificio-modulo/${argumentos[1]}`;
    },
  },

  _rutaGestionEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: (...argumentos) => {
      return `empresa-modulo/${argumentos[0]}`;
    },
  },

  rutaGestionEstablecimiento: function(
    arreglo = false,
    migasDePan = false,
    argumentos?: any[],
  ): any {
    const rutaArreglo = [
      this._rutaGestionEmpresa,
      this._rutaGestionEdificio,
      this._rutaGestionEstablecimiento,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioUsuarioEstablecimientos: {
    ruta: ':idCurso/establecimiento-modulo',
    nombre: 'Establecimientos',
    generarRuta: (...ids) => {
      return `${ids[0]}/establecimiento-modulo`;
    }
  },

  rutaInicioUsuarioEstablecimientos: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioUsuarioModuloCurso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaCursoEstablecimiento: {
    ruta: 'curso-establecimiento',
    nombre: 'Establecimientos para cursos',
    generarRuta: () => {
      return `curso-establecimiento`;
    }
  },

  rutaCursoEstablecimiento: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio,
      RUTAS_CURSO._rutaInicioUsuarioCurso,
      RUTAS_CURSO._rutaMenuMisCursos,
      // this._rutaInicioEstablecimiento, // ESPERAR REFACTOR
      this._rutaCursoEstablecimiento,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
