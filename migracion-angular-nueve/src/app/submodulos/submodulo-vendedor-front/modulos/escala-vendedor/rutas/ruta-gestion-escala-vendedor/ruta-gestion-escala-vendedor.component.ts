import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { CrearEditarEscalaVendedorComponent } from '../../modales/crear-editar-escala-vendedor/crear-editar-escala-vendedor.component';
import { RUTAS_ESCALA_VENDEDOR } from '../definicion-rutas/rutas-escala-vendedor';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { EscalaVendedorInterface } from '../../../../interfaces/escala-vendedor-interface';
import { EscalaVendedorRestService } from '../../../../servicios/rest/escala-vendedor-rest.service';
import { RUTAS_EMPRESA } from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import { EmpresaRestService } from '../../../../../submodulo-empresa-front/servicios/rest/empresa-rest.service';

@Component({
  selector: 'ml-ruta-gestion-escala-vendedor',
  templateUrl: './ruta-gestion-escala-vendedor.component.html',
  styleUrls: ['./ruta-gestion-escala-vendedor.component.scss'],
})
export class RutaGestionEscalaVendedorComponent
  extends RutaConMigasDePanTablaBusqueda<
    EscalaVendedorInterface,
    EscalaVendedorRestService,
    ToasterService
  >
  implements OnInit {
  idEmpresa: number;
  nombrePapa: string;
  estados = ESTADOS;
  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'maximo', header: 'Máximo' },
    { field: 'minimo', header: 'Mínimo' },
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
    private _escalaVendedorRestService: EscalaVendedorRestService,
    private readonly _empresaRestService: EmpresaRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _escalaVendedorRestService,
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
        this.ruta = RUTAS_ESCALA_VENDEDOR.rutaGestionEscalaVendedor(
          true,
          false,
          [this.idEmpresa],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_ESCALA_VENDEDOR.rutaGestionEscalaVendedor(false, true, [
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

  buscarPorNombre(busqueda: string) {
    this.optionalParams = { registroActual: undefined };
    const where = [
      {
        nombre: `Like(\"%25${busqueda}%25\")`,
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

  seteoEstadoSeleccionado(value) {
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

  actualizarEstado(registro: EscalaVendedorInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const escalaVendedorEnArreglo = this.values.find(
      grupo => registro.id === grupo.id,
    );
    const indiceEscalaVendedor = this.values.indexOf(escalaVendedorEnArreglo);
    this._escalaVendedorRestService
      .updateOne(registro.id, { habilitado })
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceEscalaVendedor].habilitado = habilitado
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

  abrirModalCrearEscalaVendedor() {
    const dialogRef = this.dialog.open(CrearEditarEscalaVendedorComponent, {
      width: '800px',
      data: {
        escalaVendedor: undefined,
        idEmpresa: this.idEmpresa,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: EscalaVendedorInterface) => {
      if (registroCreado) {
        this.optionalParams = { registroActual: registroCreado.id };
        this.values.unshift(registroCreado);
        this.optionalParams.registroActual = registroCreado.id;
      }
    });
  }

  abrirModalEditarEscalaVendedor(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarEscalaVendedorComponent, {
      width: '850px',
      data: { escalaVendedor: registro },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: EscalaVendedorInterface) => {
        if (registroEditado) {
          this.optionalParams = { registroActual: registroEditado.id };
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      });
  }
}
