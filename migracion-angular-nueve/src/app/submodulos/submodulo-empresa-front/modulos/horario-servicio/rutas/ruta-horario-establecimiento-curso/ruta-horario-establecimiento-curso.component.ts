import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {HorarioServicioRestService} from '../../servicios/rest/horario-servicio.rest.service';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {HorarioServicioInterface} from '../../interfaces/horario-servicio.interface';
import {RUTAS_HORARIO_SERVICIO} from '../definicion-rutas/rutas-horario-servicio';
import {RUTAS_CURSO} from '../../../../../submodulo-certificados-cursos-frontend/modulos/curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../../../servicio-establecimiento/rutas/definicion-rutas/definicion-rutas-servicio-establecimiento';
// tslint:disable-next-line:max-line-length
import {CrearEditarPedidoCursoComponent} from '../../../../../submodulo-certificados-cursos-frontend/modulos/pedido/modales/crear-pedido-curso/crear-editar-pedido-curso/crear-editar-pedido-curso.component';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {TranslocoService} from '@ngneat/transloco';
import {RUTA_TRADUCCION_HORARIO_SERVICIO_CURSO} from '../../constantes/ruta-traduccion-horario-servicio';

@Component({
  selector: 'app-ruta-horario-establecimiento-curso',
  templateUrl: './ruta-horario-establecimiento-curso.component.html',
  styleUrls: ['./ruta-horario-establecimiento-curso.component.scss']
})

export class RutaHorarioEstablecimientoCursoComponent
  extends RutaConMigasDePanTablaBusqueda<HorarioServicioInterface,
    HorarioServicioRestService,
    ToasterService>
  implements OnInit {
  columnas = [

    {
      field: 'habilitado',
      header: 'Horario',
      llaveATraducir: 'horario',
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

  idEstablecimiento: number;
  idCurso: number;
  usuario;


  diasSemana = {
    lunes: 'lunes',
    martes: 'martes',
    miercoles: 'miercoles',
    jueves: 'jueves',
    viernes: 'viernes',
    sabado: 'sabado',
    domingo: 'domingo',
  };
  rutaConTraduccion = RUTA_TRADUCCION_HORARIO_SERVICIO_CURSO;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    private _auth0Service: Auth0Service,
    protected _horarioServicioRestService: HorarioServicioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _horarioServicioRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      RUTA_TRADUCCION_HORARIO_SERVICIO_CURSO,
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
    this._activatedRoute.params.subscribe(
      (parametros: { idCurso: string, idServicioEstablecimiento: string }) => {
        this.usuario = this._auth0Service.empresasEnLasQueTrabaja[0].datoUsuario;
        this.idCurso = +parametros.idCurso;
        this.idEstablecimiento = +parametros.idServicioEstablecimiento;
        // cargar con activated route y setear el habilitar
        this.ruta = RUTAS_HORARIO_SERVICIO.rutaHorarioEstablecimientoCurso(
          false,
          true,
          [
            this.idCurso,
            this.idEstablecimiento
            // parametros
          ]).ruta;
        this.habilitar = true;

        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_CLIENTE.rutaInicio(
            false,
            true),
          RUTAS_CURSO.rutaMenuInicioUsuarioCurso(
            false,
            true),
          RUTAS_CURSO.rutaMenuMisCursos(
            false,
            true),
          RUTAS_SERVICIO_ESTABLECIMIENTO.rutaEstablecimientosCurso(
            false,
            true, [
              this.idCurso
            ]),
          RUTAS_HORARIO_SERVICIO.rutaHorarioEstablecimientoCurso(
            false,
            true,
            [
              this.idCurso,
              this.idEstablecimiento])
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {
      habilitado: 1,
      horario: {},
      contactosHorarioServicio: {},
      pedidosCurso: {
        mlabJoin: 'left',
        datosUsuario: {
          mlabJoin: 'left',
          id: this.usuario.id
        }
      },
      servicioPorEstablecimiento: {
        id: this.idEstablecimiento,
        articuloPorEmpresa: {
          articulo: {
            esCurso: 1,
            curso: {
              id: this.idCurso
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
      // this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        habilitado: 1,
        horario: {},
        contactosHorarioServicio: {},
        pedidosCurso: {
          mlabJoin: 'left',
          datosUsuario: {
            mlabJoin: 'left',
            id: this.usuario.id
          }
        },
        servicioPorEstablecimiento: {
          id: this.idEstablecimiento,
          articuloPorEmpresa: {
            articulo: {
              esCurso: 1,
              curso: {
                id: this.idCurso
              }
            }
          }
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      // this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        habilitado: 1,
        horario: {
          descripcion: `Like(\"%25${busqueda}%25\")`
        },
        contactosHorarioServicio: {},
        pedidosCurso: {
          mlabJoin: 'left',
          datosUsuario: {
            mlabJoin: 'left',
            id: this.usuario.id
          }
        },
        servicioPorEstablecimiento: {
          id: this.idEstablecimiento,
          articuloPorEmpresa: {
            articulo: {
              esCurso: 1,
              curso: {
                id: this.idCurso
              }
            }
          }
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  mostrarDiasDisponibles(horarios) {
    const horarioClonado = {
      ...horarios
    };
    let diasDisponibles: any[] = [];
    diasDisponibles = Object.keys(horarioClonado)
      .map((llave) => {
        if (horarioClonado[llave] === 1) {
          return this.diasSemana[llave];
        }
      });
    return diasDisponibles;
  }

  irAModalPedido(horario) {
    this.establecerRegistroActual(horario.id);
    const dialogRef = this.dialog.open(CrearEditarPedidoCursoComponent, {
      width: '600px',
      data: {
        producto: horario.servicioPorEstablecimiento.articuloPorEmpresa,
        precio: horario.servicioPorEstablecimiento.precio,
        usuario: this.usuario,
        idUsuario: this._auth0Service.datosUsuario.user_id,
        pedidoCurso: undefined,
        horarioServicio: horario
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado) => {
      if (registroCreado) {
        // mostrar algo .-.
      }
    }, error => {
      console.error({error, mensaje: 'Error creando registro', data: horario});
    });
  }
}
