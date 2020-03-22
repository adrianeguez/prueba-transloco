import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { AreaTrabajadorRestService } from '../../../../servicios/rest/area-trabajador-rest.service';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_AREA_TRABAJADOR } from '../definicion-rutas/rutas-area-trabajador';
import { RUTAS_EDIFICIO } from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import { RUTAS_PISO } from '../../../piso/rutas/definicion-rutas/rutas-piso';
import { RUTAS_AREA_PISO } from '../../../area-piso/rutas/definicion-rutas/rutas-area-piso';
import { CrearEditarAreaTrabajadorComponent } from '../../modales/crear-editar-area-trabajador/crear-editar-area-trabajador.component';
import { AreaTrabajadorInterface } from '../../../../interfaces/area-trabajador.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoCrear,
} from '../../../../../../constantes/mensajes-toaster';
import { WIDTH_MODAL_AREA_TRABAJADOR } from '../../constantes/tamanio-modal-area-trabajador';
import { AreaPisoRestService } from '../../../../servicios/rest/area-piso-rest.service';
import { AreaPisoInterface } from '../../../../interfaces/area-piso.interface';

@Component({
  selector: 'ml-ruta-gestion-areas-trabajador',
  templateUrl: './ruta-gestion-areas-trabajador.component.html',
  styleUrls: ['./ruta-gestion-areas-trabajador.component.sass'],
})
export class RutaGestionAreasTrabajadorComponent
  extends RutaConMigasDePanTablaBusqueda<
    AreaTrabajadorInterface,
    AreaTrabajadorRestService,
    ToasterService
  >
  implements OnInit {
  idEmpresa;

  idEdificio;

  idPiso;

  idAreaPiso;

  rows = NUMERO_FILAS_TABLAS;

  columnas = [
    { field: 'nombres', header: 'Nombres' },
    { field: 'apellidos', header: 'Apellidos' },
    { field: 'identificacionPais', header: 'Identificación' },
    { field: 'descripcionUbicacion', header: 'Ubicación' },
    { field: 'id', header: 'Acciones' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _areaPisoRestService: AreaPisoRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _areaTrabajadorRestService: AreaTrabajadorRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _areaTrabajadorRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
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
      this.tipoBusqueda,
    );
    this.loading = false;
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      params => {
        this._cargandoService.deshabilitarCargando();
        this.idEmpresa = params.idEmpresa;
        this.idEdificio = params.idEdificio;
        this.idAreaPiso = params.idAreaPiso;
        this.idPiso = params.idPiso;
        this._areaPisoRestService.findOne(this.idAreaPiso).subscribe(
          (areaPiso: AreaPisoInterface) => {
            this.nombreModuloPadre = areaPiso.nombre;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_AREA_TRABAJADOR.rutaGestionAreaTrabajador(
          true,
          false,
          [this.idEmpresa, this.idEdificio, this.idPiso, this.idAreaPiso],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
          RUTAS_PISO.rutaGestionPiso(false, true, [
            this.idEmpresa,
            this.idEdificio,
          ]),
          RUTAS_AREA_PISO.rutaGestionAreaPiso(false, true, [
            this.idEmpresa,
            this.idEdificio,
            this.idPiso,
          ]),
          RUTAS_AREA_TRABAJADOR.rutaGestionAreaTrabajador(false, true, [
            this.idEmpresa,
            this.idEdificio,
            this.idPiso,
            this.idAreaPiso,
          ]),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { areaPiso: this.idAreaPiso };
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : ['contactoEmpresa', 'contactoEmpresa.datosUsuario'];
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  abrirModalCrearAreaTrabajador() {
    const dialogRef = this.dialog.open(CrearEditarAreaTrabajadorComponent, {
      width: WIDTH_MODAL_AREA_TRABAJADOR,
      data: { idAreaPiso: this.idAreaPiso, idEmpresa: this.idEmpresa },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: AreaTrabajadorInterface) => {
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

  abrirModalEditarAreaTrabajador(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarAreaTrabajadorComponent, {
      width: WIDTH_MODAL_AREA_TRABAJADOR,
      data: { areaTrabajador: registro, idEmpresa: this.idEmpresa },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: AreaTrabajadorInterface) => {
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

  buscarPorIdentificacionApellidosUbicacion(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    if (this.busqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        { areaPiso: this.idAreaPiso },
        undefined,
        undefined,
        undefined,
        ['contactoEmpresa', 'contactoEmpresa.datosUsuario'],
        this.tipoBusqueda
      );
    } else {
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        { campo: 'cargo', valor: this.busqueda },
      ];
      this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    this._areaTrabajadorRestService
      .obtenerTrabajadoresPoIdentificacionApellidosUbicacion({
        busqueda: this.busqueda
          ? this.busqueda
          : this.queryParams.camposABuscar[0].valor,
        skip: this.queryParams.skip,
        take: NUMERO_FILAS_TABLAS,
        idAreaPiso: this.idAreaPiso,
      })
      .subscribe(
        resultado => {
          this._cargandoService.deshabilitarCargando();
          this.values = resultado[0];
          this.totalRecords = resultado[1];
          this.first = 0;
          this.loading = false;
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
          this.loading = false;
        },
      );
  }
}
