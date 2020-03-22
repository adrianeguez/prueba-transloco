import { AreaPisoInterface } from './area-piso.interface';
import { ContactoEmpresaInterface } from './contacto-empresa.interface';

export interface AreaTrabajadorInterface {
  id?: number;

  descripcionUbicacion?: string;

  areaPiso?: AreaPisoInterface | number | string;

  contactoEmpresa?: ContactoEmpresaInterface | number | string;
}
