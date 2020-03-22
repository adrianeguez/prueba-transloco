import { Component, OnInit } from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_PEDIDOS} from '../definicion-rutas/rutas-pedidos';
import {ArticuloRestSqljsService} from '../../../../servicios/rest/articulo/articulo-rest-sqljs.service';
import {ArticuloPorEmpresaRestSqljsService} from '../../../../servicios/rest/articulo-por-empresa/articulo-por-empresa-rest-sqljs.service';
import {eliminarDistintos} from '../../../../funciones/eliminar-distintos';
import {ArticuloEntity} from '../../../../servicios/rest/articulo/articulo.entity';
import {getRepository, Repository} from 'typeorm/browser';
import {PrecioEntity} from '../../../../servicios/rest/precio/precio.entity';
import {TarifaImpuestoEntity} from '../../../../servicios/rest/tarifa-impuesto/tarifa-impuesto.entity';
import {HistorialImpuestoEntity} from '../../../../servicios/rest/historial-impuesto/historial-impuesto.entity';
import {TarifaImpuestoRestSqljsService} from '../../../../servicios/rest/tarifa-impuesto/tarifa-impuesto-rest-sqljs.service';
import {PrecioRestSqljsService} from '../../../../servicios/rest/precio/precio-rest-sqljs.service';
import {HistorialImpuestoRestSqljsService} from '../../../../servicios/rest/historial-impuesto/historial-impuesto-rest-sqljs.service';
import {ArticuloPorEmpresaEntity} from '../../../../servicios/rest/articulo-por-empresa/articulo-por-empresa.entity';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {CargarArticulosPreciosImpuestosService} from '../../../../servicios/cargar-articulos-precios-impuestos.service';
import {ToasterService} from 'angular2-toaster';
import {toastErrorCargarDatos, toastExitoCargarDatos} from '../../../../../../constantes/mensajes-toaster';
import {ConfiguracionRestSqljsService} from '../../../../servicios/rest/configuracion/configuracion-rest-sqljs.service';
import {EliminarDatosLocalesService} from '../../../../servicios/eliminar-datos-locales.service';

@Component({
  selector: 'mlab-ruta-cargar-datos',
  templateUrl: './ruta-cargar-datos.component.html',
  styleUrls: ['./ruta-cargar-datos.component.scss'],
})
export class RutaCargarDatosComponent extends RutaConMigasDePan implements OnInit {
  estaCargaEnCurso;
  cierreForzado;
  ngOnInit() {
    this.cierreForzado = JSON.parse(localStorage.getItem('cierreForzado'));
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_PEDIDOS.rutaCargarDatos(false, true),
    ];
    this.establecerMigas(rutas);
  }

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private  readonly  _cargarArticulosPreciosImpuestosService: CargarArticulosPreciosImpuestosService,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _configuracionRestSqljsService: ConfiguracionRestSqljsService,
    private readonly _eliminarDatosLocalesService: EliminarDatosLocalesService,
  ) {
    super(_emitirMigaPanService);
  }

  async cargarArticulosPreciosImpuestos() {
    this.estaCargaEnCurso = JSON.parse(localStorage.getItem('estaCargando'));
    localStorage.setItem('cierreForzado', '0');
    if (!this.estaCargaEnCurso) {
      this._cargandoService.habilitarCargando();
      this._cargarArticulosPreciosImpuestosService.cargarArticulosPreciosImpuestos().then(() => {
        this._toasterService.pop(toastExitoCargarDatos);
      }).catch(error => {
        this._toasterService.pop(toastErrorCargarDatos);
      });
    } else {
      this._toasterService.pop('warning', 'Advertencia', 'Carga de artículos en curso');
    }
    this.cierreForzado = JSON.parse(localStorage.getItem('cierreForzado'));
  }

  async eliminarDatosLocales() {
    await this._eliminarDatosLocalesService.eliminarDatosLocales();
  }
}
