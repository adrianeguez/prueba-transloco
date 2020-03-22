import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ArticuloBodegaInterface} from '../../../../interfaces/articulo-bodega.interface';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_ARTICULOBODEGA} from '../definicion-rutas/rutas-articulo-bodega';
import {ArticuloBodegaRestService} from '../../../../servicios/rest/articulo-bodega-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {ESTADOSARTICULOBODEGA} from '../../constantes/estados-articulo-bodega';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../../../submodulo-empresa-front/modulos/edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_BODEGA} from '../../../../../submodulo-empresa-front/modulos/bodega/rutas/definicion-rutas/rutas-bodega';
import {BodegaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/bodega-rest.service';
import {MatDialog} from '@angular/material/dialog';
import {AnadirArticuloBodegaComponent} from '../../modales/anadir-articulo-bodega/anadir-articulo-bodega.component';

@Component({
  selector: 'ml-rutas-articulo-bodega',
  templateUrl: './rutas-articulo-bodega.component.html',
  styleUrls: ['./rutas-articulo-bodega.component.scss']
})
export class RutasArticuloBodegaComponent
  extends RutaConMigasDePanTablaBusqueda<ArticuloBodegaInterface, ArticuloBodegaRestService, ToasterService>
  implements OnInit {

  idEdificio;

  idEmpresa;

  idBodega;

  codigoArticulo;

  seleccionArticuloBodega: ArticuloBodegaInterface[];

  estados = ESTADOSARTICULOBODEGA;

  nombreModuloPadre;

  columnas = [
    {field: 'codigoArticulo', header: 'Producto'},
    {field: 'inventarioFinalCantidad', header: 'Cantidad'},
    {field: 'minimo', header: 'Estados'},
    {field: 'semaforo', header: 'Semáforo'},
  ];

  constructor(
    private readonly _bodegaService: BodegaRestService,
    private readonly _articuloBodegaService: ArticuloBodegaRestService,
    protected readonly _toasterService: ToasterService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    private _cargandoService: CargandoService,
    protected _router: Router,
    public dialog: MatDialog,
    protected _activatedRoute: ActivatedRoute,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _articuloBodegaService,
      _router,
      _toasterService,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    );
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      params => {
        this.idEmpresa = params.idEmpresa;
        this.idEdificio = params.idEdificio;
        this.idBodega = params.idBodega;
        this._bodegaService.findOne(this.idBodega).subscribe(
          bodega => {
            this.nombreModuloPadre = bodega.nombre;
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_ARTICULOBODEGA.rutaArticuloBodega(true, false, [
          this.idEmpresa,
          this.idEdificio,
          this.idBodega
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
          RUTAS_BODEGA.rutaGestionBodega(false, true, [
            this.idEmpresa,
            this.idEdificio,
          ]),
          RUTAS_ARTICULOBODEGA.rutaArticuloBodega(false, true, [
            this.idEmpresa,
            this.idEdificio,
            this.idBodega
          ]),
        ];
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where ? this.queryParams.where : {bodega: this.idBodega};
    this.queryParams.skip = event.first;
    this.llamarDatos(
      this.queryParams.skip,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations
    );
    this.loading = false;
  }

  recalculoPorArticulo() {
    try {
      if (this.seleccionArticuloBodega.length > 0) {
        this._cargandoService.habilitarCargando();
        this.seleccionArticuloBodega.map((valor) => {
          valor.bodega = +this.idBodega;
        });
        this._articuloBodegaService
          .recalculoPorArticulo(this.seleccionArticuloBodega)
          .subscribe(
            (resultado: Array<ArticuloBodegaInterface>) => {
              this._toasterService.pop('success',
                'Exito',
                'Se recalculo correctamente los artículos');
              this.values.map((dato, index) => {
                resultado.forEach((articuloActualizado) => {
                  if (dato.codigoArticulo === articuloActualizado.codigoArticulo) {
                    this.values.splice(index, 1, articuloActualizado);
                  }
                });
              });
              delete this.seleccionArticuloBodega;
              this._cargandoService.deshabilitarCargando();
            },
            error => {
              if (error.status === 400 || error.status === 500) {
                this._cargandoService.deshabilitarCargando();
                delete this.seleccionArticuloBodega;
                this._toasterService.pop('error',
                  'Fallo',
                  'No Existe kardex para los articulos');
                this.loading = false;
              } else {
                this._cargandoService.deshabilitarCargando();
                delete this.seleccionArticuloBodega;
                this._toasterService.pop(toastErrorConexionServidor);
                this.loading = false;
              }
            },
          );
      } else {
        this._toasterService.pop('error',
          'Fallo',
          'No se ha seleccionado ningún articulo');
      }
    } catch (e) {
      this._toasterService.pop('error',
        'Fallo',
        'No se ha seleccionado ningún articulo');
    }
  }

  buscarPorCodigoArticulo(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    const where = {
      codigoArticulo: `Like(\"%25${this.busqueda}%25\")`,
      bodega: this.idBodega,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      undefined,
      ['bodega'],
      this.tipoBusqueda);
  }

  abrirModalAnadirArticuloBodeg() {
    const dialogRef = this.dialog.open(AnadirArticuloBodegaComponent, {
      width: '1000px',
      data: {idEmpresa: this.idEmpresa,
      idEdificio: this.idEdificio,
      bodega: this.idBodega},
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: ArticuloBodegaInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      });

  }
}
