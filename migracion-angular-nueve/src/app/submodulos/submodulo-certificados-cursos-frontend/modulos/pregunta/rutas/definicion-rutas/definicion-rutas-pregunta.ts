import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_PRUEBA} from '../../../prueba/rutas/definicion-rutas/rutas-prueba';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';

export let RUTAS_PREGUNTA = {
  _rutaInicioPregunta: {
    ruta: ':idDiapositiva/pregunta-modulo',
    nombre: 'submoduloCertificadosCuros.pregunta.rutas.rutaGestionPregunta.migasDePan.inicio',
    generarRuta: (...ids) => {
      return `${ids[4]}/pregunta-modulo`;
    }
  },

  rutaInicioPregunta: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionPregunta: {
    ruta: 'gestion-pregunta',
    nombre: 'submoduloCertificadosCuros.pregunta.rutas.rutaGestionPregunta.migasDePan.gestion',
    generarRuta: () => {
      return `gestion-pregunta`;
    }
  },

  rutaGestionPregunta: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      RUTAS_TEMA._rutaInicioTema,
      RUTAS_DIAPOSITIVA._rutaInicioDiapositiva,
      this._rutaInicioPregunta,
      this._rutaGestionPregunta,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaAsignacionPregunta: {
    ruta: 'asignacion-pregunta',
    nombre: 'submoduloCertificadosCuros.pregunta.rutas.rutaGestionPregunta.migasDePan.asignacion',
    generarRuta: () => {
      return `asignacion-pregunta`;
    }
  },

  rutaAsignacionPregunta: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      RUTAS_TEMA._rutaInicioTema,
      RUTAS_DIAPOSITIVA._rutaInicioDiapositiva,
      this._rutaInicioPregunta,
      this._rutaAsignacionPregunta,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaInicioPreguntaPrueba: {
    ruta: ':idPrueba/pregunta-modulo',
    nombre: 'submoduloCertificadosCuros.pregunta.rutas.rutaGestionPregunta.migasDePan.inicio',
    generarRuta: (...ids) => {
      return `${ids[3]}/pregunta-modulo`;
    }
  },

  rutaGestionPreguntaPrueba: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      RUTAS_PRUEBA._rutaInicioPrueba,
      this._rutaInicioPreguntaPrueba,
      this._rutaAsignacionPregunta,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
