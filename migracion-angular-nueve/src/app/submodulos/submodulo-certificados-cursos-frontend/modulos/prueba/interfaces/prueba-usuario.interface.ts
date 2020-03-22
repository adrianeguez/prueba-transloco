import {PruebaInterface} from './prueba.interface';

export interface PruebaUsuarioInterface {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  puntajeTotal: number;
  totalAciertos: number;
  totalErroneas: number;
  estado: string;
  tiempoTotal: number;
  fechaInicio: Date;
  fechaLimite?: Date;
  fechaFin?: Date;
  prueba?: PruebaInterface;
  moduloUsuario?: number;
}
