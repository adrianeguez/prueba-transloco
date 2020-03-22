// import {Empresa} from '../../../empresa.entity';
import {ArticuloPorEmpresaEntity} from '../servicios/rest/articulo-por-empresa/articulo-por-empresa.entity';
import {ArticuloEntity} from '../servicios/rest/articulo/articulo.entity';
import {PrecioEntity} from '../servicios/rest/precio/precio.entity';
import {TarifaImpuestoEntity} from '../servicios/rest/tarifa-impuesto/tarifa-impuesto.entity';
import {HistorialImpuestoEntity} from '../servicios/rest/historial-impuesto/historial-impuesto.entity';
import {ConfiguracionEntity} from '../servicios/rest/configuracion/configuracio.entity';
import {VentaCabeceraEntity} from '../servicios/rest/venta-cabecera/venta-cabecera-entity';
import {VentaDetalleEntity} from '../servicios/rest/venta-detalle/venta-detalle-entity';
import {DescuentoVentaEntity} from '../servicios/rest/descuento-venta/descuento-venta-entity';
import {EmpresaEntity} from '../servicios/rest/empresa/empresa.entity';

export const ENTIDADES_PEDIDO = [
  EmpresaEntity,
  ArticuloEntity,
  PrecioEntity,
  ArticuloPorEmpresaEntity,
  TarifaImpuestoEntity,
  HistorialImpuestoEntity,
  ConfiguracionEntity,
  VentaCabeceraEntity,
  VentaDetalleEntity,
  DescuentoVentaEntity
];
