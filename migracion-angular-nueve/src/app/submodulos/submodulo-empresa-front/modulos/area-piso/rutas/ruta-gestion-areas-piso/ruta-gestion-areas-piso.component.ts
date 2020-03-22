import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MatDialog } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { generarNodo } from '../../../../funciones/funciones-tree-table/generar-nodo';
import { CrearEditarAreaPisoComponent } from '../../modales/crear-editar-area-piso/crear-editar-area-piso.component';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_AREA_PISO } from '../definicion-rutas/rutas-area-piso';
import { RUTAS_EDIFICIO } from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import { RUTAS_PISO } from '../../../piso/rutas/definicion-rutas/rutas-piso';
import { llenarArbolConRegistro } from '../../../../funciones/funciones-tree-table/llenar-arbol-con-registros';
import { AreaPisoInterface } from '../../../../interfaces/area-piso.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { obtenerNombresCamposABuscarQueryParams } from '../../../../funciones/obtener-nombres-campos-a-buscar-query-params';
import { obtenerBusquedaQueryParams } from '../../../../funciones/obtener-busqueda-query-params';
import { escucharBusquedaArbol } from '../../../../funciones/funciones-tree-table/escuchar-busqueda-arbol';
import { generarArrayNodos } from '../../../../funciones/funciones-tree-table/generar-array-nodos';
import { AreaPisoRestService } from '../../../../servicios/rest/area-piso-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';
import { WIDTH_MODAL_AREA_PISO } from '../../constantes/tamanio-modal-area-piso';
import { PisoRestService } from '../../../../servicios/rest/piso-rest.service';

