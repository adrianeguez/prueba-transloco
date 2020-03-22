import { ArticulosProveedorRestService } from './../servicios/rest/articulo-proveedor-rest.service';
import { GrupoRestService } from '../servicios/rest/grupo-rest.service';
import { SubgrupoRestService } from '../servicios/rest/subgrupo-rest.service';
import { ArticulosRestService } from '../servicios/rest/articulos-rest.service';
import { DetalleAdicionalRestService } from '../servicios/rest/detalle-adicional-rest.service';
import { PreciosRestService } from '../servicios/rest/precios-rest.service';
import { UnidadMedidaRestService } from '../servicios/rest/unidad-medida-rest.service';
import { UnidadMedidaPorArticuloRestService } from '../servicios/rest/unidad-medida-por-articulo-rest.service';
import { TipoImpuestoRestService } from '../servicios/rest/tipo-impuesto-rest.service';
import { TarifaRestService } from '../servicios/rest/tarifa-rest.service';
import { TarifaImpuestoRestService } from '../servicios/rest/tarifa-impuesto-rest.service';
import { HistorialImpuestoRestService } from '../servicios/rest/historial-impuesto-rest.service';
import { ArticulosEmpresaRestService } from '../servicios/rest/articulo-empresa-rest.service';

export const SERVICIOS_ARTICULO = [
  GrupoRestService,
  SubgrupoRestService,
  ArticulosRestService,
  DetalleAdicionalRestService,
  PreciosRestService,
  UnidadMedidaPorArticuloRestService,
  UnidadMedidaRestService,
  TipoImpuestoRestService,
  TarifaRestService,
  TarifaImpuestoRestService,
  HistorialImpuestoRestService,
  ArticulosProveedorRestService,
  ArticulosEmpresaRestService,
];
