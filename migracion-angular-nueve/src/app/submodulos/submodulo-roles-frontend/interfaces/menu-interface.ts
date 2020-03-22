export interface MenuInterface {
  id?: number | string;
  label?: string;
  routerLink?: string;
  url?: string;
  icon?: string;
  nivel?: number;
  items?: MenuInterface[];
  menuPadre?: number | MenuInterface;
  createdAt?: Date;
  updatedAt?: Date;
}
