import {EmpresaRestService} from './../../../../../submodulo-empresa-front/servicios/rest/empresa-rest.service';
import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {ContactoEmpresaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/contacto-empresa-rest.service';
import {TAMANIO_MODAL_SELECT} from '../../../../constantes/tamanios-componentes';
import {DatosVendedorInterface} from '../../../../interfaces/datos-vendedor-interface';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {TipoVendedorRestService} from '../../../../servicios/rest/tipo-vendedor-rest.service';
import {AsignarPeriodoVentaComponent} from '../../modales/asignar-periodo-venta/asignar-periodo-venta.component';
import {AsignarTipoVendedorComponent} from '../../../tipo-datos-vendedor/modales/asignar-tipo-vendedor/asignar-tipo-vendedor.component';
import {CrearEditarDatosVendedorComponent} from '../../modales/crear-editar-datos-vendedor/crear-editar-datos-vendedor.component';
import {RUTAS_DATOS_VENDEDOR} from '../definicion-rutas/rutas-datos-vendedor';
import {AnadirDatosVendedorComponent} from '../../modales/anadir-datos-vendedor/anadir-datos-vendedor.component';

@Component({
  selector: 'ml-ruta-gestion-datos-vendedor',
  templateUrl: './ruta-gestion-datos-vendedor.component.html',
  styleUrls: ['./ruta-gestion-datos-vendedor.component.scss'],
})
export class RutaGestionDatosVendedorComponent
  extends RutaConMigasDePanTablaBusqueda<DatosVendedorInterface,
    DatosVendedorRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  idEmpresa: number;
  rows = NUMERO_FILAS_TABLAS;
  estados = ESTADOS;
  columnas = [
    {field: 'nombreVendedor', header: 'Nombre', width: '25%'},
    {field: 'documento', header: 'Documento de identidad', width: '10%'},
    {field: 'fechaIngreso', header: 'Fechas', width: '15%'},
    {field: 'habilitado', header: 'Estado', width: '10%'},
    {field: 'id', header: 'Acciones', width: '40%'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected _datosVendedorRestService: DatosVendedorRestService,
    protected _contactoEmpresaRestService: ContactoEmpresaRestService,
    protected _tipoVendedorRestService: TipoVendedorRestService,
    protected _empresaRestService: EmpresaRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _datosVendedorRestService,
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
    this._activatedRoute.params.subscribe(r => {
        this.idEmpresa = +r.idEmpresa;
        this._empresaRestService.findOne(this.idEmpresa).subscribe(
          respuesta => {
            this.nombrePadre = respuesta.razonSocial;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_DATOS_VENDEDOR.rutaGestionDatosVendedor(true, false, [
          this.idEmpresa,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_DATOS_VENDEDOR.rutaGestionDatosVendedor(false, true, [
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
        this._toasterServicePrivate.pop(toastErrorConexionServidor);
      }
    );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : {empresaId: this.idEmpresa};
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

  buscarPorNombreTipoDocumentoOCodigo(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    const where = [
      {
        nombreVendedor: `Like(\"%25${valorBusqueda}%25\")`,
        empresaId: this.idEmpresa,
      },
      {
        documento: `Like(\"%25${valorBusqueda}%25\")`,
        empresaId: this.idEmpresa,
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

  escucharEstadoSeleccionado(value) {
    this._cargandoService.habilitarCargando();
    this.optionalParams = {registroActual: undefined};
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {habilitado: estadoSeleccionado};
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
    this._cargandoService.deshabilitarCargando();
  }

  actualizarEstado(registro: DatosVendedorInterface) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._datosVendedorRestService
      .updateOne(registro.id, {habilitado})
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

  abrirModalAnadirDatosVendedor() {
    const dialogRef = this.dialog.open(AnadirDatosVendedorComponent, {
      width: '1000px',
      data: {idEmpresa: this.idEmpresa},
    });
    dialogRef
      .afterClosed()
      .subscribe((registroCreado) => {
        if (registroCreado) {
          this.optionalParams = {registroActual: registroCreado.id};
          this.values.unshift(...registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      });
  }

  abrirModalAsignarPeriodoVenta(registro) {
    const dialogRef = this.dialog.open(AsignarPeriodoVentaComponent, {
      width: TAMANIO_MODAL_SELECT,
      data: {
        registro: registro,
        idEmpresa: this.idEmpresa,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(
        () => {
        });
  }

  abrirModalEditarDatosVendedor(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarDatosVendedorComponent, {
      width: '850px',
      data: {datosVendedor: registro},
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: DatosVendedorInterface) => {
        if (registroEditado) {
          this.optionalParams = {registroActual: registroEditado.id};
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      });
  }

  irAGestionModuloHijo(
    idVendedor: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'vendedor-modulo',
      idVendedor,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(
      ruta,
      // {
      //   queryParams: {
      //     order: JSON.stringify(this.queryParams.order),
      //     skip: 0,
      //     take: NUMERO_FILAS_TABLAS,
      //     where: JSON.stringify({ datosVendedor: idVendedor }),
      //   }
      // }
    );
  }
}
