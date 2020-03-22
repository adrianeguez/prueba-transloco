import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../../../submodulo-empresa-front/modulos/servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTA_TRADUCCION_GESTION_PEDIDO_CURSO} from '../../constantes/ruta-traduccion-pedido';

export let RUTAS_PEDIDO_CURSO = {
  _rutaInicioEmpresa: {
    ruta: 'empresa-modulo',
    nombre: 'Gestión de Empresa',
    generarRuta: () => {
      return `empresa-modulo`;
    },
  },
  _rutaInicioEdificio: {
    ruta: 'edificio-modulo',
    nombre: 'Gestión de Edificios',
    generarRuta: (...argumentos) => {
      return `${argumentos[0]}/edificio-modulo`;
    },
  },

  _rutaInicioEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestion Establecimientos',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/establecimiento-modulo`;
    },
  },

  _rutaInicioPedidoCurso: {
    ruta: 'pedido-curso-modulo',
    nombre: 'Modulo Pedido Curso',
    generarRuta: (...argumentos) => {
      return `${argumentos[3]}/pedido-curso-modulo`;
    }
  },

  rutaInicioPedidoCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicioPedidoCurso];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaGestionPedidoCurso: {
    ruta: 'gestion-pedido-curso',
    nombre: `${RUTA_TRADUCCION_GESTION_PEDIDO_CURSO}.migasDePan.gestionPedidoCurso`,
    generarRuta: () => {
      return `gestion-pedido-curso`;
    }
  },

  rutaGestionPedidoCurso: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      this._rutaInicioEmpresa,
      this._rutaInicioEdificio,
      this._rutaInicioEstablecimiento,
      RUTAS_SERVICIO_ESTABLECIMIENTO._rutaInicioServicioEstablecimiento,
      this._rutaInicioPedidoCurso,
      this._rutaGestionPedidoCurso
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaInicioPedidoEstudiante: {
    ruta: ':idHorario/pedido-curso-modulo',
    nombre: 'Modulo Pedido Curso',
    generarRuta: (...ids) => {
      return `${ids[3]}/pedido-curso-modulo`;
    }
  },

  rutaInicioPedidoEstudiante: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [this._rutaInicioPedidoCurso];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
  _rutaRealizarPedido: {
    ruta: 'pedido',
    nombre: `${RUTA_TRADUCCION_GESTION_PEDIDO_CURSO}.migasDePan.clientePedidoCurso`,
    generarRuta: () => {
      return `pedido`;
    }
  },

  rutaRealizarPedido: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_CURSO._rutaInicioCurso,
      RUTAS_SERVICIO_ESTABLECIMIENTO._rutaMenuServicio,
    // RUTAS_HORARIOS._rutaMenuHorario, // ARREGLAR
      this._rutaInicioPedidoEstudiante,
      this._rutaRealizarPedido,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },
};
