import { Component, OnInit } from '@angular/core';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_EDIFICIO } from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import { PuntoEmisionInterface } from '../../../../interfaces/punto-emision.interface';
import { PuntoEmisionRestService } from '../../../../servicios/rest/punto-emision-rest.service';
import { EstablecimientoRestService } from '../../../../servicios/rest/establecimiento-rest.service';
import { RUTAS_PUNTOS_EMISION } from '../definicion-rutas/rutas-punto-emision';
import { RUTAS_ESTABLECIMIENTO } from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { CrearEditarPuntoEmisionComponent } from '../../modales/crear-editar-punto-emision/crear-editar-punto-emision.component';
import { WIDTH_MODAL_PUNTO_EMISION } from '../../constantes/tamanio-modal-punto-emision';

@Component({
  selector: 'ml-ruta-gestion-puntos-emision',
  templateUrl: './ruta-gestion-puntos-emision.component.html',
  styleUrls: ['./ruta-gestion-puntos-emision.component.scss'],
})
export class RutaGestionPuntosEmisionComponent
  extends RutaConMigasDePanTablaBusqueda<
    PuntoEmisionInterface,
    PuntoEmisionRestService,
    ToasterService
  >
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  idEdificio;

  idEmpresa;

  idEstablecimiento;

  estados = ESTADOS;

  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'codigo', header: 'Código' },
    { field: 'secuencialActual', header: 'Secuencial actual' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];
  nombreModuloPadre;

  constructor(
    private readonly _establecimientoRestService: EstablecimientoRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _puntoEmisionRestService: PuntoEmisionRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _puntoEmisionRestService,
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
    this._activatedRoute.params.subscribe(params => {
      this.idEmpresa = +params.idEmpresa;
      this.idEdificio = +params.idEdificio;
      this.idEstablecimiento = +params.idEstablecimiento;
      this._establecimientoRestService
        .findOne(this.idEstablecimiento)
        .subscribe(
          establecimiento => {
            this.nombreModuloPadre = establecimiento.nombre;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
      this.ruta = RUTAS_PUNTOS_EMISION.rutaGestionPuntoEmision(true, false, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
      ]);
    });
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
      RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
      RUTAS_ESTABLECIMIENTO.rutaGestionEstablecimiento(false, true, [
        this.idEmpresa,
        this.idEdificio,
      ]),
      RUTAS_PUNTOS_EMISION.rutaGestionPuntoEmision(false, true, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
      ]),
    ];
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : { establecimiento: this.idEstablecimiento };
    this.queryParams.relations =
      this.queryParams.relations.length > 0
        ? this.queryParams.relations
        : ['bodega'];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
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

  buscarPorNombreCodigo(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    const where = [
      {
        nombre: `Like(\"%25${this.busqueda}%25\")`,
        establecimiento: this.idEstablecimiento,
        relaions: ['bodega'],
      },
      {
        codigo: `Like(\"%25${this.busqueda}%25\")`,
        establecimiento: this.idEstablecimiento,
        relaions: ['bodega'],
      },
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, ['bodega'], this.tipoBusqueda);
  }

  abrirModalCrearPuntoEmision() {
    const dialogRef = this.dialog.open(CrearEditarPuntoEmisionComponent, {
      width: WIDTH_MODAL_PUNTO_EMISION,
      data: { idEstablecimiento: this.idEstablecimiento, idEdificio: this.idEdificio  },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: PuntoEmisionInterface) => {
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

  abrirModalEditarPuntoEmision(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarPuntoEmisionComponent, {
      width: WIDTH_MODAL_PUNTO_EMISION,
      data: { puntoEmision: registro, idEdificio: this.idEdificio },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: PuntoEmisionInterface) => {
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

  actualizarCampo(registro, campo: string) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const puntoEmision: PuntoEmisionInterface = {};
    puntoEmision[campo] = registro[campo] === 0;
    this._puntoEmisionRestService
      .updateOne(registro.id, puntoEmision)
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice][campo] = puntoEmision[campo] ? 1 : 0;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  irAGestionModuloHijo(
    idPuntosEmision: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'edificio-modulo',
      this.idEdificio,
      'establecimiento-modulo',
      this.idEstablecimiento,
      'punto-emision-modulo',
      idPuntosEmision,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }
  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? { habilitado: event, establecimiento: this.idEstablecimiento }
      : { establecimiento: this.idEstablecimiento };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, ['bodega'], this.tipoBusqueda);
  }
}
