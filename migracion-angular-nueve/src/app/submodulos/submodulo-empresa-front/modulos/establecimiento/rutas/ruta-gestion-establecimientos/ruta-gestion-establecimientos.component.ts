import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {CrearEditarEstablecimientoComponent} from '../../modales/crear-editar-establecimiento/crear-editar-establecimiento.component';
// tslint:disable-next-line:max-line-length
import {EstablecimientoRestService} from '../../../../servicios/rest/establecimiento-rest.service';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../definicion-rutas/rutas-establecimiento';
import {EstablecimientoInterface} from '../../../../interfaces/establecimiento.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {ESTADOS} from '../../../../../../enums/estados';
import {WIDTH_MODAL_ESTABLECIMIENTO} from '../../constantes/tamanio-modal-establecimiento';
import {EdificioRestService} from '../../../../servicios/rest/edificio-rest.service';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';

@Component({
  selector: 'ml-gestion-establecimientos',
  templateUrl: './ruta-gestion-establecimientos.component.html',
  styleUrls: ['./ruta-gestion-establecimientos.component.sass'],
})
export class RutaGestionEstablecimientosComponent
  extends RutaConMigasDePanTablaBusqueda<EstablecimientoInterface,
    EstablecimientoRestService,
    ToasterService>
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  idEdificio;

  idEmpresa;

  columnas = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'codigo', header: 'Codigo'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];

  estados = ESTADOS;

  nombreModuloPadre;

  constructor(
    private readonly _edificioRestService: EdificioRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _establecimientoRestService: EstablecimientoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _establecimientoRestService,
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
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_ESTABLECIMIENTO.rutaGestionEstablecimiento(
          true,
          false,
          [
            this.idEmpresa,
            this.idEdificio],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [
            this.idEmpresa]),
          RUTAS_ESTABLECIMIENTO.rutaGestionEstablecimiento(false, true, [
            this.idEmpresa,
            this.idEdificio,
          ]),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : {edificio: this.idEdificio};
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

  buscarPorNombreCodigo(busqueda: string) {
    this.busqueda = busqueda.trim();
    const where = [
      {
        nombre: `Like(\"%25${this.busqueda}%25\")`,
        edificio: +this.idEdificio,
      },
      {
        codigo: `Like(\"%25${this.busqueda}%25\")`,
        edificio: +this.idEdificio,
      },
    ];
    this.optionalParams = {registroActual: undefined};
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, undefined, this.tipoBusqueda);
  }

  abrirModalCrearEstablecimiento() {
    const dialogRef = this.dialog.open(CrearEditarEstablecimientoComponent, {
      width: WIDTH_MODAL_ESTABLECIMIENTO,
      data: {idEdificio: this.idEdificio},
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: EstablecimientoInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastErrorCrear);
      },
    );
  }

  abrirModalEditarEstablecimiento(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarEstablecimientoComponent, {
      width: WIDTH_MODAL_ESTABLECIMIENTO,
      data: {establecimiento: registro},
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: EstablecimientoInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastExitoEditar);
      },
    );
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    this._establecimientoRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoEditar);
        },
      );
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = {registroActual: undefined};
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? {habilitado: event, edificio: this.idEdificio}
      : {edificio: this.idEdificio};
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, undefined, this.tipoBusqueda);
  }

  irAGestionModuloHijo(
    idEstablecimiento: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'edificio-modulo',
      this.idEdificio,
      'establecimiento-modulo',
      idEstablecimiento,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }

  irAGestionServicios(establecimiento: any) {
    const rutaServicio = RUTAS_SERVICIO_ESTABLECIMIENTO.rutaGestionServicio(
      false,
      true,
      [
        this.idEmpresa,
        this.idEdificio,
        establecimiento.id,
      ]
    ).ruta;
    this._router.navigate(rutaServicio);
  }
}
