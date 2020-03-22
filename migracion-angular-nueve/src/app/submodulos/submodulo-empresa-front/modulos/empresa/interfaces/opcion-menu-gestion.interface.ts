import {OpcionMenuBotonInterface} from './opcion-menu-boton.interface';

export interface OpcionMenuGestionInterface {
  opcion?: string;
  imagen?: string;
  botones?: OpcionMenuBotonInterface[];
}
