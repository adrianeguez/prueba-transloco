import { AreaPisoRestService } from '../servicios/rest/area-piso-rest.service';
import { AreaTrabajadorRestService } from '../servicios/rest/area-trabajador-rest.service';
import { BodegaRestService } from '../servicios/rest/bodega-rest.service';
import { CalificacionClienteRestService } from '../servicios/rest/calificacion-cliente-rest.service';
import { CalificacionProveedorRestService } from '../servicios/rest/calificacion-proveedor-rest.service';
import { CodigoPaisRestService } from '../servicios/rest/codigo-pais-rest.service';
import { ContactoEmpresaRestService } from '../servicios/rest/contacto-empresa-rest.service';
import { DepartamentoEmpresaRestService } from '../servicios/rest/departamento-empresa-rest.service';
import { DepartamentoTrabajadorRestService } from '../servicios/rest/departamento-trabajador-rest.service';
import { DireccionRestService } from '../servicios/rest/direccion-rest.service';
import { EdificioRestService } from '../servicios/rest/edificio-rest.service';
import { EmpresaClientesRestService } from '../servicios/rest/empresa-clientes-rest.service';
import { EmpresaProveedoresRestService } from '../servicios/rest/empresa-proveedores-rest.service';
import { EmpresaRestService } from '../servicios/rest/empresa-rest.service';
import { EstablecimientoRestService } from '../servicios/rest/establecimiento-rest.service';
import { PisoRestService } from '../servicios/rest/piso-rest.service';
import { DatosContactoRestService } from '../servicios/rest/datos-contacto-rest.service';
import { SubempresaRestService } from '../servicios/rest/subempresa-rest.service';
import { DatosUsuarioRestService } from '../servicios/rest/datos-usuario-rest.service';
import { LocalizacionRestService } from '../servicios/rest/localizacion-rest.service';
import { TipoCargoRestService } from '../servicios/rest/tipo-cargo-rest.service';
import { PreciosRestService } from '../servicios/rest/precios-rest.service';
import { MovimientoRestService } from '../servicios/rest/movimiento-rest.service';
import { TipoMovimientoRestService } from '../servicios/rest/tipo-movimiento-rest.service';

export const SERVICIOS_EMPRESA = [
  AreaPisoRestService,
  AreaTrabajadorRestService,
  BodegaRestService,
  CalificacionClienteRestService,
  CalificacionProveedorRestService,
  CodigoPaisRestService,
  ContactoEmpresaRestService,
  DatosContactoRestService,
  DepartamentoEmpresaRestService,
  DepartamentoTrabajadorRestService,
  DireccionRestService,
  EdificioRestService,
  EmpresaClientesRestService,
  EmpresaProveedoresRestService,
  EmpresaRestService,
  EstablecimientoRestService,
  PisoRestService,
  SubempresaRestService,
  DatosUsuarioRestService,
  LocalizacionRestService,
  PreciosRestService,
  TipoCargoRestService,
  TipoMovimientoRestService,
  MovimientoRestService,
];
