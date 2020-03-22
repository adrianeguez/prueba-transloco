import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_PRUEBA} from '../../../prueba/rutas/definicion-rutas/rutas-prueba';
import {RUTAS_PREGUNTA} from '../../../pregunta/rutas/definicion-rutas/definicion-rutas-pregunta';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';

export let RUTAS_OPCION = {
  _rutaInicioOpcion: {
    ruta: ':idPregunta/opcion-modulo',
    nombre: 'submoduloCertificadosCuros.opcionModulo.migasDePan.segmentoRutaInicial',
    generarRuta: (...argumentos) => {
      return `${argumentos[5]}/opcion-modulo`;
    }
  },

  rutaInicioOpcion: function (arreglo = false, migasDePan = false, argumentos?: any[]) {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaGestionOpcion: {
    ruta: 'gestion-opcion',
    nombre: 'submoduloCertificadosCuros.opcionModulo.migasDePan.segmentoRutaGestion',
    generarRuta: () => {
      return `gestion-opcion`;
    }
  },

  rutaGestionOpcion: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      RUTAS_TEMA._rutaInicioTema,
      RUTAS_DIAPOSITIVA._rutaInicioDiapositiva,
      RUTAS_PREGUNTA._rutaInicioPregunta,
      this._rutaInicioOpcion,
      this._rutaGestionOpcion,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
