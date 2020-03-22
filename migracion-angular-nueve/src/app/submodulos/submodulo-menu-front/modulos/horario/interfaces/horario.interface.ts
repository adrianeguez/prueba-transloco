import { EmpresaInterface } from '../../../../submodulo-empresa-front/interfaces/empresa.interface';

export interface HorarioInterface {
  id?: number;
  descripcion?: string;
  tipo?: 'D' | 'F';
  habilitado?: 1 | 0;
  lunes?: 1 | 0;
  martes?: 1 | 0;
  miercoles?: 1 | 0;
  jueves?: 1 | 0;
  viernes?: 1 | 0;
  sabado?: 1 | 0;
  domingo?: 1 | 0;
  fechaInicia?: string;
  fechaFinaliza?: string;
  horaInicia?: string;
  horaFinaliza?: string;
  empresa: EmpresaInterface | number;
}
