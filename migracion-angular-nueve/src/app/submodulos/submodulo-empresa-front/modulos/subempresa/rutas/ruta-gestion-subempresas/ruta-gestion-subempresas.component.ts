import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { SubempresaRestService } from '../../../../servicios/rest/subempresa-rest.service';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_SUBEMPRESA } from '../definicion/rutas-subempresa';
import { TreeNode } from 'primeng/api';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { setearArrayEmpresaSubempresa } from '../../funciones/setear-array-empresa-subempresa';
import { llenarArbolConRegistro } from '../../../../funciones/funciones-tree-table/llenar-arbol-con-registros';
import { obtenerNombresCamposABuscarQueryParams } from '../../../../funciones/obtener-nombres-campos-a-buscar-query-params';
import { obtenerBusquedaQueryParams } from '../../../../funciones/obtener-busqueda-query-params';
import { escucharBusquedaArbol } from '../../../../funciones/funciones-tree-table/escuchar-busqueda-arbol';
import { generarArrayNodos } from '../../../../funciones/funciones-tree-table/generar-array-nodos';
import { CrearEditarSubempresaComponent } from '../../modales/crear-editar-subempresa/crear-editar-subempresa.component';
import { generarNodo } from '../../../../funciones/funciones-tree-table/generar-nodo';
import { SubempresaInterface } from '../../../../interfaces/subempresa.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { ESTADOS } from '../../../../../../enums/estados';
import { WIDTH_MODAL_SUBEMPRESA } from '../../constantes/tamanio-modal-subempresa';

