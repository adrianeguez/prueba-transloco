import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';

export let RUTAS_TEMA = {

  _rutaInicioTema: {
    ruta: ':idModuloCurso/tema-modulo',
    nombre:  'submoduloCertificadosCuros.tema.rutas.rutaGestionTema.migasDePan' + '.inicio',
    generarRuta: (...argumentos) => {
      return `${argumentos[2]}/tema-modulo`;
    }
  },

  rutaInicioTema: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioTema,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioUsuarioTema: {
    ruta: ':idModuloCursoUsuario/:idModuloCurso/tema-modulo',
    nombre: 'submoduloCertificadosCuros.tema.rutas.rutaGestionTema.migasDePan' + '.inicio',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/${argumentos[2]}/tema-modulo`;
    }
  },

  rutaInicioUsuarioTema: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioUsuarioTema,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionTema: {
    ruta: 'gestion-tema',
    nombre: 'submoduloCertificadosCuros.tema.rutas.rutaGestionTema.migasDePan' + '.gestion',
    generarRuta: () => {
      return 'gestion-tema';
    }
  },

  rutaGestionTema: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      this._rutaInicioTema,
      this._rutaGestionTema
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaMenuTema: {
    ruta: 'menu-tema',
    nombre: 'submoduloCertificadosCuros.tema.rutas.rutaGestionTema.migasDePan' + '.menu',
    generarRuta: () => {
      return `menu-tema`;
    }
  },

  rutaMenuTema: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio, // cliente-modulo
      RUTAS_CURSO._rutaInicioUsuarioCurso, // curso-modulo
      RUTAS_CURSO._rutaMenuMisCursos, // menu-mis-cursos
      RUTAS_MODULO_CURSO._rutaInicioUsuarioModuloCurso, // modulo-curso
      this._rutaInicioUsuarioTema, // modulo-tema
      this._rutaMenuTema, // menu-tema
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};

