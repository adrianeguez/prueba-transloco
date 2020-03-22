import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { SubgrupoRestService } from '../../../../servicios/rest/subgrupo-rest.service';
import { RUTAS_GRUPOS } from '../../../grupo/rutas/definicion-rutas/rutas-grupos';
import { WIDTH_MODAL_SUBGRUPO } from '../../constantes/tamanio-modal-subgrupo';
import { CrearEditarSubgrupoComponent } from '../../modales/crear-editar-subgrupo/crear-editar-subgrupo.component';
import { RUTAS_SUBGRUPO } from '../definicion-rutas/rutas-subgrupo';
// tslint:disable-next-line: max-line-length
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  ToastErrorEstado,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from './../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { OPCIONES_SI_NO } from './../../../../enums/si-no';
import { SubgrupoInterface } from './../../../../interfaces/subgrupo.interface';
import { RUTAS_MENU_ARTICULO } from './../../../../ruta/definicion-rutas/rutas-menu';
import { GrupoRestService } from './../../../../servicios/rest/grupo-rest.service';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-subgrupos',
  templateUrl: './ruta-gestion-subgrupos.component.html',
  styleUrls: ['./ruta-gestion-subgrupos.component.sass'],
})
export class RutaGestionSubgruposComponent
  extends RutaConMigasDePanTablaBusqueda<
    SubgrupoInterface,
    SubgrupoRestService,
    ToasterService
  >
  implements OnInit {
  nombrePadre: string;
  opcionesSiNo = OPCIONES_SI_NO;
  estados = ESTADOS;
  idGrupo: number;
  rows = NUMERO_FILAS_TABLAS;
  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'empresaProductora', header: 'Empresa productora' },
    { field: 'codigo', header: 'Código' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  constructor(
    protected readonly _emitirMigaPanService: EmitirMigaPanService,
    protected readonly _cargandoService: CargandoService,
    protected readonly dialog: MatDialog,
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _router: Router,
    protected readonly _subgrupoRestService: SubgrupoRestService,
    protected readonly _toasterServicePrivate: ToasterService,
    private readonly _grupoRestService: GrupoRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _subgrupoRestService,
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
    this._activatedRoute.params.subscribe(parametros => {
      this.idGrupo = +parametros.idGrupo;
      this._grupoRestService.findOne(this.idGrupo).subscribe(
        respuesta => {
          this._cargandoService.deshabilitarCargando();
          this.nombrePadre = respuesta.nombre;
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        },
      );
      this.ruta = RUTAS_SUBGRUPO.rutaGestionSubgrupo(true, false, [
        this.idGrupo,
      ]);
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
        RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
        RUTAS_GRUPOS.rutaGestionGrupo(false, true),
        RUTAS_SUBGRUPO.rutaGestionSubgrupo(false, true, [this.idGrupo]),
      ];
      this.establecerMigas(rutas);
      this.escucharCambiosEnQueryParams();
      this.escucharCambiosEnParametros();
      this._cargandoService.deshabilitarCargando();
    });
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : { grupo: this.idGrupo };
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

  buscarSubgrupoPorNombreOCodigoOCodigoAuxiliar(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    const where = [
      {
        nombre: `Like(\"%25${valorBusqueda}%25\")`,
        grupo: this.idGrupo,
      },
      {
        codigo: `Like(\"%25${valorBusqueda}%25\")`,
        grupo: this.idGrupo,
      },
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      ['grupo'],
      this.tipoBusqueda,
    );
  }

  seteoEstadoSeleccionado(value) {
    this._cargandoService.habilitarCargando();
    this.optionalParams = { registroActual: undefined };
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      grupo: this.idGrupo,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      ['grupo'],
      this.tipoBusqueda,
    );
    this._cargandoService.deshabilitarCargando();
  }

  abrirModalCrearSubgrupo() {
    const dialogRef = this.dialog.open(CrearEditarSubgrupoComponent, {
      width: WIDTH_MODAL_SUBGRUPO,
      data: { idGrupo: this.idGrupo },
    });

    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe(
      (registroCreado: SubgrupoInterface) => {
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

  abrirModalEditarSubgrupo(registro: any) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarSubgrupoComponent, {
      width: WIDTH_MODAL_SUBGRUPO,
      data: { subgrupo: registro },
    });

    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe(
      (registroEditado: SubgrupoInterface) => {
        if (registroEditado) {
          this.optionalParams = { registroActual: registroEditado.id };
          this.values.splice(indiceRegistro, 1, registroEditado);
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  actualizarEstado(registro: SubgrupoInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const grupoEnArreglo = this.values.find(grupo => registro.id === grupo.id);
    const indiceGrupo = this.values.indexOf(grupoEnArreglo);
    this._subgrupoRestService.updateOne(registro.id, { habilitado }).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this.values[indiceGrupo].habilitado = habilitado
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

  irAGestionModuloHijo(idSubgrupo: number, moduloHijo: string) {
    const ruta = [
      'configuraciones/articulo',
      'grupo-modulo',
      this.idGrupo,
      'subgrupo-modulo',
      idSubgrupo,
      moduloHijo + '-modulo',
      'gestion',
    ];
    this._router.navigate(ruta, {
      queryParams: {
        order: JSON.stringify(this.queryParams.order),
        skip: 0,
        take: NUMERO_FILAS_TABLAS,
        where: JSON.stringify({ subgrupo: idSubgrupo }),
        relations: JSON.stringify(['subgrupo']),
      },
    });
  }
}
