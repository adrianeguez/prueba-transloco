import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { TipoImpuestoRestService } from '../../../../servicios/rest/tipo-impuesto-rest.service';
import { WIDTH_MODAL_TIPO_IMPUESTO } from '../../constantes/tamanio-modal-tipo-impuesto';
import {
  toastErrorEditar,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from './../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { TipoImpuestoInterface } from './../../../../interfaces/tipo-impuesto.interface';
import { RUTAS_MENU_ARTICULO } from './../../../../ruta/definicion-rutas/rutas-menu';
import { CrearEditarTipoImpuestoComponent } from './../../modales/crear-editar-tipo-impuesto/crear-editar-tipo-impuesto.component';
import { RUTAS_TIPOS_IMPUESTOS } from './../definicion-rutas/rutas-tipo-impuesto';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-tipo-impuesto',
  templateUrl: './ruta-gestion-tipo-impuesto.component.html',
  styleUrls: ['./ruta-gestion-tipo-impuesto.component.sass'],
})
export class RutaGestionTipoImpuestoComponent
  extends RutaConMigasDePanTablaBusqueda<
    TipoImpuestoInterface,
    TipoImpuestoRestService,
    ToasterService
  >
  implements OnInit {
  estados = ESTADOS;
  rows = NUMERO_FILAS_TABLAS;
  columnas = [
    { field: 'nombre', header: 'Nombre Impuesto' },
    { field: 'descripcion', header: 'Descripcion' },
    { field: 'codigoSri', header: 'Codigo SRI' },
    { field: 'siglas', header: 'Siglas' },
    { field: 'codigo', header: 'Codigo' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected dialog: MatDialog,
    protected _router: Router,
    protected _tipoImpuestoRestService: TipoImpuestoRestService,
    protected _toasterServicePrivate: ToasterService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _tipoImpuestoRestService,
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
    this.ruta = RUTAS_TIPOS_IMPUESTOS.rutaGestionTipoImpuesto(true, false);
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
      RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
      RUTAS_TIPOS_IMPUESTOS.rutaGestionTipoImpuesto(false, true),
    ];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
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
    );
    this.loading = false;
  }

  buscarTipoImpuestoPorNombreOCodigoSriOSiglas(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    const where = [
      { nombre: `Like(\"%25${valorBusqueda}%25\")` },
      { codigo: `Like(\"%25${valorBusqueda}%25\")` },
      { codigoSri: `Like(\"%25${valorBusqueda}%25\")` },
      { siglas: `Like(\"%25${valorBusqueda}%25\")` },
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
    const where = { habilitado: estadoSeleccionado };
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

  abrirModalCreartipoImpuesto() {
    const dialogRef = this.dialog.open(CrearEditarTipoImpuestoComponent, {
      width: WIDTH_MODAL_TIPO_IMPUESTO,
      data: { tipoImpuesto: undefined },
    });

    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe(
      (registroCreado: TipoImpuestoInterface) => {
        if (registroCreado) {
          this.optionalParams = { registroActual: registroCreado.id };
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalEditartipoImpuesto(registro: any) {
    const indiceTipoImpuesto = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarTipoImpuestoComponent, {
      width: WIDTH_MODAL_TIPO_IMPUESTO,
      data: { tipoImpuesto: registro },
    });

    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe(
      (registroEditado: TipoImpuestoInterface) => {
        if (registroEditado) {
          this.optionalParams = { registroActual: registroEditado.id };
          this.values.splice(indiceTipoImpuesto, 1, registroEditado);
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  actualizarEstado(registro: TipoImpuestoInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const tipoImpuestoEnArreglo = this.values.find(
      tipoImpuesto => tipoImpuesto.id === registro.id,
    );
    const indiceTipoImpuesto = this.values.indexOf(tipoImpuestoEnArreglo);
    this._tipoImpuestoRestService
      .updateOne(registro.id, { habilitado })
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceTipoImpuesto].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  irAGestionModuloHijo(idTipoImpuesto: number, moduloHijo: string) {
    const ruta = [
      'configuraciones/articulo' + '/tipo-impuesto-modulo',
      idTipoImpuesto,
      moduloHijo + '-modulo',
      'gestion',
    ];
    this._router.navigate(ruta, {
      queryParams: {
        order: JSON.stringify(this.queryParams.order),
        skip: 0,
        take: NUMERO_FILAS_TABLAS,
        where: JSON.stringify({ tipoImpuesto: idTipoImpuesto }),
        relations: JSON.stringify(['tipoImpuesto']),
      },
    });
  }
}
