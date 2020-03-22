import { Component, OnInit } from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {EstablecimientoRestService} from '../../../../servicios/rest/establecimiento-rest.service';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material/dialog';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {AdministradorEstablecimientoInterface} from '../../../../interfaces/administrador-establecimiento.interface';
import {AdministradorEstablecimientoRestService} from '../../../../servicios/rest/administrador-establecimiento-rest.service';
import {RUTAS_ADMINISTRADOR_ESTABLECIMIENTO} from '../definicion-rutas/rutas-administrador-establecimiento';
import {toastErrorCrear, toastErrorEditar, toastExitoEditar} from '../../../../../../constantes/mensajes-toaster';
import {WIDTH_MODAL_ADMINISTRADOR_ESTABLECIMIENTO} from '../../constantes/tamanio-modal-administrador-establecimiento';
import {CrearEditarAdministradorComponent} from '../../modales/crear-editar-administrador/crear-editar-administrador.component';

@Component({
  selector: 'ml-ruta-gestion-administradores-establecimiento',
  templateUrl: './ruta-gestion-administradores-establecimiento.component.html',
  styleUrls: ['./ruta-gestion-administradores-establecimiento.component.scss']
})
export class RutaGestionAdministradoresEstablecimientoComponent extends
  RutaConMigasDePanTablaBusqueda<AdministradorEstablecimientoInterface, AdministradorEstablecimientoRestService, ToasterService> implements OnInit {

  rows = NUMERO_FILAS_TABLAS;

  idEdificio;

  idEmpresa;

  idEstablecimiento;

  estados = ESTADOS;

  columnas = [
    { field: 'nombreContacto', header: 'Nombres' },
    { field: 'documentoContacto', header: 'Documento' },
    { field: 'gestionaPtoEmision', header: 'Gestion Pto. Emision' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];
  nombreModuloPadre;

  constructor(
    private readonly _establecimientoRestService: EstablecimientoRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _administradorEstablecimientoRestService: AdministradorEstablecimientoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _administradorEstablecimientoRestService,
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
      this.ruta = RUTAS_ADMINISTRADOR_ESTABLECIMIENTO.rutaGestionAdministadorEstablecimiento(true, false, [
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
      RUTAS_ADMINISTRADOR_ESTABLECIMIENTO.rutaGestionAdministadorEstablecimiento(false, true, [
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
        : ['contactoEmpresa', 'contactoEmpresa.datosUsuario'];
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

  buscarPorNombreDocumentoContacto(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    const where = [
      {
        nombreContacto: `Like(\"%25${this.busqueda}%25\")`,
        establecimiento: this.idEstablecimiento,
      },
      {
        documentoContacto: `Like(\"%25${this.busqueda}%25\")`,
        establecimiento: this.idEstablecimiento,
      },
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, ['contactoEmpresa', 'contactoEmpresa.datosUsuario'], this.tipoBusqueda);
  }

  abrirModalCrearAdministradorEstablecimiento() {
    const dialogRef = this.dialog.open(CrearEditarAdministradorComponent, {
      width: WIDTH_MODAL_ADMINISTRADOR_ESTABLECIMIENTO,
      data: { idEstablecimiento: this.idEstablecimiento},
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: AdministradorEstablecimientoInterface) => {
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

  abrirModalEditarAdministradorEstablecimiento(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarAdministradorComponent, {
      width: WIDTH_MODAL_ADMINISTRADOR_ESTABLECIMIENTO,
      data: { administradorEstablecimiento: registro, idEstablecimiento: this.idEstablecimiento },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: AdministradorEstablecimientoInterface) => {
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
    const administrador: AdministradorEstablecimientoInterface = {};
    administrador[campo] = registro[campo] === 0;
    this._administradorEstablecimientoRestService
      .updateOne(registro.id, administrador)
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice][campo] = administrador[campo] ? 1 : 0;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? { habilitado: event, establecimiento: this.idEstablecimiento }
      : { establecimiento: this.idEstablecimiento };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, ['contactoEmpresa', 'contactoEmpresa.datosUsuario'], this.tipoBusqueda);
  }
}
