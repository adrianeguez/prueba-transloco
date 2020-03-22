import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
// tslint:disable-next-line:max-line-length
import { DepartamentoTrabajadorRestService } from '../../../../servicios/rest/departamento-trabajador-rest.service';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RUTAS_DEPARTAMENTO_EMPRESA } from '../../../departamento-empresa/rutas/definicion-rutas/rutas-departamento-empresa';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_DEPARTAMENTO_TRABAJADOR } from '../definicion-rutas/rutas-departamento-trabajador';
// tslint:disable-next-line:max-line-length
import { CrearEditarDepartamentoTrabajadorComponent } from '../../modales/crear-editar-departamento-trabajador/crear-editar-departamento-trabajador.component';
import { DepartamentoTrabajadorInterface } from '../../../../interfaces/departamento-trabajador.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';
import { WIDTH_MODAL_DEPARTAMENTO_TRABAJADOR } from '../../constantes/tamanio-modal-departamento-trabajador';
import { DepartamentoEmpresaRestService } from '../../../../servicios/rest/departamento-empresa-rest.service';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';

@Component({
  selector: 'ml-gestion-departamentos-trabajador',
  templateUrl: './ruta-gestion-departamentos-trabajador.component.html',
  styleUrls: ['./ruta-gestion-departamentos-trabajador.component.sass'],
})
export class RutaGestionDepartamentoTrabajadorComponent
  extends RutaConMigasDePanTablaBusqueda<
    DepartamentoTrabajadorInterface,
    DepartamentoTrabajadorRestService,
    ToasterService
  >
  implements OnInit {
  idEmpresa;

  idDepartamentoEmpresa;

  rows = NUMERO_FILAS_TABLAS;

  columnas = [
    { field: 'nombres', header: 'Nombres' },
    { field: 'apellidos', header: 'Apellidos' },
    { field: 'identificacionPais', header: 'Identificación' },
    { field: 'tipoCargo', header: 'Cargo' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];
  estados = ESTADOS;

  nombreModulPadre;

  constructor(
    private readonly _departamentoEmpresaRestService: DepartamentoEmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _departamentoTrabajadorRestService: DepartamentoTrabajadorRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _departamentoTrabajadorRestService,
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
      this.tipoBusqueda
    );
    this.loading = false;
  }
  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      params => {
        this._cargandoService.deshabilitarCargando();
        this.idEmpresa = params.idEmpresa;
        this.idDepartamentoEmpresa = params.idDepartamentoEmpresa;
        this._departamentoEmpresaRestService
          .findOne(this.idDepartamentoEmpresa)
          .subscribe(departamento => {
            this.nombreModulPadre = departamento.nombre;
          });
        this.ruta = RUTAS_DEPARTAMENTO_TRABAJADOR.rutaGestionDepartamentoTrabajador(
          true,
          false,
          [this.idEmpresa, this.idDepartamentoEmpresa],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_DEPARTAMENTO_EMPRESA.rutaGestionDepartamentoEmpresa(
            false,
            true,
            [this.idEmpresa],
          ),
          RUTAS_DEPARTAMENTO_TRABAJADOR.rutaGestionDepartamentoTrabajador(
            false,
            true,
            [this.idDepartamentoEmpresa],
          ),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { departamentoEmpresa: this.idDepartamentoEmpresa };
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : ['contactoEmpresa', 'contactoEmpresa.datosUsuario', 'tipoCargo'];
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

  abrirModalCrearDepartamentoTrabajador() {
    const dialogRef = this.dialog.open(
      CrearEditarDepartamentoTrabajadorComponent,
      {
        width: WIDTH_MODAL_DEPARTAMENTO_TRABAJADOR,
        data: {
          idDepartamentoEmpresa: this.idDepartamentoEmpresa,
          idEmpresa: this.idEmpresa,
        },
      },
    );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: DepartamentoTrabajadorInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorCrear);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  abrirModalEditarDepartamentoTrabajador(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(
      CrearEditarDepartamentoTrabajadorComponent,
      {
        width: WIDTH_MODAL_DEPARTAMENTO_TRABAJADOR,
        data: { departamentoTrabajador: registro, idEmpresa: this.idEmpresa },
      },
    );
    dialogRef.afterClosed().subscribe(
      (registroEditado: DepartamentoTrabajadorInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._departamentoTrabajadorRestService
      .updateOne(registro.id, { habilitado })
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
          this._toasterService.pop(toastErrorEditar);
          this._cargandoService.deshabilitarCargando();
        },
      );
  }

  buscarPorNombreaApellidosCargo(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    if (this.busqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        { departamentoEmpresa: this.idDepartamentoEmpresa },
        undefined,
        undefined,
        undefined,
        ['contactoEmpresa', 'contactoEmpresa.datosUsuario', 'tipoCargo'],
        this.tipoBusqueda
      );
    } else {
      console.log(busqueda);
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        { campo: 'campo', valor: this.busqueda },
      ];
      this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
    }
  }

  escucharTipoCargoSeleccionado(evento) {
    this.optionalParams = { registroActual: undefined };
    this.tipoBusqueda = 'findAll';
    const where = {
      tipoCargo: evento,
      departamentoEmpresa: this.idDepartamentoEmpresa,
    };
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'contactoEmpresa',
      'contactoEmpresa.datosUsuario',
      'tipoCargo',
    ], this.tipoBusqueda);
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    this._departamentoTrabajadorRestService
      .obtenerTrabajadoresPorCargoOApellidos({
        busqueda: this.busqueda
          ? this.busqueda
          : this.queryParams.camposABuscar[0].valor,
        skip: this.queryParams.skip,
        take: NUMERO_FILAS_TABLAS,
        idDepartamentoEmpresa: this.idDepartamentoEmpresa,
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

  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? { habilitado: event, departamentoEmpresa: this.idDepartamentoEmpresa }
      : { departamentoEmpresa: this.idDepartamentoEmpresa };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'contactoEmpresa',
      'contactoEmpresa.datosUsuario',
      'tipoCargo',
    ], this.tipoBusqueda);
  }
}
