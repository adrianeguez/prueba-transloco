import { TipoVendedorRestService } from '../servicios/rest/tipo-vendedor-rest.service';
import { EscalaVendedorRestService } from '../servicios/rest/escala-vendedor-rest.service';
import { PeriodoVentaRestService } from '../servicios/rest/periodo-venta-rest.service';
import { LugarRestService } from '../servicios/rest/lugar-rest.service';
import { TipoLogroVisitaRestService } from '../servicios/rest/tipo-logro-visita-rest.service';
import { DatosVendedorRestService } from '../servicios/rest/datos-vendedor-rest.service';
import { PeriodosPorVendedorRestService } from '../servicios/rest/periodos-por-vendedor-rest.service';
import { EscalaVendedorPorPeriodoRestService } from '../servicios/rest/escala-vendedor-por-periodo-rest.service';
import { RutaClienteRestService } from '../servicios/rest/ruta-cliente-rest.service';
import { VisitaRestService } from '../servicios/rest/visita-rest.service';
import { RutaRestService } from '../servicios/rest/ruta-rest.service';
import { LogroVisitaRestService } from '../servicios/rest/logro-visita-rest.service';
import { CronogramaDetalleRestService } from '../servicios/rest/cronograma-detalle-rest.service';
import { CronogramaCabeceraRestService } from '../servicios/rest/cronograma-cabecera-rest.service';
import {EdiCliRutaRestService} from '../servicios/rest/edi-cli-ruta-rest.service';

export const SERVICIOS_VENDEDOR = [
  TipoVendedorRestService,
  EscalaVendedorRestService,
  PeriodoVentaRestService,
  LugarRestService,
  TipoLogroVisitaRestService,
  DatosVendedorRestService,
  PeriodosPorVendedorRestService,
  EscalaVendedorPorPeriodoRestService,
  RutaClienteRestService,
  VisitaRestService,
  RutaRestService,
  LogroVisitaRestService,
  CronogramaDetalleRestService,
  CronogramaCabeceraRestService,
  EdiCliRutaRestService,
];
