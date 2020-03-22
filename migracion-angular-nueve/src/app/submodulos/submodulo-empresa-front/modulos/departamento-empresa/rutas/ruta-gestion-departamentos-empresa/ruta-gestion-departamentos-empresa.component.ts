import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
// tslint:disable-next-line:max-line-length
import {DepartamentoEmpresaRestService} from '../../../../servicios/rest/departamento-empresa-rest.service';
// tslint:disable-next-line:max-line-length
import {CrearEditarDepartamentoEmpresaComponent} from '../../modales/crear-editar-departamento-empresa/crear-editar-departamento-empresa.component';
import {TreeNode} from 'primeng/api';
import {generarNodo} from '../../../../funciones/funciones-tree-table/generar-nodo';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_DEPARTAMENTO_EMPRESA} from '../definicion-rutas/rutas-departamento-empresa';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {DepartamentoTrabajadorInterface} from '../../../../interfaces/departamento-trabajador.interface';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {llenarArbolConRegistro} from '../../../../funciones/funciones-tree-table/llenar-arbol-con-registros';
import {generarArrayNodos} from '../../../../funciones/funciones-tree-table/generar-array-nodos';
import {escucharBusquedaArbol} from '../../../../funciones/funciones-tree-table/escuchar-busqueda-arbol';
import {obtenerBusquedaQueryParams} from '../../../../funciones/obtener-busqueda-query-params';
import {obtenerNombresCamposABuscarQueryParams} from '../../../../funciones/obtener-nombres-campos-a-buscar-query-params';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {DepartamentoEmpresaInterface} from '../../../../interfaces/departamento-empresa.interface';
import {ESTADOS} from '../../../../../../enums/estados';
import {WIDTH_MODAL_DEPARTAMENTO_EMPRESA} from '../../constantes/tamanio-modal.departamento-empresa';
import {EmpresaRestService} from '../../../../servicios/rest/empresa-rest.service';

