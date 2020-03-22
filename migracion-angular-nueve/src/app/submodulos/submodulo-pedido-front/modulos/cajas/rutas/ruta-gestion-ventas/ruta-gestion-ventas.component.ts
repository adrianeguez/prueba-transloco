import { Component, OnInit } from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {PuntoEmisionOperarioInterface} from '../../../../interfaces/cajas/punto-emision-operario.interface';
import {PuntoEmisionOperarioRestService} from '../../../../servicios/rest/punto-emision-operario-rest.service';
import {ToasterService} from 'angular2-toaster';
import {VentaCabeceraEntityInterface} from '../../../../servicios/rest/venta-cabecera/interfaces/venta-cabecera-entity.interface';
import {VentaCabeceraRestSqljsService} from '../../../../servicios/rest/venta-cabecera/venta-cabecera-rest-sqljs.service';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {CajasService} from '../../../../servicios/rest/cajas.service';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {MatDialog} from '@angular/material/dialog';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_CAJAS} from '../definicion-rutas/rutas-cajas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';

@Component({
  selector: 'app-ruta-gestion-ventas',
  templateUrl: './ruta-gestion-ventas.component.html',
  styleUrls: ['./ruta-gestion-ventas.component.scss']
})
export class RutaGestionVentasComponent  extends RutaConMigasDePanTablaBusqueda <VentaCabeceraEntityInterface,
  VentaCabeceraRestSqljsService,
  ToasterService>implements OnInit {
  rows = NUMERO_FILAS_TABLAS;
  idOperario: number;
  columnas = [
    {field: 'nombre', header: 'Cliente', width: '50%'},
    {field: 'fecha', header: 'Fecha', width: '20%'},
    {field: 'estadoVenta', header: 'Estado', width: '20%'},
    {field: 'id', header: 'Acciones', width: '10%'},
  ];
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected  _ventaCabeceraRestSqljsService: VentaCabeceraRestSqljsService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _cargandoService: CargandoService,
    private readonly _auth0: Auth0Service,
    public matDialog: MatDialog,
    private  readonly _puntoEmisionOperarioRestService: PuntoEmisionOperarioRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _ventaCabeceraRestSqljsService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
  }

  async ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe( params => {
      try {
        this.ruta = RUTAS_CAJAS.rutaGestionVentas(true, false, []);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CAJAS.rutaMiCaja(false, true, []),
          RUTAS_CAJAS.rutaGestionVentas(false, true, []),
        ];
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
      } catch (e) {
        console.error(e);
      }
      this._cargandoService.deshabilitarCargando();
    });

  }

  async busquedaPersonalizada() {
    try {
      this.idOperario = await this.obtenerIdOperario();
      const consulta = {
        where: {
           estadoVenta: 'abierto',
          idOperarioOVendedor: this.idOperario,
         },
        skip: this.queryParams.skip,
        take: NUMERO_FILAS_TABLAS
      };
      const respuestaVentaCabeceras = await this._ventaCabeceraRestSqljsService.repository().findAndCount(consulta);
      this.totalRecords = respuestaVentaCabeceras[1];
      this.first = 0;
      this.values = respuestaVentaCabeceras[0];
    } catch (e) {
      console.error(e);
    }

  }

  cargarDatos(event?: any): void {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.llamarDatos(
      this.queryParams.skip,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
      'custom');
    this.loading = false;
  }

  async obtenerIdOperario() {
    const respuestaPuntoEmisionOperario = await this._puntoEmisionOperarioRestService.tengoCajaActiva().toPromise();
    if (respuestaPuntoEmisionOperario) {
      this.idOperario = respuestaPuntoEmisionOperario.operario.id;
    }
    return respuestaPuntoEmisionOperario.operario.id;
  }

  irRegistroVenta(idCabeceraVenta?: number) {
      const ruta = [
        'cajas', 'mi-caja' , 'gestion-ventas', 'registrar-venta', idCabeceraVenta
      ];
    this._router.navigate(ruta);
  }
}
