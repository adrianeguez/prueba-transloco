import {Component, OnInit} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {EmpresaRestService} from '../../../../servicios/rest/empresa-rest.service';
import {MatDialog} from '@angular/material';
import {CrearEditarEmpresaComponent} from '../../modales/crear-editar-empresa/crear-editar-empresa.component';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_EMPRESA} from '../definicion-rutas/rutas-empresa';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {ESTADOS} from '../../../../../../enums/estados';
import {WIDTH_MODAL_EMPRESA} from '../../constantes/tamanio-modal-empresa';
import {SubempresaInterface} from '../../../../interfaces/subempresa.interface';
import {SubempresaRestService} from '../../../../servicios/rest/subempresa-rest.service';
import {TreeNode} from 'primeng/api';
import {setearArrayEmpresaSubempresa} from '../../../subempresa/funciones/setear-array-empresa-subempresa';
import {generarArrayNodos} from '../../../../funciones/funciones-tree-table/generar-array-nodos';
import {llenarArbolConRegistro} from '../../../../funciones/funciones-tree-table/llenar-arbol-con-registros';
import {obtenerBusquedaQueryParams} from '../../../../funciones/obtener-busqueda-query-params';
import {obtenerNombresCamposABuscarQueryParams} from '../../../../funciones/obtener-nombres-campos-a-buscar-query-params';
import {escucharBusquedaArbol} from '../../../../funciones/funciones-tree-table/escuchar-busqueda-arbol';
import {EmpresaSubempresaInterface} from '../../../subempresa/interfaces/empresa-subempresa.interface';
import {cambiarEstadoSeleccionadoTreeTable} from '../../../../funciones/funciones-tree-table/cambiar-estado-seleccionado-nodos';
import {MenuItem} from 'primeng/api';
import {CAMPOS_INFORMACION} from '../../constantes/campos-informacion-empresa';
import {MENU_GESTION_BOTONES} from '../../constantes/menu-gestion-botones';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {log} from 'util';

