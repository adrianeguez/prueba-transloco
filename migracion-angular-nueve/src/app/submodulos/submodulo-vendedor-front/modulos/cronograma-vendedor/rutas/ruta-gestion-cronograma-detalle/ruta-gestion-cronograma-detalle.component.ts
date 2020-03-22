import {Component, OnInit} from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CronogramaVendedorInterface} from '../../../../interfaces/cronograma-vendedor-interface';
import {CronogramaDetalleRestService} from '../../../../servicios/rest/cronograma-detalle-rest.service';
import {RUTAS_GESTION_CRONOGRAMAS} from '../definicion-rutas/gestion-cronograma';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {ModalCrearEditarCronoDetalleComponent} from '../../modales/modal-crear-editar-crono-detalle/modal-crear-editar-crono-detalle/modal-crear-editar-crono-detalle.component';
import {RutaClienteRestService} from '../../../../servicios/rest/ruta-cliente-rest.service';

@Component({
  selector: 'app-ruta-gestion-cronograma-detalle',
  templateUrl: './ruta-gestion-cronograma-detalle.component.html',
  styleUrls: ['./ruta-gestion-cronograma-detalle.component.scss'],
})
export class RutaGestionCronogramaDetalleComponent
  extends RutaConMigasDePanTablaBusqueda<CronogramaVendedorInterface,
    CronogramaDetalleRestService,
    ToasterService>
  implements OnInit {
  camposABuscar = [];

  rows = NUMERO_FILAS_TABLAS;

  columnas = [
    {field: 'orden', header: 'Orden', width: '10%'},
    {field: 'id', header: 'Días de la semana / Fecha', width: '10%'},
    {field: 'horaVisita', header: 'Hora visita', width: '10%'},
    {field: 'id', header: 'Acciones', width: '10%'},
  ];

  estados = ESTADOS;

  habilitado = true;

  idEmpresa = 0;
  idCronogramaCabecera = 0;
  idRuta = 0;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected readonly _cronogramaDetalleRestService: CronogramaDetalleRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _cargandoService: CargandoService,
    public matDialog: MatDialog,
    protected readonly _rutaClienteRestService: RutaClienteRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _cronogramaDetalleRestService,
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
    this.queryParams.where = {
      habilitado: true,
    };
    this.queryParams.relations = ['rutaCliente'];
    this.queryParams.tipoBusqueda = 'findAll';
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      (params: {
        idEmpresa: string;
        idCronogramaCabecera: string;
        idRuta: string;
      }) => {
        const idEmpresa = +params.idEmpresa;
        const idCronogramaCabecera = +params.idCronogramaCabecera;
        const idRuta = +params.idRuta;
        this.idEmpresa = idEmpresa;
        this.idCronogramaCabecera = idCronogramaCabecera;
        this.idRuta = idRuta;
        this.queryParams.where.cronogramaVendedorCabecera = idCronogramaCabecera;
        this.ruta = RUTAS_GESTION_CRONOGRAMAS.rutagestionCronogramaDetalle(
          true,
          false,
          [idEmpresa, idCronogramaCabecera, idRuta],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_GESTION_CRONOGRAMAS.rutagestionCronograma(false, true, [
            idEmpresa,
          ]),
          RUTAS_GESTION_CRONOGRAMAS.rutagestionCronogramaDetalle(false, true, [
            idEmpresa,
            idCronogramaCabecera,
            idRuta,
          ]),
        ];
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  abrirModalCrearEditar(registro?) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.matDialog.open(
      ModalCrearEditarCronoDetalleComponent,
      {
        width: '900px',
        data: {
          cronogramaDetalle: registro,
          idCronogramaCabecera: this.idCronogramaCabecera,
          idRuta: this.idRuta,
        },
      },
    );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: any) => {
      if (registroCreado) {
        const indice = this.values.findIndex(r => r.id === registro.id);
        this._cargandoService.habilitarCargando();
        this._rutaClienteRestService
          .findAll(
            'criterioBusqueda=' +
            JSON.stringify({where: {id: registroCreado.rutaCliente}}),
          )
          .subscribe(
            ruta => {
              this._cargandoService.deshabilitarCargando();
              registroCreado.rutaCliente = ruta[0][0];
              if (registro) {
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
