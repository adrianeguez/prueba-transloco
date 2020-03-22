import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';

export const RUTAS_CURSO = {
  _rutaInicioUsuarioCurso: {
    ruta: 'curso-modulo',
    nombre: 'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso.migasDePan.menuInicio',
    generarRuta: () => {
      return `curso-modulo`;
    }
  },
  _rutaMenuInicioUsuarioCurso: {
    ruta: 'inicio-curso',
    nombre: 'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso.migasDePan.menuInicio',
    generarRuta: () => {
      return `inicio-curso`;
    }
  },
  rutaInicioUsuarioCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio,
      this._rutaInicioUsuarioCurso,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  rutaMenuInicioUsuarioCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio,
      this._rutaInicioUsuarioCurso,
      this._rutaMenuInicioUsuarioCurso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioCurso: {
    ruta: ':idEmpresa/curso-modulo',
    nombre: 'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso.migasDePan.inicio',
    generarRuta: (...ids) => {
      return `${ids[0]}/curso-modulo`;
    }
  },

  rutaInicioCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioCurso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionCurso: {
    ruta: 'gestion-cursos',
    nombre: 'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso.migasDePan.gestion',
    generarRuta: () => {
      return `gestion-cursos`;
    }
  },

  rutaGestionCursos: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      this._rutaInicioCurso,
      this._rutaGestionCurso,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaMenuMisCursos: {
    ruta: 'menu-mis-cursos',
    nombre: 'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso.migasDePan.menuMisCursos',
    generarRuta: () => {
      return `menu-mis-cursos`;
    }
  },

  rutaMenuMisCursos: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio, // modulo-cliente
      this._rutaInicioUsuarioCurso, // curso-modulo
      this._rutaMenuInicioUsuarioCurso, // inicio-curso
      this._rutaMenuMisCursos, // menu-mis-cursos
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaSeleccionarCurso: {
    ruta: 'seleccionar-curso',
    nombre: 'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso.migasDePan.seleccionarCurso',
    generarRuta: () => {
      return `seleccionar-curso`;
    }
  },

  rutaSeleccionarCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio,
      this._rutaInicioUsuarioCurso, // curso-modulo
      this._rutaMenuInicioUsuarioCurso, // inicio-curso
      this._rutaSeleccionarCurso,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
