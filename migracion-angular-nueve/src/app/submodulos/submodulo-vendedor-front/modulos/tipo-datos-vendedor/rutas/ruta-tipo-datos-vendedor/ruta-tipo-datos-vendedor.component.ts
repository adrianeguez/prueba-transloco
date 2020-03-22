import {Component, OnInit} from '@angular/core';
import {CargandoService, EmitirMigaPanService, ESTADOS} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import {TipoDatosVenRestService} from '../../../../servicios/rest/tipo-datos-ven-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {TipoDatosVenInterface} from '../../../../interfaces/tipo-datos-ven';
import {RUTAS_TIPO_DATOS_VENDEDOR} from '../definicion-rutas/rutas-tipo-datos-vendedor';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_DATOS_VENDEDOR} from '../../../datos-vendedor/rutas/definicion-rutas/rutas-datos-vendedor';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {toastErrorCargarDatos, toastErrorConexionServidor, toastErrorEditar, toastExitoEditar} from '../../../../../../constantes/mensajes-toaster';
import {AsignarTipoVendedorComponent} from '../../modales/asignar-tipo-vendedor/asignar-tipo-vendedor.component';
import {TAMANIO_MODAL_SELECT} from '../../../../constantes/tamanios-componentes';

@Component({
  selector: 'ml-ruta-tipo-datos-vendedor',
  templateUrl: './ruta-tipo-datos-vendedor.component.html',
  styleUrls: ['./ruta-tipo-datos-vendedor.component.scss']
})
export class RutaTipoDatosVendedorComponent extends RutaConMigasDePanTablaBusqueda<TipoDatosVenInterface,
  TipoDatosVenRestService,
  ToasterService> implements OnInit {

  idEmpresa;
  idVendedor;
  estados = ESTADOS;
  nombrePapa;


  columnas = [
    {field: 'tipoVendedor', header: 'Tipo vendedor'},
    {field: 'tipoVendedor', header: 'Código'},
    {field: 'habilitado', header: 'Estado'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected _tipoDatosVendedorRestService: TipoDatosVenRestService,
    protected _datosVendedorRestService: DatosVendedorRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _tipoDatosVendedorRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
    this.queryParams.relations = ['tipoVendedor'];
  }

  ngOnInit() {
    //  this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(parametros => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idVendedor = +parametros.idVendedor;
        this._datosVendedorRestService.findOne(this.idVendedor).subscribe(
          respuesta => {
            this.nombrePapa = respuesta.nombreVendedor;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_TIPO_DATOS_VENDEDOR.rutaGestionTipoDatosVen(
          true,
          false,
          [this.idEmpresa, this.idVendedor],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_DATOS_VENDEDOR.rutaGestionDatosVendedor(false, true, [
            this.idEmpresa,
          ]),
          RUTAS_TIPO_DATOS_VENDEDOR.rutaGestionTipoDatosVen(
            false,
            true,
            [this.idEmpresa, this.idVendedor],
          ),
        ];

        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      }
    );
    this._cargandoService.deshabilitarCargando();
  }


  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : {datosVendedor: this.idVendedor};
    this.queryParams.order = {
      id: 'DESC',
    };
    this.queryParams.skip = event.first;
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


  buscarPorNombre(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    if (valorBusqueda === '') {
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        {
          datosVendedor: this.idVendedor,
        },
        undefined,
        undefined,
        this.queryParams.order,
        this.queryParams.relations,
        this.tipoBusqueda,
      );
    } else {
      this.busqueda = valorBusqueda;
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        {campo: 'nombre', valor: `%25${this.busqueda}%25`, like: true},
      ];
      this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
    }
  }

  protected busquedaPersonalizada(): void {

    this._cargandoService.habilitarCargando();
    const busqueda = {
      camposABuscar: [],
      relations: [
        {
          key: 'tipoVendedor',
          entidad: 'tipo_vendedor',
          query: this.queryParams.camposABuscar,
        },
        {
          key: 'datosVendedor',
          entidad: 'datos_vendedor',
          query: [{campo: 'id', valor: this.idVendedor}],
        },
      ],
    };
    this._tipoDatosVendedorRestService
      .findWhereOr('criterioBusqueda=' + JSON.stringify(busqueda))
      .subscribe(
        r => {
          this.values = r[0];
          this.loading = false;
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        },
      );

  }

  abrirModalAsignarTipoVendedor() {
    const dialogRef = this.dialog.open(AsignarTipoVendedorComponent, {
      width: TAMANIO_MODAL_SELECT,
      data: {
        idEmpresa: this.idEmpresa,
        idVendedor: this.idVendedor,
      },
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r) {
        const query = {
          where: {
            id: r.id,
            datosVendedor: this.idVendedor,
            tipoVendedor: r.tipoVendedor,
          },
          relations: ['tipoVendedor', 'datosVendedor']
        };
        this._tipoDatosVendedorRestService.findAll('criterioBusqueda=' + JSON.stringify(query)).subscribe(
          value => {
            this.values.unshift(...value[0]);
          },
          error => {
            console.error(error);
            this._toasterService.pop(toastErrorCargarDatos);
          }
        );
      }
    });
  }


  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const tipoDatosVendedorEnArreglo = this.values.find(
      tipoDatosVendedor => registro.id === tipoDatosVendedor.id,
    );
    const indiceEscalaPeridoVendedor = this.values.indexOf(
      tipoDatosVendedorEnArreglo,
    );
    this._tipoDatosVendedorRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceEscalaPeridoVendedor].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = {registroActual: undefined};
    const where = {
      habilitado: event === 1 || event === 0 ? event : undefined,
      datosVendedor: this.idVendedor,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, ['tipoVendedor', 'datosVendedor'], this.tipoBusqueda);
  }

}


