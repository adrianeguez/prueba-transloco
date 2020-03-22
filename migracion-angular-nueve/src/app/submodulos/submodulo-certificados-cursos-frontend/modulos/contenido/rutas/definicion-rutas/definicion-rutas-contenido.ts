import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';

export let RUTAS_CONTENIDO = {
  _rutaInicioContenido: {
    ruta: ':idDiapositiva/contenido-modulo',
    nombre: 'submoduloCertificadosCuros.contenido.migasDePan.inicio',
    generarRuta: (...argumentos) => {
      return `${argumentos[4]}/contenido-modulo`;
    }
  },

  rutaInicioContenido: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionContenido: {
    ruta: 'gestion-contenidos',
    nombre: 'submoduloCertificadosCuros.contenido.migasDePan.gestion',
    generarRuta: () => {
      return `gestion-contenidos`;
    }
  },

  rutaGestionContenido: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      RUTAS_TEMA._rutaInicioTema,
      RUTAS_DIAPOSITIVA._rutaInicioDiapositiva,
      this._rutaInicioContenido,
      this._rutaGestionContenido,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
