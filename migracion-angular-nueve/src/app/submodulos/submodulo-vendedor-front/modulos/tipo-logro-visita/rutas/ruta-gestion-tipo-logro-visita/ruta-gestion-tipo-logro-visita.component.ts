import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { TipoLogroVisitaInterface } from '../../../../interfaces/tipo-logro-visita-interface';
import { TipoLogroVisitaRestService } from '../../../../servicios/rest/tipo-logro-visita-rest.service';
import { CrearEditarTipoLogroVisitaComponent } from '../../modales/crear-editar-tipo-logro-visita/crear-editar-tipo-logro-visita.component';
import { RUTAS_TIPOS_LOGROS_VISITA } from '../definicion-rutas/rutas-tipo-logro-visita';
import { RUTAS_EMPRESA } from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import { EmpresaRestService } from '../../../../../submodulo-empresa-front/servicios/rest/empresa-rest.service';

@Component({
  selector: 'ml-ruta-gestion-tipo-logro-visita',
  templateUrl: './ruta-gestion-tipo-logro-visita.component.html',
  styleUrls: ['./ruta-gestion-tipo-logro-visita.component.scss'],
})
export class RutaGestionTipoLogroVisitaComponent
  extends RutaConMigasDePanTablaBusqueda<
    TipoLogroVisitaInterface,
    TipoLogroVisitaRestService,
    ToasterService
  >
  implements OnInit {
  idEmpresa: number;
  nombrePapa: string;
  idLogroVisita: number;
  estados = ESTADOS;
  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
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
    private readonly _tipoLogroVisitaRestService: TipoLogroVisitaRestService,
    private readonly _empresaRestService: EmpresaRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _tipoLogroVisitaRestService,
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
      parametros => {
        this.idEmpresa = +parametros.idEmpresa;
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
        this.ruta = RUTAS_TIPOS_LOGROS_VISITA.rutaGestionTipoLogroVisita(
          true,
          false,
          [this.idEmpresa],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_TIPOS_LOGROS_VISITA.rutaGestionTipoLogroVisita(false, true, [
            this.idEmpresa,
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
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : { empresa: this.idEmpresa };
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
    this.optionalParams = {registroActual: undefined};
    this.optionalParams = { registroActual: undefined };
    const where = [
      {
        nombre: `Like(\"%25${valorBusqueda}%25\")`,
        empresa: this.idEmpresa,
      },
    ];
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

  actualizarEstado(registro: TipoLogroVisitaInterface) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._tipoLogroVisitaRestService
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

  abrirModalCrearTipoLogroVisita() {
    const dialogRef = this.dialog.open(CrearEditarTipoLogroVisitaComponent, {
      width: '850px',
      data: {
        tipoLogroVisita: undefined,
        idEmpresa: this.idEmpresa,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroCreado: TipoLogroVisitaInterface) => {
        if (registroCreado) {
          this.optionalParams = { registroActual: registroCreado.id };
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      });
  }

  abrirModalEditarTipoLogroVisita(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarTipoLogroVisitaComponent, {
      width: '850px',
      data: { tipoLogroVisita: registro },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: TipoLogroVisitaInterface) => {
        if (registroEditado) {
          this.optionalParams = { registroActual: registroEditado.id };
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      });
  }
}
