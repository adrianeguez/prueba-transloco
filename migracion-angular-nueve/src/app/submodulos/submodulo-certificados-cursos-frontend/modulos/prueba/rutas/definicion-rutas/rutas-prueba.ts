import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {RUTAS_INTERNACIONALIZACION_GESTION_PRUEBA} from '../../constantes/rutas-internacionalizacion';

export let RUTAS_PRUEBA = {
  _rutaInicioPrueba: {
    ruta: ':idModuloCurso/prueba-modulo',
    nombre: `${RUTAS_INTERNACIONALIZACION_GESTION_PRUEBA}.migasDePan.inicio`,
    generarRuta: (...ids) => {
      return `${ids[2]}/prueba-modulo`;
    }
  },
  _rutaInicioUsuarioPrueba: {
    ruta: ':idPruebaUsuario/prueba-modulo',
    nombre: `${RUTAS_INTERNACIONALIZACION_GESTION_PRUEBA}.migasDePan.inicio`,
    generarRuta: (...ids) => {
      return `${ids[4]}/prueba-modulo`;
    }
  },

  rutaInicioPrueba: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicioPrueba];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaGestionPrueba: {
    ruta: 'gestion-prueba',
    nombre: `${RUTAS_INTERNACIONALIZACION_GESTION_PRUEBA}.migasDePan.gestion`,
    generarRuta: () => {
      return 'gestion-prueba';
    }
  },

  rutaGestionPrueba: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_MODULO_CURSO._rutaInicioModuloCurso,
      this._rutaInicioPrueba,
      this._rutaGestionPrueba
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaTestModulo: {
    ruta: 'test',
    nombre: `${RUTAS_INTERNACIONALIZACION_GESTION_PRUEBA}.migasDePan.prueba`,
    generarRuta: () => {
      return 'test';
    }
  },

  rutaTestModulo: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_CLIENTE._rutaInicio, // cliente-modulo
      RUTAS_CURSO._rutaInicioUsuarioCurso, // curso-modulo
      RUTAS_CURSO._rutaMenuMisCursos, // menu-mis-cursos
      RUTAS_MODULO_CURSO._rutaInicioUsuarioModuloCurso, // modulo-curso-modulo
      RUTAS_TEMA._rutaInicioUsuarioTema, // modulo-tema
      RUTAS_DIAPOSITIVA._rutaInicioUsuarioDiapositiva, // diapositiva-modulo
      this._rutaInicioUsuarioPrueba,
      this._rutaTestModulo
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
