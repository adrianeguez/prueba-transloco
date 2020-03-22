import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { PisoRestService } from '../../../../servicios/rest/piso-rest.service';
import { CrearEditarPisoComponent } from '../../modales/crear-editar-piso/crear-editar-piso.component';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_EDIFICIO } from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import { RUTAS_PISO } from '../definicion-rutas/rutas-piso';
import { PisoInterface } from '../../../../interfaces/piso.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';
import { WIDTH_MODAL_PISO } from '../../constantes/tamanio-modal-piso';
import { EdificioRestService } from '../../../../servicios/rest/edificio-rest.service';

@Component({
  selector: 'ml-gestion-pisos',
  templateUrl: './ruta-gestion-pisos.component.html',
  styleUrls: ['./ruta-gestion-pisos.component.sass'],
})
export class RutaGestionPisosComponent
  extends RutaConMigasDePanTablaBusqueda<
    PisoInterface,
    PisoRestService,
    ToasterService
    >
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  idEdificio;

  idEmpresa;

  estados = ESTADOS;

  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];
  nombreModuloPadre;

  constructor(
    private readonly _edificioRestService: EdificioRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _pisoRestService: PisoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _pisoRestService,
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
      this.ruta = RUTAS_PISO.rutaGestionPiso(true, false, [
        this.idEmpresa,
        this.idEdificio,
      ]);
    });
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
      RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
      RUTAS_PISO.rutaGestionPiso(false, true, [
        this.idEmpresa,
        this.idEdificio,
      ]),
    ];
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : { edificio: this.idEdificio };
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

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    const where = {
      nombre: `Like(\"%25${this.busqueda}%25\")`,
      edificio: +this.idEdificio,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, undefined, this.tipoBusqueda);
  }

  abrirModalCrearPiso() {
    const dialogRef = this.dialog.open(CrearEditarPisoComponent, {
      width: WIDTH_MODAL_PISO,
      data: { idEdificio: this.idEdificio },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: PisoInterface) => {
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

  abrirModalEditarPiso(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarPisoComponent, {
      width: WIDTH_MODAL_PISO,
      data: { piso: registro },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: PisoInterface) => {
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
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._pisoRestService.updateOne(registro.id, { habilitado }).subscribe(
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
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  irAGestionModuloHijo(
    idPiso: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'edificio-modulo',
      this.idEdificio,
      'piso-modulo',
      idPiso,
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
      ? { habilitado: event, edificio: this.idEdificio }
      : { edificio: this.idEdificio };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, undefined, this.tipoBusqueda);
  }
}
