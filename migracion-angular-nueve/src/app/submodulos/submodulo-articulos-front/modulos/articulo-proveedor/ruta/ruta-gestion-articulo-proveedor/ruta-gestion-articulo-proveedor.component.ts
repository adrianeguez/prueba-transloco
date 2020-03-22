import { Component, OnInit } from '@angular/core';
import {RUTAS_ARTICULO_PROVEEDOR} from '../definicion-rutas/rutas-articulo-proveedor';
import {AsignarArticuloProveedorComponent} from '../../modales/asignar-articulo-proveedor/asignar-articulo-proveedor.component';
import {ArticuloProveedorInterface} from '../../../../interfaces/articulo-proveedor.interface';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ArticulosProveedorRestService} from '../../../../servicios/rest/articulo-proveedor-rest.service';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EMPRESA_PROVEEDORES} from '../../../../../submodulo-empresa-front/modulos/empresa-proveedores/rutas/definicion-rutas/rutas-empresa-proveedores';
import {toastErrorEditar, toastExitoEditar} from '../../../../../../constantes/mensajes-toaster';
import {EmpresaProveedoresInterface} from '../../../../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';

@Component({
  selector: 'app-ruta-gestion-articulo-proveedor',
  templateUrl: './ruta-gestion-articulo-proveedor.component.html',
  styleUrls: ['./ruta-gestion-articulo-proveedor.component.scss']
})
export class RutaGestionArticuloProveedorComponent
  extends RutaConMigasDePanTablaBusqueda<ArticuloProveedorInterface,
    ArticulosProveedorRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {articulo: 'articulo', header: 'Código'},
    {articulo: 'articulo', header: 'Nombre'},
    {habilitado: 'habilitado', header: 'Estado'},
  ];
  habilitado: boolean;
  empresaProveedor: EmpresaProveedoresInterface;
  idEmpresaProveedor: number;
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _articuloProveedorRestService: ArticulosProveedorRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _articuloProveedorRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
  }

  ngOnInit() {
    this.habilitado = false;
    this._activatedRoute
      .params
      .subscribe(valor => {
        // region: para activated copiar toda esta region
        this.idEmpresaProveedor = Number(valor.idEmpresaProveedor);
        this.ruta = RUTAS_ARTICULO_PROVEEDOR.gestionArticuloProveedor(
          false,
          true,
          [
            valor.idEmpresa,
            valor.idEmpresaProveedor
          ]).ruta;
        this.queryParams.relations = [
          {
            key: 'articulo',
            entidad: 'articulo',
            query: undefined
          },
          {
            key: 'empresaProveedores',
            entidad: 'empresaProveedor',
            query: [
              {
                campo: 'id',
                valor: this.idEmpresaProveedor,
              },
            ]
          },
        ];
        this.queryParams.skip = 0;
        this.queryParams.take = 10;
        this.queryParams.order = {
          id: 'DESC',
        };
        this.queryParams.camposABuscar = [];
        this.tipoBusqueda = 'findWhereOr';
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EMPRESA_PROVEEDORES.rutaGestionEmpresaProveedores(false,
            true,
            [valor.idEmpresa, this.idEmpresaProveedor]),
          RUTAS_ARTICULO_PROVEEDOR.gestionArticuloProveedor(false, true),
        ];
        this.habilitado = true;
        this.establecerMigas(rutas);
        // #endregion
        this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
      });
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
  }
  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = [
        {
          key: 'articulo',
          entidad: 'articulo',
          query: undefined
        },
        {
          key: 'empresaProveedores',
          entidad: 'empresaProveedor',
          query: [
            {
              campo: 'id',
              valor: this.idEmpresaProveedor,
            },
          ]
        },
      ];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = [];
      this.tipoBusqueda = 'findWhereOr';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.relations = [
        {
          key: 'articulo',
          entidad: 'articulo',
          query: [
            {
              campo: 'codigo',
              valor: `%25${busqueda}%25`,
              like: true,
            },
          ]
        },
        {
          key: 'empresaProveedores',
          entidad: 'empresaProveedor',
          query: [
            {
              campo: 'id',
              valor: this.idEmpresaProveedor,
            },
          ]
        },
      ];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = [];
      this.tipoBusqueda = 'findWhereOr';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalCrearArticuloProveedor(registro?) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.dialog.open(AsignarArticuloProveedorComponent, {
      width: '700px',
      data: {
        idEmpresaProveedor: this.idEmpresaProveedor,
        // mas campos que se manden al modal
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((respuesta: any) => {
          this.queryParams.relations = [
            {
              key: 'articulo',
              entidad: 'articulo',
              query: undefined
            },
            {
              key: 'empresaProveedores',
              entidad: 'empresaProveedor',
              query: [
                {
                  campo: 'id',
                  valor: this.idEmpresaProveedor,
                },
              ]
            },
          ];
          this.queryParams.skip = 0;
          this.queryParams.take = 10;
          this.queryParams.order = {
            id: 'DESC',
          };
          this.queryParams.camposABuscar = [];
          this.tipoBusqueda = 'findWhereOr';
          this._articuloProveedorRestService.findWhereOr('criterioBusqueda=' + JSON.stringify(this.queryParams))
            .subscribe(
              r => {
                this.values = r[0];
                this.totalRecords = r[1];
              }
            );
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
        }
      );
  }

  actualizarEstadoArticuloProveedor(registro) {
    this.optionalParams = {registroActual: undefined};
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado ? 0 : 1;
    this._articuloProveedorRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        (registroActualizado) => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = registroActualizado.habilitado;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error({
            error,
            mensaje: 'Error actualizando estado',
          });
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }
}
