import {Component, OnInit} from '@angular/core';
import {PedidoCursoInterface} from '../../interfaces/pedido-curso.interface';
import {PedidoCursoRestService} from '../../servicios/rest/pedido-curso-rest.service';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_PEDIDO_CURSO} from '../definicion-rutas/rutas-pedido-curso';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../../../submodulo-empresa-front/modulos/edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../../../submodulo-empresa-front/modulos/establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {CrearEditarPedidoCursoComponent} from '../../modales/crear-pedido-curso/crear-editar-pedido-curso/crear-editar-pedido-curso.component';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../../../submodulo-empresa-front/modulos/servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
import {TranslocoService} from '@ngneat/transloco';
import {RUTA_TRADUCCION_GESTION_PEDIDO_CURSO} from '../../constantes/ruta-traduccion-pedido';

@Component({
  selector: 'app-ruta-gestion-pedido-curso',
  templateUrl: './ruta-gestion-pedido-curso.component.html',
  styleUrls: ['./ruta-gestion-pedido-curso.component.scss']
})

export class RutaGestionPedidoCursoComponent
  extends RutaConMigasDePanTablaBusqueda<PedidoCursoInterface,
    PedidoCursoRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'fecha',
      header: 'Fecha',
      llaveATraducir: 'fecha',
      traduccion: ''
    },
    {
      field: 'nombre',
      header: 'Nombre',
      llaveATraducir: 'nombre',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: ''
    },
  ];

  habilitar: boolean;
  idEmpresa: number;
  idEdificio: number;
  idEstablecimiento: number;
  idServicio: number;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _pedidoCursoRestService: PedidoCursoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _pedidoCursoRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      RUTA_TRADUCCION_GESTION_PEDIDO_CURSO,
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
    this.traducirColumnas('tablas');
  }

  ngOnInit() {
    this.habilitar = false;
    this._cargandoService.habilitarCargando();
    // cargar con activated route y setear el habilitar
    this._activatedRoute.params.subscribe(
      (parametros: {
        idEmpresa: string,
        idEdificio: string,
        idEstablecimiento: string,
        idServicio: string
      }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idEdificio = +parametros.idEdificio;
        this.idEstablecimiento = +parametros.idEstablecimiento;
        this.idServicio = +parametros.idServicio;
        this.ruta = RUTAS_PEDIDO_CURSO.rutaGestionPedidoCurso(
          false,
          true, [
            // parametros
            this.idEmpresa,
            this.idEdificio,
            this.idEstablecimiento,
            this.idServicio
          ]).ruta;
        this.habilitar = true;

        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(
            false,
            true),
          RUTAS_EMPRESA.rutaGestionEmpresa(
            false,
            true),
          RUTAS_EDIFICIO.rutaGestionEdificio(
            false,
            true, [
              this.idEmpresa
            ]),
          RUTAS_ESTABLECIMIENTO.rutaGestionEstablecimiento(
            false,
            true, [
              this.idEmpresa,
              this.idEdificio
            ]),
          RUTAS_SERVICIO_ESTABLECIMIENTO.rutaGestionServicio(
            false,
            true, [
              this.idEmpresa,
              this.idEdificio,
              this.idEstablecimiento
            ]
          ),
          RUTAS_PEDIDO_CURSO.rutaGestionPedidoCurso(
            false,
            true, [
              this.idEmpresa,
              this.idEdificio,
              this.idEstablecimiento,
              this.idServicio
            ]),
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {
      datosUsuario: {},
      horarioServicio: {
        horario: {},
        servicioPorEstablecimiento: {
          id: this.idServicio,
          articuloPorEmpresa: {
            articulo: {
              curso: {}
            }
          }
        }
      }
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        datosUsuario: {},
        horarioServicio: {
          horario: {},
          servicioPorEstablecimiento: {
            id: this.idServicio,
            articuloPorEmpresa: {
              articulo: {
                curso: {}
              }
            }
          }
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        datosUsuario: {},
        horarioServicio: {
          horario: {},
          servicioPorEstablecimiento: {
            id: this.idServicio,
            articuloPorEmpresa: {
              articulo: {
                curso: {
                  nombre: `Like(\"%25${busqueda}%25\")`,
                }
              }
            }
          }
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalVerMasPedidoCurso(registro: PedidoCursoInterface) {
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarPedidoCursoComponent, {
      width: '500px',
      data: {pedidoCurso: registro},
    });
  }
}
