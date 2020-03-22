import { SubSeccionMenuInterface } from './sub-seccion-menu.interface';
import { MenuComidaInterface } from './menu-comida.interface';
import { ArticuloInterface } from '../../submodulo-articulos-front/interfaces/articulo.interface';
import { DetalleCarritoInterface } from './detalle-carrito.interface';
import { TipoMenuDetalleInterface } from './tipo-menu-detalle.interface';
import { ImagenMenuInterface } from './imagen-menu.interface';
import { OpcionMenuInterface } from './opcion-menu.interface';
import { ItemFactorInterface } from './item-factor.interface';
import { CantidadMenuDetalleInterface } from './cantidad-menu-detalle.interface';
import { DescuentoMenuDetalleInterface } from './descuento-menu-detalle.interface';

export interface MenuDetalleInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  descripcion?: string;
  habilitado?: 0 | 1;
  precio?: number;
  esDelivery?: 0 | 1;
  esLocal?: 0 | 1;
  esPromocion?: 0 | 1;
  soloDescuento?: 0 | 1;
  numeroOpciones?: number;
  cantidadPermitida?: number;
  factor?: number;
  subSeccionMenu?: SubSeccionMenuInterface | number;
  menuComida?: MenuComidaInterface | number;
  articulo?: ArticuloInterface | number;
  tipoMenuDetalles?: TipoMenuDetalleInterface[];
  imagenesMenu?: ImagenMenuInterface[];
  opcionesMenu?: OpcionMenuInterface[];
  itemsFactor?: ItemFactorInterface[];
  cantidadesMenuDetalle?: CantidadMenuDetalleInterface[];
  descuentoMenuDetalles?: DescuentoMenuDetalleInterface[];
  detallesCarrito?: DetalleCarritoInterface[];
}
