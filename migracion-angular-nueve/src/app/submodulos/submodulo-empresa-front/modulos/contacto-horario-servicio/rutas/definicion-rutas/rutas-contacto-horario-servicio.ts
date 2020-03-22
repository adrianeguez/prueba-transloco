import {generarRespuestaRuta} from '@manticore-labs/ng-api';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {RUTA_TRADUCCION_CONTACTO_HORARIO_SERVICIO} from '../../constantes/ruta-traducción-contacto-horario-servicio';

export let RUTAS_CONTACTO_HORARIO_SERVICIO = {
  _rutaInicioContactoHorarioServicio: {
    ruta: ':idHorarioServicio/contacto-horario-servicio-modulo',
    nombre: 'Modulo de Contactos',
    generarRuta: (...ids) => {
      return `${ids[4]}/contacto-horario-servicio-modulo`;
    }
  },

  rutaInicioContactoHorarioServicio: function (arreglo = false, migasDePan = false, argumentos?: any[]) {
    const rutaArreglo = [this._rutaInicioContactoHorarioServicio];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

  _rutaGestionContactoHorarioServicio: {
    ruta: 'gestion-contacto-horario',
    nombre: `${RUTA_TRADUCCION_CONTACTO_HORARIO_SERVICIO}.migasDePan.contactoHorarioServicio`,
    generarRuta: () => {
      return 'gestion-contacto-horario';
    }
  },
  _rutaInicioEstablecimiento: {
    ruta: 'establecimiento-modulo',
    nombre: 'Gestion Establecimientos',
    generarRuta: (...argumentos) => {
      return `${argumentos[1]}/establecimiento-modulo`;
    },
  },

  rutaGestionContactoHorarioServicio: function (arreglo = false, migasDePan = false, argumentos?: any[]): any {
    const rutaArreglo = [
      RUTAS_EMPRESA._inicioModuloEmprsa,
      RUTAS_EDIFICIO._rutaInicioEdificio,
      this._rutaInicioEstablecimiento,
      RUTAS_SERVICIO_ESTABLECIMIENTO._rutaInicioServicioEstablecimiento,
      RUTAS_HORARIO_SERVICIO._rutaInicioHorarioServicio,
      this._rutaInicioContactoHorarioServicio,
      this._rutaGestionContactoHorarioServicio,
    ];
    return generarRespuestaRuta(arreglo, migasDePan, rutaArreglo, argumentos);
  },

};