@Component({
  selector: 'ml-gestion-empresas',
  templateUrl: './ruta-gestion-empresas.component.html',
  styleUrls: ['./ruta-gestion-empresas.component.scss'],
})
export class RutaGestionEmpresasComponent
  extends RutaConMigasDePanTablaBusqueda<SubempresaInterface,
    SubempresaRestService,
    ToasterService>
  implements OnInit {
  subempresasTreeTable: TreeNode[] = [];

  rows = NUMERO_FILAS_TABLAS;

  idEmpresa;

  subempresaPadre;

  nivel;

  estados = ESTADOS;

  columnas = [
    {field: 'informacion', header: 'Información', width: '30%'},
    {field: 'acciones', header: 'menuSlide', width: '50%'},
  ];
  camposInformacion = CAMPOS_INFORMACION;
  menuBotones = MENU_GESTION_BOTONES;
  menuBotonesResponsive = [];

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _subempresaService: SubempresaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    private readonly _auth0Service: Auth0Service,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _subempresaService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      10,
    ); // TAKE
    this.ruta = RUTAS_EMPRESA.rutaGestionEmpresa(false, true).ruta;
    this.queryParams.order = {
      id: 'DESC',
    };
    this.menuBotones.forEach(menuBoton => {
      menuBoton.botones.forEach(boton => {
        this.menuBotonesResponsive.push(boton);
      });
    });
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
    if (!this.queryParams.camposABuscar) {
      this.setearSubempresasEncontradas();
    }
    this.loading = false;
  }

  ngOnInit() {
    this.idEmpresa = this._auth0Service.empresaSeleccionada.empresa.id;
    this.queryParams.where = !this.queryParams.camposABuscar
      ? {empresaHijo: this.idEmpresa}
      : undefined;
    try {
      this.subempresasTreeTable = [];
      this._cargandoService.habilitarCargando();
      this._activatedRoute.params.subscribe(
        async params => {
          this.ruta = RUTAS_EMPRESA.rutaGestionEmpresa(true, false, []);
          const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          ];
          this.queryParams.where = !this.queryParams.camposABuscar
            ? {empresaHijo: this.idEmpresa}
            : undefined;
          this.queryParams.relations =
            this.queryParams.relations.length > 0
              ? this.queryParams.relations
              : ['empresaPadre', 'empresaHijo', 'empresaHijo.informacionTributaria'];
          this.establecerMigas(rutas);
          this.escucharCambiosEnQueryParams();
          this.escucharCambiosEnParametros();
          this.subempresaPadre = await this.buscarSubEmpresaPadre();
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        },
      );
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
      this._cargandoService.deshabilitarCargando();
    }
  }

  setearSubempresasEncontradas() {
    setTimeout(() => {
      const empresasSubempresas = setearArrayEmpresaSubempresa(this.values);
      this.subempresasTreeTable = generarArrayNodos(empresasSubempresas);
      this.subempresasTreeTable = [...this.subempresasTreeTable];
      this.totalRecords = this.subempresasTreeTable.length;
    }, 800);
  }

  expandirNodo(eventoNodo) {
    const nodoPadre = eventoNodo.node;
    nodoPadre.children = [];
    const query = {
      where: {
        empresaPadre: nodoPadre.data.empresaActual.id,
      },
      order: {
        id: 'DESC',
      },
      relations: ['empresaHijo', 'empresaHijo.informacionTributaria'],
    };
    this._subempresaService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        (respuesta: any) => {
          nodoPadre.data.empresasHijo = setearArrayEmpresaSubempresa(
            respuesta[0],
          );
          llenarArbolConRegistro(nodoPadre, 'empresasHijo');
          this.subempresasTreeTable = [...this.subempresasTreeTable];
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }

  buscarPorRazonSocialRUCEstado(
    busqueda,
    seSeleccionoEstado?,
    seSeleccionoTipoEmpresa?,
  ) {
    this.busqueda = typeof busqueda === 'string' ? busqueda.trim() : busqueda;
    this.optionalParams.registroActual = undefined;
    if (this.busqueda === '' || this.busqueda === undefined) {
      this.tipoBusqueda = 'findAll';
      const where = {
        empresaHijo: this.idEmpresa,
      };
      this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
        'empresaHijo',
        'empresaHijo.informacionTributaria',
      ], this.tipoBusqueda);
      this.setearSubempresasEncontradas();
    } else {
      this.tipoBusqueda = 'custom';
      if (seSeleccionoEstado) {
        this.queryParams.camposABuscar = [
          {campo: 'habilitado', valor: `%25${this.busqueda}%25`},
        ];
      }
      if (seSeleccionoTipoEmpresa) {
        this.queryParams.camposABuscar = [
          {campo: 'tipo', valor: `%25${this.busqueda}%25`},
        ];
      }
      if (!seSeleccionoEstado && !seSeleccionoTipoEmpresa) {
        this.queryParams.camposABuscar = [
          {campo: 'ruc', valor: `%25${this.busqueda}%25`},
          {campo: 'razonSocial', valor: `%25${this.busqueda}%25`},
        ];
      }
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        this.queryParams.order,
        null,
        this.tipoBusqueda
      );
    }
  }

  async busquedaPersonalizada() {
    try {
      this.busqueda = obtenerBusquedaQueryParams(this.queryParams);
      const camposABuscar = obtenerNombresCamposABuscarQueryParams(
        this.queryParams.camposABuscar,
      );
      const datos = {
        busqueda: this.busqueda,
        campos: camposABuscar,
        skip: this.queryParams.skip,
        take: NUMERO_FILAS_TABLAS,
        nivel: (await this.buscarSubEmpresaPadre()).nivel,
        idEmpresaPadre: +this.idEmpresa,
      };
      this._cargandoService.habilitarCargando();
      this._subempresaService.buscarEmpresas(datos).subscribe(
        async respuesta => {
          this.values = respuesta[0];
          this.subempresaPadre = await this.buscarSubEmpresaPadre();
          this.subempresasTreeTable = generarArrayNodos(this.values);
          this.subempresasTreeTable = [...this.subempresasTreeTable];
          this.subempresasTreeTable.forEach(empresaSubempresaTreeTable => {
            llenarArbolConRegistro(empresaSubempresaTreeTable, 'empresasHijo');
          });
          escucharBusquedaArbol(
            this.subempresasTreeTable,
            this.busqueda,
            camposABuscar,
            'empresaActual',
          );
          this.totalRecords = this.subempresasTreeTable.length;
          this.first = 0;
          this.loading = false;
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
          this.loading = false;
          this.subempresasTreeTable = [];
        },
      );
    } catch (e) {
      this.loading = false;
      this.subempresasTreeTable = [];
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  actualizarEstado(nodoRegistro) {
    cambiarEstadoSeleccionadoTreeTable(this.subempresasTreeTable);
    this._cargandoService.habilitarCargando();
    const registro = nodoRegistro.node.data.empresaActual;
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._empresaRestService.updateOne(registro.id, {habilitado}).subscribe(
      r => {
        registro.habilitado = habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
        this._toasterService.pop(toastExitoEditar);
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  escucharEstadoSeleccionado(estado) {
    this.buscarPorRazonSocialRUCEstado(estado, true);
  }

  escucharTipoEmpresaSeleccionado(tipo) {
    this.buscarPorRazonSocialRUCEstado(tipo, false, true);
  }

  async buscarSubEmpresaPadre() {
    try {
      const consulta = {
        where: {
          empresaHijo: this.idEmpresa,
        },
        relations: [
          'empresaHijo',
          'empresaPadre',
          'empresaHijo.informacionTributaria',
        ],
      };
      const respuestSubmepresas = await this._subempresaService
        .findAll('criterioBusqueda=' + JSON.stringify(consulta))
        .toPromise();
      return respuestSubmepresas[0][0];
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  abrirModalCrearEmpresaSubempresa(nodoPadre) {
    cambiarEstadoSeleccionadoTreeTable(this.subempresasTreeTable);
    const subempresaEmpresaPadre = nodoPadre.node.data;
    const dialogRef = this.dialog.open(CrearEditarEmpresaComponent, {
      width: WIDTH_MODAL_EMPRESA,
      data: {subempresaEmpresaPadre},
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: EmpresaSubempresaInterface) => {
        if (registroCreado) {
          this.expandirNodo(nodoPadre);
          nodoPadre.node.expanded = true;
          this.subempresasTreeTable = [...this.subempresasTreeTable];
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

  abrirModalEditarSubempresa(nodoAEditar) {
    cambiarEstadoSeleccionadoTreeTable(this.subempresasTreeTable);
    const indiceRegistro = this.values.indexOf(nodoAEditar);
    const dialogRef = this.dialog.open(CrearEditarEmpresaComponent, {
      width: WIDTH_MODAL_EMPRESA,
      data: {
        empresa: nodoAEditar.node.data.empresaActual,
        idInformacionTributaria:
        nodoAEditar.node.data.empresaActual.informacionTributaria.id,
      },
    });
    dialogRef.afterClosed().subscribe(
      registroEditado => {
        if (registroEditado) {
          nodoAEditar.node.data.empresaActual = registroEditado;
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

  irAGestionModuloHijo(
    idEmpresa: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      idEmpresa,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }
}