@Component({
  selector: 'ml-gestion-departamentos-empresa',
  templateUrl: './ruta-gestion-departamentos-empresa.component.html',
  styleUrls: ['./ruta-gestion-departamentos-empresa.component.scss'],
})
export class RutaGestionDepartamentosEmpresaComponent
  extends RutaConMigasDePanTablaBusqueda<DepartamentoEmpresaInterface,
    DepartamentoEmpresaRestService,
    ToasterService>
  implements OnInit {
  departamentosEmpresaTreeTable: TreeNode[] = [];

  totalRegistros = 0;

  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  idEmpresa;
  columnas = [
    {field: 'nombre', header: 'Nombre', width: '40%'},
    {field: 'nivel', header: 'Nivel', width: '10%'},
    {field: 'habilitado', header: 'Estado', width: '20%'},
    {field: 'acciones', header: 'Acciones', width: '30%'},
  ];

  nombreModuloPadre;

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _departamentoEmpresaRestService: DepartamentoEmpresaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _departamentoEmpresaRestService,
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
      this.setearDepartamentosEmpresaEncontrados();
    }
    this.loading = false;
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      params => {
        this._cargandoService.deshabilitarCargando();
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
        this.ruta = RUTAS_DEPARTAMENTO_EMPRESA.rutaGestionDepartamentoEmpresa(
          true,
          false,
          [this.idEmpresa],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_DEPARTAMENTO_EMPRESA.rutaGestionDepartamentoEmpresa(
            false,
            true,
            [this.idEmpresa],
          ),
        ];
        this.queryParams.where = !this.queryParams.camposABuscar
          ? {empresa: this.idEmpresa, nivel: 0}
          : undefined;
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : ['departamentoEmpresaPadre'];
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

  setearDepartamentosEmpresaEncontrados() {
    setTimeout(() => {
      this.departamentosEmpresaTreeTable = generarArrayNodos(this.values);
      this.departamentosEmpresaTreeTable = [
        ...this.departamentosEmpresaTreeTable,
      ];
      this.totalRegistros = this.departamentosEmpresaTreeTable.length;
    }, 1000);
  }

  abrirModalCrearDepartamentoEmpresa(nodoPadre?) {
    const departamentoEmpresaPadre = nodoPadre
      ? nodoPadre.node.data
      : undefined;
    const dialogRef = this.dialog.open(
      CrearEditarDepartamentoEmpresaComponent,
      {
        width: WIDTH_MODAL_DEPARTAMENTO_EMPRESA,
        data: {idEmpresa: this.idEmpresa, departamentoEmpresaPadre},
      },
    );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: DepartamentoTrabajadorInterface) => {
        if (registroCreado) {
          if (!nodoPadre) {
            this.departamentosEmpresaTreeTable.unshift(
              generarNodo(registroCreado),
            );
          } else {
            this.expandirNodo(nodoPadre);
            if (!nodoPadre.node.expanded) {
              nodoPadre.node.expanded = true;
            }
          }
          this.departamentosEmpresaTreeTable = [
            ...this.departamentosEmpresaTreeTable,
          ];
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

  abrirModalEditarDepartamentoEmpresa(nodoAEditar) {
    const dialogRef = this.dialog.open(
      CrearEditarDepartamentoEmpresaComponent,
      {
        width: WIDTH_MODAL_DEPARTAMENTO_EMPRESA,
        data: {
          departamentoEmpresa: nodoAEditar.node.data,
          idEmpresa: this.idEmpresa,
        },
      },
    );
    dialogRef.afterClosed().subscribe(
      (registroEditado: DepartamentoEmpresaRestService) => {
        if (registroEditado) {
          nodoAEditar.node.data = registroEditado;
          this.optionalParams.registroActual = nodoAEditar.node.data.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  actualizarEstado(nodoRegistro) {
    this._cargandoService.habilitarCargando();
    const registro = nodoRegistro.node.data;
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._departamentoEmpresaRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
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
        empresa: this.idEmpresa,
        departamentoEmpresaPadre: nodoPadre.data.id,
      },
      order: {
        id: 'DESC',
      },
    };
    this._departamentoEmpresaRestService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        (respuesta: any) => {
          respuesta[0] = respuesta[0].map((r) => {
            r.nombrePapa = nodoPadre.data.nombre;
            return r;
          });
          nodoPadre.data.departamentosEmpresaHijos = respuesta[0];
          llenarArbolConRegistro(nodoPadre, 'departamentosEmpresaHijos');
          this.departamentosEmpresaTreeTable = [
            ...this.departamentosEmpresaTreeTable,
          ];
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }

  escucharEstadoSeleccionado(estado) {
    this.queryParams.camposABuscar = [
      {campo: 'habilitado', valor: `%25${estado}%25`},
    ];
    this.buscarDepartamentos(estado);
  }

  buscarPorNombre(busqueda) {
    this.queryParams.camposABuscar = [
      {campo: 'nombre', valor: `%25${busqueda}%25`},
    ];
    this.buscarDepartamentos(busqueda.trim());
  }

  buscarDepartamentos(busqueda) {
    this.busqueda = busqueda;
    this.optionalParams = {registroActual: undefined};
    const noSelecionoEstado = this.busqueda === undefined;
    if (this.busqueda === '' || noSelecionoEstado) {
      this.tipoBusqueda = 'findAll';
      const where = {
        nivel: 0,
        empresa: this.idEmpresa,
      };
      this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
        'departamentoEmpresaPadre',
      ], this.tipoBusqueda);
      this.setearDepartamentosEmpresaEncontrados();
    } else {
      this.tipoBusqueda = 'custom';
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        this.queryParams.order,
        undefined, this.tipoBusqueda
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
      idEmpresa: +this.idEmpresa,
      camposABuscar,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._cargandoService.habilitarCargando();
    this._departamentoEmpresaRestService
      .obtenerDepartamentoPadre(datos)
      .subscribe(
        respuesta => {
          this.values = respuesta[0];
          this.departamentosEmpresaTreeTable = generarArrayNodos(this.values);
          this.departamentosEmpresaTreeTable = [
            ...this.departamentosEmpresaTreeTable,
          ];
          this.departamentosEmpresaTreeTable.forEach(departamentoTreeTable => {
            llenarArbolConRegistro(
              departamentoTreeTable,
              'departamentosEmpresaHijos',
            );
          });
          escucharBusquedaArbol(
            this.departamentosEmpresaTreeTable,
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
    idDepartamentoEmpresa: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      +this.idEmpresa,
      'departamento-empresa-modulo',
      idDepartamentoEmpresa,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }

  imprimirNodo(a) {
    console.log(a);
  }
}
