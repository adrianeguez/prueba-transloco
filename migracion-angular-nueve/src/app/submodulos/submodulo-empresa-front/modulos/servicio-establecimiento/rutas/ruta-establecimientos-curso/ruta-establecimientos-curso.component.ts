import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {ServicioEstablecimientoInterface} from '../../interfaces/servicio-establecimiento.interface';
import {ServicioRestService} from '../../servicios/rest/servicios.rest.service';
import {RUTAS_SERVICIO_ESTABLECIMIENTO} from '../definicion-rutas/definicion-rutas-servicio-establecimiento';
import {RUTAS_CURSO} from '../../../../../submodulo-certificados-cursos-frontend/modulos/curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_HORARIO_SERVICIO} from '../../../horario-servicio/rutas/definicion-rutas/rutas-horario-servicio';
import {
  RUTA_TRADUCCION_ESTABLECIMIENTOS_CURSO
} from '../../constantes/rutas-traduccion-servicio-establecimiento';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-establecimientos-curso',
  templateUrl: './ruta-establecimientos-curso.component.html',
  styleUrls: ['./ruta-establecimientos-curso.component.scss']
})
// tslint:disable-next-line:max-line-length
export class RutaEstablecimientosCursoComponent
  extends RutaConMigasDePanTablaBusqueda<ServicioEstablecimientoInterface,
    ServicioRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'nombre',
      header: 'Establecimiento',
      llaveATraducir: 'nombre',
      traduccion: '',
    },
    {
      field: 'establecimiento.edificio.direccion',
      header: 'Dirección',
      llaveATraducir: 'direccion',
      traduccion: '',
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: '',
    },
  ];

  habilitar: boolean;
  idCurso: number;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _servicioRestService: ServicioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _servicioRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      RUTA_TRADUCCION_ESTABLECIMIENTOS_CURSO,
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
      (parametros: { idCurso: string }) => {
        this.idCurso = +parametros.idCurso;
        this.ruta = RUTAS_SERVICIO_ESTABLECIMIENTO.rutaEstablecimientosCurso(
          false,
          true,
          [this.idCurso]).ruta;
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
            true,
            [this.idCurso]),
        ];
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {
      articuloPorEmpresa: {
        articulo: {
          curso: {id: this.idCurso}
        }
      },
      establecimiento: {
        edificio: {
          direccion: {}
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
// condicion where
        articuloPorEmpresa: {
          articulo: {
            curso: {id: this.idCurso}
          }
        },
        establecimiento: {
          edificio: {
            direccion: {}
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
        articuloPorEmpresa: {
          articulo: {
            curso: {id: this.idCurso}
          }
        },
        establecimiento: {
          nombre:  `Like(\"%25${busqueda}%25\")`,
          edificio: {
            direccion: {}
          }
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }


  irGestionModuloHijo(idEstablecimiento: number) {
    const rutaHorarioEstablecimientoCurso = RUTAS_HORARIO_SERVICIO
      .rutaHorarioEstablecimientoCurso(
        false,
        true,
        [
          this.idCurso,
          idEstablecimiento
        ]
      ).ruta;
    this._router.navigate(
      rutaHorarioEstablecimientoCurso);
  }
}

