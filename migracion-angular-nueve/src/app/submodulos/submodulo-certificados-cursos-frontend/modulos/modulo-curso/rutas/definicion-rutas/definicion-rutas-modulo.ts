import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';


export let RUTAS_MODULO_CURSO = {
  _rutaInicioModuloCurso: {
    ruta: ':idCurso/modulo-curso-modulo',
    nombre: 'submoduloCertificadosCuros.moduloCursoModulo.migasDePan.segmentoRutaInicial',
    generarRuta: (...ids) => {
      return `${ids[1]}/modulo-curso-modulo`;
    }
  },

  rutaInicioModuloCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioModuloCurso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioUsuarioModuloCurso: {
    ruta: ':idCurso/modulo-curso-modulo',
    nombre: 'submoduloCertificadosCuros.moduloCursoModulo.migasDePan.segmentoRutaInicial',
    generarRuta: (...ids) => {
      return `${ids[0]}/modulo-curso-modulo`;
    }
  },

  rutaInicioUsuarioModuloCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioUsuarioModuloCurso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionModuloCurso: {
    ruta: 'gestion-modulo-curso',
    nombre: 'submoduloCertificadosCuros.moduloCursoModulo.rutas.rutaGestionModuloCurso.migasDePan.segmentoRutaGestion',
    generarRuta: () => {
      return `gestion-modulo-curso`;
    }
  },

  rutaGestionModuloCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    // const nombre = translocoService.translateObject('submoduloCertificadosCuros.moduloCursoModulo.rutas.rutaGestionModuloCurso.migasDePan.segmentoRutaGestion');
    // console.log(nombre);
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      this._rutaInicioModuloCurso,
      this._rutaGestionModuloCurso,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaMenuModuloCurso: {
    ruta: 'menu-modulo-curso',
    nombre: 'submoduloCertificadosCuros.moduloCursoModulo.rutas.rutaClienteModuloCurso.migasDePan.segmentoRutaMenu',
    generarRuta: () => {
      return `menu-modulo-curso`;
    }
  },

  rutaMenuModuloCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio,
      RUTAS_CURSO._rutaInicioUsuarioCurso,
      RUTAS_CURSO._rutaMenuMisCursos,
      this._rutaInicioUsuarioModuloCurso,
      this._rutaMenuModuloCurso,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
