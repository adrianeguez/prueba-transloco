import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ArticulosRestService} from '../../../../servicios/rest/articulos-rest.service';
import {DetalleAdicionalRestService} from '../../../../servicios/rest/detalle-adicional-rest.service';
import {TarifaImpuestoRestService} from '../../../../servicios/rest/tarifa-impuesto-rest.service';
// tslint:disable-next-line: max-line-length
import {CrearEditarDetalleAdicionalComponent} from '../../../detalle-adicional/modales/crear-editar-detalle-adicional/crear-editar-detalle-adicional.component';
import {RUTAS_GRUPOS} from '../../../grupo/rutas/definicion-rutas/rutas-grupos';
import {RUTAS_SUBGRUPO} from '../../../subgrupo/rutas/definicion-rutas/rutas-subgrupo';
import {WIDTH_MODAL_ARTICULO} from '../../constantes/tamanio-modal-articulo';
import {AsignarImpuestoComponent} from '../../modales/asignar-impuesto/asignar-impuesto.component';
import {AsignarUnidadMedidaComponent} from '../../modales/asignar-unidad-medida/asignar-unidad-medida.component';
import {CrearEditarArticuloComponent} from '../../modales/crear-editar-articulo/crear-editar-articulo.component';
import {RUTAS_ARTICULO} from '../definicion-rutas/rutas-articulo';
import {
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {WIDTH_MODAL_SELECT} from '../../../../constantes/tamanio-modal';
import {OPCIONES_SI_NO} from '../../../../enums/si-no';
import {ArticuloInterface} from './../../../../interfaces/articulo.interface';
import {DetalleAdicionalInterface} from './../../../../interfaces/detalle-adicional.interface';
import {TarifaImpuestoInterface} from './../../../../interfaces/tarifa-impuesto.interface';
import {RUTAS_MENU_ARTICULO} from './../../../../ruta/definicion-rutas/rutas-menu';
import {ArticulosProveedorRestService} from './../../../../servicios/rest/articulo-proveedor-rest.service';
import {SubgrupoRestService} from './../../../../servicios/rest/subgrupo-rest.service';
import {WIDTH_MODAL_DETALLE} from './../../../detalle-adicional/constantes/tamanio-modal-detalle';
import {ModalListaArticuloEmpresaComponent} from '../../../../componentes/modales/modal-lista-articulo-empresa/modal-lista-articulo-empresa/modal-lista-articulo-empresa.component';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-articulos',
  templateUrl: './ruta-gestion-articulos.component.html',
  styleUrls: ['./ruta-gestion-articulos.component.sass'],
})
export class RutaGestionArticulosComponent
  extends RutaConMigasDePanTablaBusqueda<ArticuloInterface,
    ArticulosRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  opcionesSiNo = OPCIONES_SI_NO;
  articulos: ArticuloInterface[];
  totalRegistros: number;
  idGrupo: number;
  idSubgrupo: number;
  rows = NUMERO_FILAS_TABLAS;
  estados = ESTADOS;
  columnas = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'codigo', header: 'Código producto'},
    {field: 'codigoBarras', header: 'Código barras'},
    {field: 'esServicio', header: 'Es servicio'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Agregar'},
    {field: 'id', header: 'Gestión'},
    {field: 'id', header: 'Acciones'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _articulosRestService: ArticulosRestService,
    protected readonly _detalleAdicionalArticuloRestService: DetalleAdicionalRestService,
    protected readonly _tarifaImpuestoRestService: TarifaImpuestoRestService,
    protected readonly _router: Router,
    protected dialog: MatDialog,
    protected _toasterServicePrivate: ToasterService,
    protected _articulosProveedorRestService: ArticulosProveedorRestService,
    private readonly _subgrupoRestService: SubgrupoRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _articulosRestService,
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
        this.idSubgrupo = +parametros.idSubgrupo;
        this.idGrupo = +parametros.idGrupo;
        this._subgrupoRestService.findOne(this.idSubgrupo).subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this.nombrePadre = respuesta.nombre;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_ARTICULO.rutaGestionArticulo(true, false, [
          this.idGrupo,
          this.idSubgrupo,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
          RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
          RUTAS_GRUPOS.rutaGestionGrupo(false, true),
          RUTAS_SUBGRUPO.rutaGestionSubgrupo(false, true, [this.idGrupo]),
          RUTAS_ARTICULO.rutaGestionArticulo(false, true, [
            this.idGrupo,
            this.idSubgrupo,
          ]),
        ];
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
      },
    );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : {
        subgrupo: this.idSubgrupo
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

  buscarArticuloPorNombreOCodigoOCodigoAuxiliar(busqueda) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    const where = [
      {
        nombre: `Like(\"%25${valorBusqueda}%25\")`,
        subgrupo: this.idSubgrupo,
      },
      {
        codigo: `Like(\"%25${valorBusqueda}%25\")`,
        subgrupo: this.idSubgrupo,
      },
      {
        codigoBarras: `Like(\"%25${valorBusqueda}%25\")`,
        subgrupo: this.idSubgrupo,
      },
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      ['subgrupo'],
      this.tipoBusqueda,
    );
  }

  seteoEstadoSeleccionado(value) {
    this.optionalParams = {registroActual: undefined};
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      subgrupo: this.idSubgrupo,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      ['subgrupo'],
      this.tipoBusqueda,
    );
  }

  abrirModalCrearArticulo() {
    const dialogRef = this.dialog.open(CrearEditarArticuloComponent, {
      width: WIDTH_MODAL_ARTICULO,
      data: {idSubgrupo: this.idSubgrupo},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (respuesta: ArticuloInterface) => {
        if (respuesta) {
          this.optionalParams = {registroActual: respuesta.id};
          this.values.unshift(respuesta);
          this.optionalParams.registroActual = respuesta.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalEditarArticulo(registro: ArticuloInterface) {
    const indiceArticulo = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarArticuloComponent, {
      width: WIDTH_MODAL_ARTICULO,
      data: {articulo: registro},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (registroEditado: ArticuloInterface) => {
        if (registroEditado) {
          this.optionalParams = {registroActual: registroEditado.id};
          this.values.splice(indiceArticulo, 1, registroEditado);
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalCrearDetalleAdicional(registro) {
    const dialogRef = this.dialog.open(CrearEditarDetalleAdicionalComponent, {
      width: WIDTH_MODAL_DETALLE,
      data: {idArticulo: registro.id},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (respuesta: DetalleAdicionalInterface) => {
        if (respuesta) {
          this.optionalParams = {registroActual: registro.id};
          this.optionalParams.registroActual = registro.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalAsignarTarifa(registro: ArticuloInterface) {
    const dialogRef = this.dialog.open(AsignarImpuestoComponent, {
      width: WIDTH_MODAL_SELECT,
      data: {articulo: registro},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (registroCreado: TarifaImpuestoInterface) => {
        if (registroCreado) {
          this.optionalParams = {registroActual: registroCreado.id};
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalAsignarUnidadMedida(registro: ArticuloInterface) {
    const dialogRef = this.dialog.open(AsignarUnidadMedidaComponent, {
      width: WIDTH_MODAL_SELECT,
      data: {articulo: registro},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (registroCreado: any) => {
        if (registroCreado) {
          this.optionalParams = {registroActual: registroCreado.id};
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  actualizarEstado(registro: ArticuloInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const articuloEnArreglo = this.values.find(
      articulo => registro.id === articulo.id,
    );
    const indiceArticulo = this.values.indexOf(articuloEnArreglo);
    this._articulosRestService.updateOne(registro.id, {habilitado}).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this.values[indiceArticulo].habilitado = habilitado
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

  actualizarEsServicio(registro: ArticuloInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.esServicio === OPCIONES_SI_NO.NO;
    const articuloEnArreglo = this.values.find(
      articulo => registro.id === articulo.id,
    );
    const indiceArticulo = this.values.indexOf(articuloEnArreglo);
    this._articulosRestService.updateOne(registro.id, {habilitado}).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this.values[indiceArticulo].esServicio = habilitado
          ? OPCIONES_SI_NO.SI
          : OPCIONES_SI_NO.NO;
        this._toasterService.pop(toastExitoEditar);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  irAGestionModuloHijo(idArticulo: number, moduloHijo: string) {
    const ruta = [
      'configuraciones/articulo',
      'grupo-modulo',
      this.idGrupo,
      'subgrupo-modulo',
      this.idSubgrupo,
      'articulo-modulo',
      idArticulo,
      moduloHijo + '-modulo',
      'gestion',
    ];
    this._router.navigate(ruta, {
      queryParams: {
        order: JSON.stringify(this.queryParams.order),
        skip: 0,
        take: NUMERO_FILAS_TABLAS,
        where: JSON.stringify({articulo: idArticulo}),
        relations: JSON.stringify(this.obtenerRelations(moduloHijo)),
      },
    });
  }

  obtenerRelations(modulo: string) {
    switch (modulo) {
      case 'detalle-adicional':
        return ['articulo'];
      case 'historial-impuesto':
        return ['articulo'];
      case 'articulo-unidad-medida':
        return ['articulo', 'unidadMedida'];
      default:
        return undefined;
    }
  }
}
