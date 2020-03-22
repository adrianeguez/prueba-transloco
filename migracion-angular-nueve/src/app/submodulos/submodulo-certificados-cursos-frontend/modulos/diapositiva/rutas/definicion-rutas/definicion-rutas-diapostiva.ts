import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';

export let RUTAS_DIAPOSITIVA = {
  _rutaInicioDiapositiva: {
    ruta: ':idTema/diapositiva-modulo',
    nombre: 'submoduloCertificadosCuros.diapositiva.rutas.rutaGestionDiapositiva.migasDePan.segmentoRutaInicial',
    generarRuta: (...argumentos) => {
      return `${argumentos[3]}/diapositiva-modulo`;
    }
  },

  rutaInicioDiapositiva: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioDiapositiva
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioUsuarioDiapositiva: {
    ruta: ':idTema/diapositiva-modulo',
    nombre: 'submoduloCertificadosCuros.diapositiva.rutas.rutaClienteDiapositiva.migasDePan.segmentoRutaInicio',
    generarRuta: (...argumentos) => {
      return `${argumentos[3]}/diapositiva-modulo`;
    }
  },

  rutaInicioUsuarioDiapositiva: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioUsuarioDiapositiva
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionDiapositiva: {
    ruta: 'gestion-diapositivas',
    nombre: 'submoduloCertificadosCuros.diapositiva.rutas.rutaGestionDiapositiva.migasDePan.segmentoRutaGestion',
    generarRuta: () => {
      return `gestion-diapositivas`;
    }
  },

  rutaGestionDiapositiva: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      RUTAS_TEMA._rutaInicioTema,
      this._rutaInicioDiapositiva,
      this._rutaGestionDiapositiva,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaMenuDiapositiva: {
    ruta: 'menu-diapositiva',
    nombre: 'submoduloCertificadosCuros.diapositiva.rutas.rutaClienteDiapositiva.migasDePan.segmentoRutaMenu',
    generarRuta: () => {
      return `menu-diapositiva`;
    }
  },

  rutaMenuDiapositiva: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio, // cliente-modulo
      RUTAS_CURSO._rutaInicioUsuarioCurso, // curso-modulo
      RUTAS_CURSO._rutaMenuMisCursos, // menu-mis-cursos
      RUTAS_MODULO_CURSO._rutaInicioUsuarioModuloCurso, // modulo-curso
      // RUTAS_MODULO_CURSO._rutaMenuModuloCurso, // menu-modulo-curso
      RUTAS_TEMA._rutaInicioUsuarioTema, // modulo-tema
      // RUTAS_TEMA._rutaMenuTema, // menu-tema
      this._rutaInicioUsuarioDiapositiva, // modulo-diapositiva
      this._rutaMenuDiapositiva, // menu-diapositiva
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
