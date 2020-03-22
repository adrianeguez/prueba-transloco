import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { BodegaRestService } from '../../../../servicios/rest/bodega-rest.service';
import { CrearEditarBodegaComponent } from '../../modales/crear-editar-bodega/crear-editar-bodega.component';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { RUTAS_EDIFICIO } from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_BODEGA } from '../definicion-rutas/rutas-bodega';
import { OPCIONES_FILTER_ES_PERCHA } from '../../constantes/opciones-filter-es-percha';
import { BodegaInterface } from '../../../../interfaces/bodega.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';
import { WIDTH_MODAL_BODEGA } from '../../constantes/tamanio-modal-bodega';
import { EdificioRestService } from '../../../../servicios/rest/edificio-rest.service';

@Component({
  selector: 'ml-gestion-bodegas',
  templateUrl: './ruta-gestion-bodegas.component.html',
  styleUrls: ['./ruta-gestion-bodegas.component.sass'],
})
export class RutaGestionBodegasComponent
  extends RutaConMigasDePanTablaBusqueda<
    BodegaInterface,
    BodegaRestService,
    ToasterService
  >
  implements OnInit {
  camposABuscar = [];

  rows = NUMERO_FILAS_TABLAS;

  idEdificio;

  idEmpresa;

  idBodega;

  opcionesDropdown = OPCIONES_FILTER_ES_PERCHA;

  estados = ESTADOS;

  columnas = [
    { field: 'nombre', header: 'Nombre', width: '20%' },
    { field: 'codigo', header: 'Código', width: '10%' },
    { field: 'direccion', header: 'Dirección', width: '20%' },
    { field: 'esPercha', header: 'Es Percha', width: '10%' },
    { field: 'administrador', header: 'Administrador', width: '15%' },
    { field: 'habilitado', header: 'Estado', width: '10%' },
    { field: 'id', header: 'Acciones', width: '15%' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _edificioRestService: EdificioRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _bodegaRestService: BodegaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _bodegaRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
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
        this._edificioRestService.findOne(this.idEdificio).subscribe(
          edificio => {
            this.nombreModuloPadre = edificio.nombre;
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_BODEGA.rutaGestionBodega(true, false, [
          this.idEmpresa,
          this.idEdificio
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
          RUTAS_BODEGA.rutaGestionBodega(false, true, [
            this.idEmpresa,
            this.idEdificio,
          ]),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { edificio: this.idEdificio };
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : ['contactoEmpresa', 'contactoEmpresa.datosUsuario'];
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
    this.queryParams.skip = event.first;
    this.llamarDatos(
      this.queryParams.skip,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
      this.tipoBusqueda
    );
    this.loading = false;
  }

  irAGestionModuloHijo(
    idBodega: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'edificio-modulo',
      this.idEdificio,
      'bodega-modulo',
      idBodega,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }

  abrirModalCrearBodega() {
    const dialogRef = this.dialog.open(CrearEditarBodegaComponent, {
      width: WIDTH_MODAL_BODEGA,
      data: { idEdificio: this.idEdificio, idEmpresa: this.idEmpresa },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: BodegaInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastExitoCrear);
      },
    );
  }

  abrirModalEditarBodega(registro) {
    this.optionalParams = { registroActual: undefined };
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarBodegaComponent, {
      width: WIDTH_MODAL_BODEGA,
      data: { bodega: registro, idEmpresa: this.idEmpresa },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: BodegaInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  actualizarEstado(registro) {
    this.optionalParams = { registroActual: undefined };
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._bodegaRestService.updateOne(registro.id, { habilitado }).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this.values[indice].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
        this._toasterService.pop(toastExitoEditar);
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  buscarPorNombreCodigo(busqueda: string) {
    this.optionalParams = { registroActual: undefined };
    this.busqueda = busqueda.trim();
    if (this.busqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        {
          edificio: this.idEdificio,
        },
        undefined,
        undefined,
        undefined,
        ['contactoEmpresa', 'contactoEmpresa.datosUsuario'],
        this.tipoBusqueda
      );
    } else {
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        { campo: 'campo', valor: `%25${this.busqueda}%25` },
      ];
      this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const datos = {
      busqueda: this.busqueda
        ? this.busqueda
        : this.queryParams.camposABuscar[0].valor,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
      idEdificio: this.idEdificio,
    };
    this._bodegaRestService.buscarBodegasContactoEmpresa(datos).subscribe(
      (resultado: [BodegaInterface[], number]) => {
        this._cargandoService.deshabilitarCargando();
        this.values = resultado[0];
        this.totalRecords = resultado[1];
        this.first = 0;
        this.loading = false;
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastErrorConexionServidor);
        this.loading = false;
      },
    );
  }

  enviarOpcionSeleccionada(event) {
    this.optionalParams = { registroActual: undefined };
    const seSeleccionoOpcion = event.value === 1 || event.value === 0;
    const where = seSeleccionoOpcion
      ? {
          esPercha: event.value,
          edificio: this.idEdificio,
        }
      : {
          edificio: this.idEdificio,
        };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'contactoEmpresa',
      'contactoEmpresa.datosUsuario',
    ],
      this.tipoBusqueda);
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const where = {
      habilitado: event === 1 || event === 0 ? event : undefined,
      edificio: this.idEdificio,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order);
  }

  escucharEsPerchaSeleccionado(esPercha) {
    this.optionalParams = { registroActual: undefined };
    const where = {
      esPercha: esPercha === 1 || esPercha === 0 ? esPercha : undefined,
      edificio: this.idEdificio,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'contactoEmpresa',
      'contactoEmpresa.datosUsuario',
    ]);
  }
}