@Component({
  selector: 'ml-gestion-areas-piso',
  templateUrl: './ruta-gestion-areas-piso.component.html',
  styleUrls: ['./ruta-gestion-areas-piso.component.sass'],
})
export class RutaGestionAreasPisoComponent
  extends RutaConMigasDePanTablaBusqueda<
    AreaPisoInterface,
    AreaPisoRestService,
    ToasterService
  >
  implements OnInit {
  areasPisoTreeTable: TreeNode[] = [];

  totalRegistros = 0;

  rows = NUMERO_FILAS_TABLAS;

  idPiso;

  idEmpresa;

  idEdificio;

  estados = ESTADOS;

  columnas = [
    { field: 'nombre', header: 'Nombre', width: '40%' },
    { field: 'nivel', header: 'Nivel', width: '10%' },
    { field: 'habilitado', header: 'Estado', width: '20%' },
    { field: 'acciones', header: 'Acciones', width: '30%' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _pisoRestService: PisoRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _areaPisoRestService: AreaPisoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _areaPisoRestService,
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
    if (!this.queryParams.camposABuscar) {
      this.setearAreasPisoEncontrados();
    }
    this.loading = false;
  }
  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      params => {
        this._cargandoService.deshabilitarCargando();
        this.idPiso = params.idPiso;
        this.idEdificio = params.idEdificio;
        this.idEmpresa = params.idEmpresa;
        this._pisoRestService.findOne(this.idPiso).subscribe(
          piso => {
            this.nombreModuloPadre = piso.nombre;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_AREA_PISO.rutaGestionAreaPiso(true, false, [
          this.idEmpresa,
          this.idEdificio,
          this.idPiso,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
          RUTAS_PISO.rutaGestionPiso(false, true, [
            this.idEmpresa,
            this.idEdificio,
          ]),
          RUTAS_AREA_PISO.rutaGestionAreaPiso(false, true, [
            this.idEmpresa,
            this.idEdificio,
            this.idPiso,
          ]),
        ];
        this.queryParams.where = !this.queryParams.camposABuscar
          ? { piso: this.idPiso, nivel: 0 }
          : undefined;
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : ['areaPisoPadre'];
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

  setearAreasPisoEncontrados() {
    setTimeout(() => {
      this.areasPisoTreeTable = generarArrayNodos(this.values);
      this.areasPisoTreeTable = [...this.areasPisoTreeTable];
      this.totalRegistros = this.areasPisoTreeTable.length;
    }, 1000);
  }

  abrirModalCrearAreaPiso(nodoPadre?) {
    const areaPisoPadre = nodoPadre ? nodoPadre.node.data : undefined;
    const dialogRef = this.dialog.open(CrearEditarAreaPisoComponent, {
      width: WIDTH_MODAL_AREA_PISO,
      data: { idPiso: this.idPiso, areaPisoPadre },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: AreaPisoInterface) => {
        if (registroCreado) {
          if (!nodoPadre) {
            this.areasPisoTreeTable.unshift(generarNodo(registroCreado));
            this.rows = this.rows + 1;
          } else {
            this.expandirNodo(nodoPadre);
            if (!nodoPadre.node.expanded) {
              nodoPadre.node.expanded = true;
            }
          }
          this.areasPisoTreeTable = [...this.areasPisoTreeTable];
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalEditarAreaPiso(nodoAEditar) {
    const dialogRef = this.dialog.open(CrearEditarAreaPisoComponent, {
      width: WIDTH_MODAL_AREA_PISO,
      data: {
        areaPiso: nodoAEditar.node.data,
        idPiso: this.idPiso,
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: AreaPisoInterface) => {
      if (registroEditado) {
        nodoAEditar.node.data = registroEditado;
        this.optionalParams.registroActual = nodoAEditar.node.data.id;
      }
    });
  }

  actualizarEstado(nodoRegistro) {
    this._cargandoService.habilitarCargando();
    const registro = nodoRegistro.node.data;
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._areaPisoRestService.updateOne(registro.id, { habilitado }).subscribe(
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

  expandirNodo(eventoNodo) {
    const nodoPadre = eventoNodo.node;
    nodoPadre.children = [];
    const query = {
      where: {
        piso: this.idPiso,
        areaPisoPadre: nodoPadre.data.id,
      },
      order: {
        id: 'DESC',
      },
    };
    this._areaPisoRestService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        (respuesta: any) => {
          nodoPadre.data.areaPisoHijos = respuesta[0];
          llenarArbolConRegistro(nodoPadre, 'areaPisoHijos');
          this.areasPisoTreeTable = [...this.areasPisoTreeTable];
          console.log(this.areasPisoTreeTable);
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }

  escucharEstadoSeleccionado(estado) {
    this.queryParams.camposABuscar = [
      { campo: 'habilitado', valor: `%25${estado}%25` },
    ];
    this.buscarAreasPiso(estado);
  }

  buscarPorNombreEstado(busqueda) {
    this.queryParams.camposABuscar = [
      { campo: 'nombre', valor: `%25${busqueda}%25` },
    ];
    this.buscarAreasPiso(busqueda.trim());
  }

  buscarAreasPiso(busqueda) {
    this.busqueda = busqueda;
    this.optionalParams = { registroActual: undefined };
    const noSelecionoEstado = busqueda === undefined;
    if (busqueda === '' || noSelecionoEstado) {
      this.tipoBusqueda = 'findAll';
      const where = {
        nivel: 0,
        piso: this.idPiso,
      };
      this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
        'areaPisoPadre',
      ], this.tipoBusqueda);
      this.setearAreasPisoEncontrados();
    } else {
      this.tipoBusqueda = 'custom';
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

  busquedaPersonalizada() {
    this.busqueda = obtenerBusquedaQueryParams(this.queryParams);
    const camposABuscar = obtenerNombresCamposABuscarQueryParams(
      this.queryParams.camposABuscar,
    );
    const datos = {
      busqueda: this.busqueda,
      idPiso: +this.idPiso,
      camposABuscar,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._cargandoService.habilitarCargando();
    this._areaPisoRestService.obtenerAreasPadre(datos).subscribe(
      respuesta => {
        this.values = respuesta[0];
        this.areasPisoTreeTable = generarArrayNodos(this.values);
        this.areasPisoTreeTable = [...this.areasPisoTreeTable];
        this.areasPisoTreeTable.forEach(areaoTreeTable => {
          llenarArbolConRegistro(areaoTreeTable, 'areaPisoHijos');
        });
        escucharBusquedaArbol(
          this.areasPisoTreeTable,
          this.busqueda,
          camposABuscar,
        );
        this.totalRecords = respuesta[1];
        this.first = 0;
        this.loading = false;
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
        this.loading = false;
      },
    );
  }

  irAGestionModuloHijo(
    idAreaPiso: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      +this.idEmpresa,
      'edificio-modulo',
      this.idEdificio,
      'piso-modulo',
      this.idPiso,
      'area-piso-modulo',
      idAreaPiso,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }
}
