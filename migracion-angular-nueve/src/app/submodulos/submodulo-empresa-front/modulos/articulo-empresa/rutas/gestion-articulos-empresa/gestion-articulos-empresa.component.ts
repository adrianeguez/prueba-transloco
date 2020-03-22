import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { ArticuloEmpresaInterface } from '../../../../../submodulo-articulos-front/interfaces/articulo-empresa.interface';
import { ArticulosEmpresaRestService } from '../../../../../submodulo-articulos-front/servicios/rest/articulo-empresa-rest.service';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { ESTADOS } from '../../../../../../enums/estados';
import { RUTAS_ARTICULO_EMPRESA } from '../definicion-rutas/rutas-articulo-empresa';
// tslint:disable-next-line:max-line-length
import { ModalListaArticuloEmpresaComponent } from '../../../../../submodulo-articulos-front/componentes/modales/modal-lista-articulo-empresa/modal-lista-articulo-empresa/modal-lista-articulo-empresa.component';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { TipoCargoInterface } from '../../../../interfaces/tipo-cargo.interface';

@Component({
  selector: 'ml-gestion-articulos-empresa',
  templateUrl: './gestion-articulos-empresa.component.html',
  styleUrls: ['./gestion-articulos-empresa.component.scss'],
})
export class GestionArticulosEmpresaComponent
  extends RutaConMigasDePanTablaBusqueda<
    ArticuloEmpresaInterface,
    ArticulosEmpresaRestService,
    ToasterService
  >
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  idEmpresa;
  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'codigo', header: 'Código' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _articuloEmpresaRestService: ArticulosEmpresaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _articuloEmpresaRestService,
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
        this._empresaRestService.findOne(this.idEmpresa).subscribe(
          empresa => {
            this.nombreModuloPadre = empresa.razonSocial;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_ARTICULO_EMPRESA.rutaGestionArticuloEmpresa(
          true,
          false,
          [this.idEmpresa],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_ARTICULO_EMPRESA.rutaGestionArticuloEmpresa(false, true, [
            this.idEmpresa,
          ]),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { empresa: this.idEmpresa };
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : ['articulo', 'empresa'];
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

  abrirModalListaArticulos() {
    const dialogRef = this.dialog.open(ModalListaArticuloEmpresaComponent, {
      width: '900px',
      data: { idEmpresa: this.idEmpresa },
    });
    dialogRef.afterClosed().subscribe(
      (registrosCreados: ArticuloEmpresaInterface[]) => {
        if (registrosCreados) {
          registrosCreados.forEach(registro => {
            this.values.unshift(registro);
          });
          this.values = [...this.values];
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
    this._articuloEmpresaRestService
      .updateOne(registro.id, { habilitado })
      .subscribe(
        r => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = habilitado
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

  buscarPorNombreOCodigo(busqueda: string) {
    this.optionalParams = { registroActual: undefined };
    this.busqueda = busqueda.trim();
    if (this.busqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        { empresa: this.idEmpresa },
        undefined,
        undefined,
        undefined,
        ['articulo', 'empresa'],
        this.tipoBusqueda,
      );
    } else {
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        { campo: 'campo', valor: `%25${this.busqueda}%25`, like: true },
      ];
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        undefined,
        ['articulo', 'empresa'],
        this.tipoBusqueda
      );
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const datos = {
      busqueda: this.busqueda
        ? this.busqueda
        : this.queryParams.camposABuscar[0].valor,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
      idEmpresa: this.idEmpresa,
    };
    this._articuloEmpresaRestService
      .obtenerArticuloEmpresaPorNombreCodigo(datos)
      .subscribe(
        (resultado: [TipoCargoInterface[], number]) => {
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

  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? { habilitado: event, empresa: this.idEmpresa }
      : { empresa: this.idEmpresa };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'articulo',
      'empresa',
    ],
      this.tipoBusqueda);
  }

  irAGestionModuloHijo(
    idArticuloEmpresa: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'articulo-empresa-modulo',
      idArticuloEmpresa,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }
}
