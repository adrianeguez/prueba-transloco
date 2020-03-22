import {SERVICIOS_PRUEBA} from '../modulos/prueba/constantes/servicios-prueba';
import {SERVICIOS_CURSO} from '../modulos/curso/constantes/servicios-curso';
import {SERVICIOS_MODULO_CURSO} from '../modulos/modulo-curso/constantes/servicios-modulo-curso';
import {SERVICIOS_TEMA} from '../modulos/tema/constantes/servicios-tema';
import {SERVICIOS_PREGUNTA} from '../modulos/pregunta/constantes/servicios-pregunta';
import {SERVICIOS_OPCION} from '../modulos/opcion/constantes/servicios-opcion';
import {SERVICIOS_DIAPOSITIVA} from '../modulos/diapositiva/constantes/servicios-diapostiva';
import {SERVICIOS_CONTENIDO} from '../modulos/contenido/constantes/servicios-contenido';
import {SERVICIOS_PEDIDO_CURSO} from '../modulos/pedido/constantes/servicios-pedido-curso';
import {SERVICIOS_SERVICIO_ESTABLECIMIENTO} from '../../submodulo-empresa-front/modulos/servicio-establecimiento/constantes/servicio-servicios';
import {SERVICIOS_HORARIO_SERVICIO} from '../../submodulo-empresa-front/modulos/horario-servicio/constantes/horario-servicio-servicios';
import {SERVICIOS_HORARIO} from '../../submodulo-menu-front/modulos/horario/constantes/servicios-horario';
import {SERVICIOS_CONTACTO_HORARIO_SERVICIO} from '../../submodulo-empresa-front/modulos/contacto-horario-servicio/constantes/contacto-horario-servicio-servicios';
import {SERVICIOS_STRIPE} from '../modulos/stripe/constantes/servicios-stripe';

export const SERVICIOS_CERTIFICADOS_CURSOS = [
  ...SERVICIOS_CURSO,
  ...SERVICIOS_MODULO_CURSO,
  ...SERVICIOS_PRUEBA,
  ...SERVICIOS_TEMA,
  ...SERVICIOS_PREGUNTA,
  ...SERVICIOS_OPCION,
  ...SERVICIOS_DIAPOSITIVA,
  ...SERVICIOS_CONTENIDO,
  ...SERVICIOS_SERVICIO_ESTABLECIMIENTO,
  ...SERVICIOS_PEDIDO_CURSO,
  ...SERVICIOS_HORARIO_SERVICIO,
  ...SERVICIOS_HORARIO,
  ...SERVICIOS_CONTACTO_HORARIO_SERVICIO,
  ...SERVICIOS_STRIPE,
];
