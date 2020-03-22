import {GUARDS_FRONT_COMUN} from '../../submodulo-front-comun/constantes/guards-front-comun';
import {RUTAS_TEMA_LAZY} from '../modulos/tema/constantes/rutas-tema-lazy';
import {RUTAS_CURSO_LAZY} from '../modulos/curso/constantes/rutas-curso-lazy';
import {RUTAS_MODULO_CURSO_LAZY} from '../modulos/modulo-curso/constantes/rutas-modulo-curso-lazy';
import {RUTAS_PRUEBA_LAZY} from '../modulos/prueba/constantes/rutas-prueba-lazy';
import {RUTAS_PREGUNTA_LAZY} from '../modulos/pregunta/constantes/rutas-pregunta-lazy';
import {RUTAS_OPCION_LAZY} from '../modulos/opcion/constantes/rutas-opcion-lazy';
import {RUTAS_DIAPOSITIVA_LAZY} from '../modulos/diapositiva/constantes/ruta-diapositiva-lazy';
import {RUTAS_CONTENIDO_LAZY} from '../modulos/contenido/constantes/ruta-contenido-lazy';
import {RUTAS_PEDIDO_CURSO_LAZY} from '../modulos/pedido/constantes/rutas-pedido-curso-lazy';
import {RUTAS_SERVICIO_ESTABLECIMIENTO_LAZY} from '../../submodulo-empresa-front/modulos/servicio-establecimiento/constantes/rutas-servicio-lazy';
import {RUTAS_HORARIO_SERVICIO_LAZY} from '../../submodulo-empresa-front/modulos/horario-servicio/constantes/rutas-horario-servicio-lazy';
import {RUTAS_HORARIO} from '../../submodulo-menu-front/modulos/horario/constantes/rutas-horario-lazy';
import {RUTAS_DATOS_CONTACTO_LAZY} from '../../submodulo-empresa-front/modulos/datos-contacto/constantes/rutas-datos-contacto-lazy';
import {RUTAS_CONTACTO_HORARIO_SERVICIO_LAZY} from '../../submodulo-empresa-front/modulos/contacto-horario-servicio/constantes/rutas-contacto-horario-servicio-lazy';

export const RUTAS_CERTIFICADOS_CURSOS = [
  ...RUTAS_CURSO_LAZY,
  ...RUTAS_MODULO_CURSO_LAZY,
  ...RUTAS_TEMA_LAZY,
  ...RUTAS_DIAPOSITIVA_LAZY,
  ...RUTAS_CONTENIDO_LAZY,
  ...RUTAS_PRUEBA_LAZY,
  ...RUTAS_OPCION_LAZY,
  ...RUTAS_PREGUNTA_LAZY,
  ...RUTAS_PEDIDO_CURSO_LAZY,
  ...RUTAS_SERVICIO_ESTABLECIMIENTO_LAZY, // otro submodulo CAMBIAR
  ...RUTAS_HORARIO_SERVICIO_LAZY, // otro submodulo CAMBIAR
  ...RUTAS_HORARIO, // otro submodulo CAMBIAR
  ...RUTAS_CONTACTO_HORARIO_SERVICIO_LAZY, // otro submodulo CAMBIAR
  ...RUTAS_DATOS_CONTACTO_LAZY, // otro submódulo
];
