import {ContactoEmpresaInterface} from '../../../interfaces/contacto-empresa.interface';
import {ServicioEstablecimientoInterface} from '../../servicio-establecimiento/interfaces/servicio-establecimiento.interface';
import {HorarioInterface} from '../../../../submodulo-menu-front/modulos/horario/interfaces/horario.interface';


export interface HorarioServicioInterface {
  id?: number;
  habilitado: 1|0;
  horario?: HorarioInterface | number;
  servicioPorEstablecimiento?: ServicioEstablecimientoInterface | number;
}
