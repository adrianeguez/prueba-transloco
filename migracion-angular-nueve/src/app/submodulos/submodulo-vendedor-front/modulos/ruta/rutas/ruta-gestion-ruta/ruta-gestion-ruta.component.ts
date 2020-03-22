import { Component, OnInit } from '@angular/core';
import { RutaConMigasDePanTablaBusqueda } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RUTAS_RUTA } from '../definicion-rutas/rutas-ruta-vendedor';
import { MigaDePanInterface } from 'man-lab-ng/rutas/interfaces/miga-de-pan-interface';
import { CrearEditarRutaVendedorComponent } from '../../modales/crear-editar-ruta-vendedor/crear-editar-ruta-vendedor.component';
import { RutaInterface } from '../../../../interfaces/ruta-interface';
import { RutaRestService } from '../../../../servicios/rest/ruta-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { RUTAS_EMPRESA } from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import { EmpresaRestService } from '../../../../../submodulo-empresa-front/servicios/rest/empresa-rest.service';

@Component({
  selector: 'ml-ruta-gestion-ruta',
  templateUrl: './ruta-gestion-ruta.component.html',
  styleUrls: ['./ruta-gestion-ruta.component.scss'],
})
export class RutaGestionRutaComponent
  extends RutaConMigasDePanTablaBusqueda<
    RutaInterface,
    RutaRestService,
    ToasterService
  >
  implements OnInit {
  idEmpresa: number;
  nombrePapa: string;
  estados = ESTADOS;
  columnas = [
    { field: 'lugar', header: 'Lugar' },
    { field: 'nombre', header: 'Zona' },
    { field: 'bodega', header: 'Bodega' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected _rutaVendedorRestService: RutaRestService,
    private readonly _empresaRestService: EmpresaRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _rutaVendedorRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
    this.queryParams.relations =
      this.queryParams.relations.length > 0
        ? this.queryParams.relations
        : ['lugar', 'bodega'];
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      parametro => {
        this.idEmpresa = +parametro.idEmpresa;
        this._empresaRestService.findOne(this.idEmpresa).subscribe(
          r => {
            this.nombrePapa = r.razonSocial;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_RUTA.rutaGestionRutas(true, false, [this.idEmpresa]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_RUTA.rutaGestionRutas(false, true, [this.idEmpresa]),
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
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : { empresa: this.idEmpresa };
    this.queryParams.relations =
      this.queryParams.relations.length > 0
        ? this.queryParams.relations
        : ['lugar', 'bodega'];
    this.queryParams.skip = event.first;
    this.llamarDatos(
      event.first,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
    );

    this.loading = false;
  }

  buscarPorNombre(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    if (valorBusqueda === '') {
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        { empresa: this.idEmpresa },
        undefined,
        undefined,
        this.queryParams.order,
        ['lugar'],
        this.tipoBusqueda,
      );
    } else {
      this.busqueda = valorBusqueda;
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = {
        busqueda: valorBusqueda,
        idEmpresa: this.idEmpresa,
        skip: this.queryParams.skip,
        take: NUMERO_FILAS_TABLAS,
      };
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        this.queryParams.order,
        undefined,
        this.tipoBusqueda,
      );
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    this._rutaVendedorRestService
      .buscarRutaLugarPorNombre(this.queryParams.camposABuscar)
      .subscribe(
        (resultado: [any[], number]) => {
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

  escucharEstadoSeleccionado(value) {
    this.optionalParams = { registroActual: undefined };
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      empresa: this.idEmpresa,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }

  actualizarEstado(registro: RutaInterface) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._rutaVendedorRestService
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
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  abrirModalCrearZonaVendedor() {
    const dialogRef = this.dialog.open(CrearEditarRutaVendedorComponent, {
      width: '950px',
      data: {
        rutaVendedor: undefined,
        idEmpresa: this.idEmpresa,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: RutaInterface) => {
      if (registroCreado) {
        this.optionalParams = { registroActual: registroCreado.id };
        this.values.unshift(registroCreado);
        this.rows = this.rows + 1;
        this.optionalParams.registroActual = registroCreado.id;
      }
    });
  }

  abrirModalEditarZonaVendedor(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarRutaVendedorComponent, {
      width: '950px',
      data: {
        rutaVendedor: registro,
        idEmpresa: this.idEmpresa,
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: RutaInterface) => {
      if (registroEditado) {
        this.optionalParams = { registroActual: registroEditado.id };
        this.values[indiceRegistro] = registroEditado;
        this.optionalParams.registroActual = registroEditado.id;
      }
    });
  }
}
