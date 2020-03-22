import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {TarifaRestService} from '../../../../servicios/rest/tarifa-rest.service';
import {RUTAS_TIPOS_IMPUESTOS} from '../../../tipo-impuesto/rutas/definicion-rutas/rutas-tipo-impuesto';
import {RUTAS_TARIFA} from '../definicion-rutas/rutas-tarifas';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar
} from '../../../../../../constantes/mensajes-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from './../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {TarifaInterface} from './../../../../interfaces/tarifa.interface';
import {RUTAS_MENU_ARTICULO} from './../../../../ruta/definicion-rutas/rutas-menu';
import {TipoImpuestoRestService} from './../../../../servicios/rest/tipo-impuesto-rest.service';
import {WIDTH_MODAL_TARIFA} from './../../constantes/tamanio-modal-tarifa';
import {CrearEditarTarifaComponent} from './../../modales/crear-editar-tarifa/crear-editar-tarifa.component';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-tarifa',
  templateUrl: './ruta-gestion-tarifa.component.html',
  styleUrls: ['./ruta-gestion-tarifa.component.sass'],
})
export class RutaGestionTarifaComponent
  extends RutaConMigasDePanTablaBusqueda<TarifaInterface,
    TarifaRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  estados = ESTADOS;
  idTipoImpuesto: number;
  rows = NUMERO_FILAS_TABLAS;
  columnas = [
    {field: 'codigoSri', header: 'Codigo Sri'},
    {field: 'codigo', header: 'Codigo'},
    {field: 'nombre', header: 'Nombre'},
    {field: 'unidadMedida', header: 'Unidad Medida'},
    {field: 'cantidad', header: 'Cantidad'},
    {field: 'valorPorcentaje', header: 'Valor Porcentaje'},
    {field: 'valor', header: 'Valor'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected dialog: MatDialog,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _tarifaRestService: TarifaRestService,
    protected _toasterServicePrivate: ToasterService,
    private readonly _tipoImpuestoRestService: TipoImpuestoRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _tarifaRestService,
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
      parametro => {
        this.idTipoImpuesto = +parametro.idTipoImpuesto;
        this._tipoImpuestoRestService.findOne(this.idTipoImpuesto).subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this.nombrePadre = respuesta.nombre;
          },
          error => {
            console.error(error);
          },
        );
        this.ruta = RUTAS_TARIFA.rutaGestionTarifa(true, false, [
          this.idTipoImpuesto,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
          RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
          RUTAS_TIPOS_IMPUESTOS.rutaGestionTipoImpuesto(false, true),
          RUTAS_TARIFA.rutaGestionTarifa(false, true, [this.idTipoImpuesto]),
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
      : {tipoImpuesto: this.idTipoImpuesto};
    (this.queryParams.skip = event.first),
      this.llamarDatos(
        this.queryParams.skip,
        this.queryParams.where,
        this.queryParams.camposABuscar,
        this.optionalParams,
        this.queryParams.order,
        this.queryParams.relations,
      );
    this.loading = false;
  }

  buscarSubgrupoPorNombreOCodigoOCodigoSri(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    const where = [
      {
        nombre: `Like(\"%25${valorBusqueda}%25\")`,
        tipoImpuesto: this.idTipoImpuesto,
      },
      {
        codigo: `Like(\"%25${valorBusqueda}%25\")`,
        tipoImpuesto: this.idTipoImpuesto,
      },
      {
        codigoSri: `Like(\"%25${valorBusqueda}%25\")`,
        tipoImpuesto: this.idTipoImpuesto,
      },
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      ['tipoImpuesto'],
      this.tipoBusqueda,
    );
  }

  seteoEstadoSeleccionado(value) {
    this.optionalParams = {registroActual: undefined};
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      tipoImpuesto: this.idTipoImpuesto,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      ['tipoImpuesto'],
      this.tipoBusqueda,
    );
  }

  abrirModalCrearTarifa() {
    const dialogRef = this.dialog.open(CrearEditarTarifaComponent, {
      width: WIDTH_MODAL_TARIFA,
      data: {idTipoImpuesto: this.idTipoImpuesto},
    });
    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$
      .subscribe(
        (registroCreado: TarifaInterface) => {
          if (registroCreado) {
            this.optionalParams = {registroActual: registroCreado.id};
            this.values.unshift(registroCreado);
            this.optionalParams.registroActual = registroCreado.id;
          }
        },
        error => {
          console.error(error);
        });
  }


  abrirModalEditarTarifa(registro: any) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarTarifaComponent, {
      width: WIDTH_MODAL_TARIFA,
      data: {tarifa: registro},
    });

    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe(
      (registroEditado: TarifaInterface) => {
        if (registroEditado) {
          this.optionalParams = {registroActual: registroEditado.id};
          this.values.splice(indiceRegistro, 1, registroEditado);
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  actualizarEstado(registro: TarifaInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const tarifaEnArreglo = this.values.find(
      tarifa => registro.id === tarifa.id,
    );
    const indiceTarifa = this.values.indexOf(tarifaEnArreglo);
    this._tarifaRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceTarifa].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(
            toastExitoEditar
          );
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }
}
