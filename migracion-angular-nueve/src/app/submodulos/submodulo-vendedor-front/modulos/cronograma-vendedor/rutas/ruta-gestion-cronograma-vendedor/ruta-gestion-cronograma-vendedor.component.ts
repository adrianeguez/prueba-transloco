import {Component, OnInit} from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {CronogramaCabeceraRestService} from '../../../../servicios/rest/cronograma-cabecera-rest.service';
import {CronogramaVendedorCabeceraInterface} from '../../../../interfaces/cronograma-vendedor-cabecera-interface';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_GESTION_CRONOGRAMAS} from '../definicion-rutas/gestion-cronograma';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {MatDialog} from '@angular/material';
import {ModalCrearEditarCronoCabeceraComponent} from '../../modales/modal-crear-editar-crono-cabecera/modal-crear-editar-crono-cabecera/modal-crear-editar-crono-cabecera.component';
import {ModalCrearEditarCronoDetalleComponent} from '../../modales/modal-crear-editar-crono-detalle/modal-crear-editar-crono-detalle/modal-crear-editar-crono-detalle.component';
import {ESTADOS} from '../../../../../../enums/estados';
import {
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {RutaRestService} from '../../../../servicios/rest/ruta-rest.service';

@Component({
  selector: 'app-ruta-gestion-cronograma-vendedor',
  templateUrl: './ruta-gestion-cronograma-vendedor.component.html',
  styleUrls: ['./ruta-gestion-cronograma-vendedor.component.scss'],
})
export class RutaGestionCronogramaVendedorComponent
  extends RutaConMigasDePanTablaBusqueda<CronogramaVendedorCabeceraInterface,
    CronogramaCabeceraRestService,
    ToasterService>
  implements OnInit {
  camposABuscar = [];

  rows = NUMERO_FILAS_TABLAS;

  columnas = [
    {field: 'nombreCronograma', header: 'Nombre', width: '10%'},
    {field: 'habilitado', header: 'Estado', width: '10%'},
    {field: 'id', header: 'Acciones', width: '10%'},
  ];

  estados = ESTADOS;

  habilitado = true;

  idEmpresa = 0;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected readonly _cronogramaVendedorCabeceraRestService: CronogramaCabeceraRestService,
    protected readonly _rutaRestService: RutaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _cargandoService: CargandoService,
    public matDialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _cronogramaVendedorCabeceraRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.take = 10;
    this.queryParams.skip = 0;
    this.queryParams.order = {
      id: 'DESC',
    };
    this.queryParams.relations = ['ruta', 'empresa'];
    this.queryParams.where = {};
    this.queryParams.tipoBusqueda = 'findAll';
  }

  ngOnInit(): void {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe((params: { idEmpresa: string }) => {
      const idEmpresa = +params.idEmpresa;
      this.idEmpresa = idEmpresa;
      this.queryParams.where.empresa = idEmpresa;
      this.ruta = RUTAS_GESTION_CRONOGRAMAS.rutagestionCronograma(true, false, [
        idEmpresa,
      ]);
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
        RUTAS_GESTION_CRONOGRAMAS.rutagestionCronograma(false, true, [
          idEmpresa,
        ]),
      ];
      console.log('this.queryParams', this.queryParams);
      this.establecerMigas(rutas);
      this.escucharCambiosEnQueryParams();
      this.escucharCambiosEnParametros();
      this._cargandoService.deshabilitarCargando();
    });
  }

  abrirModalCrearCronogramaCabecera(registro?) {
    console.log('Registro', registro);

    if (registro) {
      this.establecerRegistroActual(registro.id);
    }

    // const registroRutaCopiado = JSON.parse(JSON.stringify(registro.ruta));
    // registro.ruta = registro.ruta.id;
    const dialogRef = this.matDialog.open(
      ModalCrearEditarCronoCabeceraComponent,
      {
        width: '700px',
        data: {
          cronogramaCabecera: registro,
          idEmpresa: this.idEmpresa,
        },
      },
    );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: any) => {
      if (registroCreado) {
        this._cargandoService.habilitarCargando();
        this._rutaRestService
          .findAll(
            'criterioBusqueda=' +
            JSON.stringify({where: {id: registroCreado.ruta}}),
          )
          .subscribe(
            ruta => {
              this._cargandoService.deshabilitarCargando();
              registroCreado.ruta = ruta[0][0];
              if (registro) {
                const indice = this.values.findIndex(r => r.id === registro.id);
                this.values[indice] = registroCreado;
              } else {
                this.values.unshift(registroCreado);
              }
            },
            error => {
              console.error({
                error,
                mensaje: 'Error consultando ruta',
              });
              this._cargandoService.deshabilitarCargando();
              this.values.unshift(registroCreado);
            },
          );
      } else {
        console.warn({
          error: 400,
          mensaje: 'No selecciono nada',
        });
      }
    });
  }

  actualizarEstado(registro) {
    this.optionalParams = {registroActual: undefined};
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._cronogramaVendedorCabeceraRestService
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
          console.error({
            error,
            mensaje: 'Error actualizando estado',
          });
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  irRutaDetalle(registro) {
    const url = (this.ruta = RUTAS_GESTION_CRONOGRAMAS.rutagestionCronogramaDetalle(
      true,
      false,
      [this.idEmpresa, registro.id, registro.ruta.id],
    ));
    this._router.navigate(url);
  }

  buscarPorNombreODescripcion(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = ['ruta', 'empresa'];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        empresa: this.idEmpresa,
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.relations = ['ruta', 'empresa'];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = [
        {
          nombreCronograma: `Like("%25${busqueda}%25")`,
          empresa: this.idEmpresa,
        },
        {
          descripcion: `Like("%25${busqueda}%25")`,
          empresa: this.idEmpresa,
        }
      ];
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }
}
