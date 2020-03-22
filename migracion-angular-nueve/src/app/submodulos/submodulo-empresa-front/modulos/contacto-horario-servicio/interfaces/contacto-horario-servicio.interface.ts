import {HorarioServicioInterface} from '../../horario-servicio/interfaces/horario-servicio.interface';
import {ContactoEmpresaInterface} from '../../../interfaces/contacto-empresa.interface';

export interface ContactoHorarioServicioInterface {
  id?: number;
  horarioServicio?: HorarioServicioInterface | number;
  contactoEmpresa?: ContactoEmpresaInterface | number;
  habilitado?: number;
}
