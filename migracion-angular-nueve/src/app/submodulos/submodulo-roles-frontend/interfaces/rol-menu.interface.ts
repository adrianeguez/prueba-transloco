import { MenuInterface } from './menu-interface';
import { RolInterface } from './rol-interface';

export interface RolMenuInterface {
  menu: MenuInterface | number;
  rol: RolInterface | number;
}