@Component({
  selector: 'ml-ruta-gestion-subempresas',
  templateUrl: './ruta-gestion-subempresas.component.html',
  styleUrls: ['./ruta-gestion-subempresas.component.sass'],
})
export class RutaGestionSubempresasComponent
  extends RutaConMigasDePanTablaBusqueda<
    SubempresaInterface,
    SubempresaRestService,
    ToasterService
  >
  implements OnInit {
  subempresasTreeTable: TreeNode[] = [];

  totalRegistros = 0;

  rows = NUMERO_FILAS_TABLAS;

  idEmpresa;

  empresaPadre;

  nivel;

  estados = ESTADOS;

  columnas = [
    { field: 'razonSocial', header: 'Razón Social', width: '30%' },
    { field: 'ruc', header: 'RUC', width: '20%' },
    { field: 'habilitado', header: 'Estado', width: '20%' },
    { field: 'acciones', header: 'Acciones', width: '30%' },
  ];

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _subempresaService: SubempresaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _subempresaService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = !this.queryParams.camposABuscar
      ? { empresaPadre: this.idEmpresa }
      : undefined;
    this.queryParams.relations = this.queryParams.relations
      ? this.queryParams.relations
      : ['empresaPadre', 'empresaHijo'];
    this.llamarDatos(
      event.first,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
    );
    if (!this.queryParams.camposABuscar) {
      this.setearSubempresasEncontradas();
    }
  }

  ngOnInit() {
    try {
      this._cargandoService.habilitarCargando();
      this._activatedRoute.params.subscribe(
        async params => {
          this.idEmpresa = params.idEmpresa;
          this.ruta = RUTAS_SUBEMPRESA.rutaGestionSubempresa(true, false, [
            this.idEmpresa,
          ]);
          const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
            RUTAS_SUBEMPRESA.rutaGestionSubempresa(false, true, [
              this.idEmpresa,
            ]),
          ];
          this.establecerMigas(rutas);
          this.escucharCambiosEnQueryParams();
          this.escucharCambiosEnParametros();
          this.empresaPadre = await this.buscarEmpresaPadre();
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        },
      );
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  setearSubempresasEncontradas() {
    setTimeout(() => {
      const empresasSubempresas = setearArrayEmpresaSubempresa(this.values);
      this.subempresasTreeTable = generarArrayNodos(empresasSubempresas);
      this.subempresasTreeTable = [...this.subempresasTreeTable];
      this.totalRegistros = this.subempresasTreeTable.length;
    }, 50);
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
      relations: ['empresaHijo'],
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

  actualizarEstado(nodoRegistro) {
    this._cargandoService.habilitarCargando();
    const registro = nodoRegistro.node.data;
    const habilitado =
      registro.habilitado === ESTADOS.Inactivo
        ? ESTADOS.Activo
        : ESTADOS.Inactivo;
    this._subempresaService.updateOne(registro.id, { habilitado }).subscribe(
      r => {
        nodoRegistro.node.data.habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
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

  buscarPorRazonSocialRUCEstado(busqueda, seSeleccionoEstado?) {
    this.busqueda = busqueda.trim();
    this.optionalParams.registroActual = undefined;
    if (this.busqueda === '' || this.busqueda === undefined) {
      this.tipoBusqueda = 'findAll';
      const where = {
        empresaPadre: this.idEmpresa,
      };
      this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
        'empresaHijo',
      ]);
      this.setearSubempresasEncontradas();
    } else {
      this.tipoBusqueda = 'custom';
      if (seSeleccionoEstado) {
        this.queryParams.camposABuscar = [
          { campo: 'habilitado', valor: `%25${this.busqueda}%25` },
        ];
      } else {
        this.queryParams.camposABuscar = [
          { campo: 'ruc', valor: `%25${this.busqueda}%25` },
          { campo: 'razonSocial', valor: `%25${this.busqueda}%25` },
        ];
      }
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        this.queryParams.order,
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
        nivel: await this.obtenerNivelEmpresa(),
        idEmpresaPadre: +this.idEmpresa,
      };
      this._cargandoService.habilitarCargando();
      this._subempresaService.buscarEmpresas(datos).subscribe(
        respuesta => {
          this.values = respuesta[0];
          this.subempresasTreeTable = generarArrayNodos(this.values);
          this.subempresasTreeTable = [...this.subempresasTreeTable];
          this.subempresasTreeTable.forEach(empresaSubempresaTreeTable => {
            llenarArbolConRegistro(empresaSubempresaTreeTable, 'empresasHijo');
          });
          const seSeleccionoEstado =
            this.queryParams.camposABuscar[0].campo === 'habilitado';
          escucharBusquedaArbol(
            this.subempresasTreeTable,
            this.busqueda,
            camposABuscar,
            !seSeleccionoEstado ? 'empresaActual' : undefined,
          );
          this.totalRecords = respuesta[1];
          this.first = 0;
          this.loading = false;
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
          this.loading = false;
        },
      );
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  escucharEstadoSeleccionado(estado) {
    this.buscarPorRazonSocialRUCEstado(estado, true);
  }

  async abrirModalCrearSubempresa(nodoPadre?) {
    try {
      const subempresaEmpresaPadre = nodoPadre ? nodoPadre.node.data : null;
      const dialogRef = this.dialog.open(CrearEditarSubempresaComponent, {
        width: WIDTH_MODAL_SUBEMPRESA,
        data: {
          subempresaEmpresaPadre,
          idEmpresaPadre: this.idEmpresa,
          nivel: await this.obtenerNivelEmpresa(),
        },
      });

      const resultadoModal$ = dialogRef.afterClosed();
      resultadoModal$.subscribe(
        (registroCreado: SubempresaInterface) => {
          if (registroCreado) {
            if (!nodoPadre) {
              this.subempresasTreeTable.unshift(generarNodo(registroCreado));
              this.rows = this.rows + 1;
            } else {
              this.expandirNodo(nodoPadre);
              if (!nodoPadre.node.expanded) {
                nodoPadre.node.expanded = true;
              }
            }
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
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  abrirModalEditarSubempresa(nodoAEditar) {
    const indiceRegistro = this.values.indexOf(nodoAEditar);
    const dialogRef = this.dialog.open(CrearEditarSubempresaComponent, {
      width: WIDTH_MODAL_SUBEMPRESA,
      data: { subempresa: nodoAEditar.node.data },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: SubempresaInterface) => {
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

  async buscarEmpresaPadre() {
    try {
      const promesaBuscarEmpresa = this._empresaRestService
        .findOne(this.idEmpresa)
        .toPromise();
      return await promesaBuscarEmpresa;
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  async obtenerNivelEmpresa() {
    try {
      const consulta = {
        where: {
          empresaHijo: this.idEmpresa,
        },
      };
      const respuestSubmepresas = await this._subempresaService
        .findAll('criterioBusqueda=' + JSON.stringify(consulta))
        .toPromise();
      return respuestSubmepresas[0][0] ? respuestSubmepresas[0][0].nivel : 0;
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }
}
