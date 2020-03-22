import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaConMigasDePanTablaBusqueda } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { MigaDePanInterface } from 'man-lab-ng/rutas/interfaces/miga-de-pan-interface';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { TipoVendedorInterface } from '../../../../interfaces/tipo-vendedor-interface';
import { TipoVendedorRestService } from '../../../../servicios/rest/tipo-vendedor-rest.service';
import { CrearEditarTipoVendedorComponent } from '../../modales/crear-editar-tipo-vendedor/crear-editar-tipo-vendedor.component';
import { RUTAS_TIPO_VENDEDOR } from '../definicion-rutas/rutas-tipo-vendedor';
import { RUTAS_EMPRESA } from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import { EmpresaRestService } from '../../../../../submodulo-empresa-front/servicios/rest/empresa-rest.service';

@Component({
  selector: 'ml-ruta-gestion-tipo-vendedor',
  templateUrl: './ruta-gestion-tipo-vendedor.component.html',
  styleUrls: ['./ruta-gestion-tipo-vendedor.component.scss'],
})
export class RutaGestionTipoVendedorComponent
  extends RutaConMigasDePanTablaBusqueda<
    TipoVendedorInterface,
    TipoVendedorRestService,
    ToasterService
  >
  implements OnInit {
  idEmpresa: number;
  nombrePapa: string;
  estados = ESTADOS;
  columnas = [
    { field: 'nombre', header: 'Tipo vendedor' },
    { field: 'codigo', header: 'Código' },
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
    protected _tipoVendedorRestService: TipoVendedorRestService,
    protected _empresaRestService: EmpresaRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _tipoVendedorRestService,
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
        this.ruta = RUTAS_TIPO_VENDEDOR.rutaGestionTipoVendedor(true, false, [
          this.idEmpresa,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_TIPO_VENDEDOR.rutaGestionTipoVendedor(false, true, [
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

  buscarPorTipoOCodigo(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    const where = [
      {
        nombre: `Like(\"%25${valorBusqueda}%25\")`,
        empresa: this.idEmpresa,
      },
      {
        codigo: `Like(\"%25${valorBusqueda}%25\")`,
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

  actualizarEstado(registro: TipoVendedorInterface) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._tipoVendedorRestService
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

  abrirModalCrearTipoVendedor() {
    const dialogRef = this.dialog.open(CrearEditarTipoVendedorComponent, {
      width: '950px',
      data: {
        tipoVendedor: undefined,
        idEmpresa: this.idEmpresa,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: TipoVendedorInterface) => {
      if (registroCreado) {
        this.optionalParams = { registroActual: registroCreado.id };
        this.values.unshift(registroCreado);
        this.optionalParams.registroActual = registroCreado.id;
      }
    });
  }

  abrirModalEditarTipoVendedor(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarTipoVendedorComponent, {
      width: '950px',
      data: { tipoVendedor: registro },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: TipoVendedorInterface) => {
        if (registroEditado) {
          this.optionalParams = { registroActual: registroEditado.id };
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      });
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
}
