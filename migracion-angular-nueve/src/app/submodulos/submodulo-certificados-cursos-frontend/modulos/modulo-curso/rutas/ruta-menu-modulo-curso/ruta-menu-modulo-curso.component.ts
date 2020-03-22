import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {RUTAS_MODULO_CURSO} from '../definicion-rutas/definicion-rutas-modulo';
import {ModuloCursoUsuarioRestService} from '../../servicios/rest/modulo-curso-usuario.rest.service';
import {ModuloCursoUsuarioInterface} from '../../interfaces/modulo-curso-usuario.interface';
import {MatDialog} from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {Observable, of} from 'rxjs';
import {ordenarElementos} from '../../../../funciones/funcionesOrdenamiento';
import {debounceTime, mergeMap} from 'rxjs/operators';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-menu-modulo-curso',
  templateUrl: './ruta-menu-modulo-curso.component.html',
  styleUrls: ['./ruta-menu-modulo-curso.component.scss']
})
// tslint:disable-next-line:max-line-length
export class RutaMenuModuloCursoComponent
  extends RutaConMigasDePanTablaBusqueda<ModuloCursoUsuarioInterface,
    ModuloCursoUsuarioRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'moduloCurso', header: 'Nombre', llaveATraducir: 'nombre', traduccion: ''},
    {field: 'moduloCurso', header: 'Descripcion', llaveATraducir: 'descripcion', traduccion: ''},
    {field: 'moduloCurso', header: 'Imagen', llaveATraducir: 'imagen', traduccion: ''},
    {field: 'estado', header: 'Estado', llaveATraducir: 'estado', traduccion: ''},
    {field: 'fechaInicio', header: 'Fecha Inicio', llaveATraducir: 'fechaInicio', traduccion: ''},
    {
      field: 'fechaFinalizacionModulo',
      header: 'Fecha Finalizacion',
      llaveATraducir: 'fechaFinalizacion',
      traduccion: ''
    },
    {
      field: 'diapositivasTotales',
      header: 'Progreso Diapositivas',
      llaveATraducir: 'progresoDiapositivas',
      traduccion: ''
    },
    {field: 'pruebasTotales', header: 'Progreso Pruebas', llaveATraducir: 'progresoPruebas', traduccion: ''},
    {field: 'diapositivaActual', header: 'Diapositiva Actual', llaveATraducir: 'diapositivaActual', traduccion: ''},
    {field: 'id', header: 'Acciones', llaveATraducir: 'id', traduccion: ''},
  ];

  habilitar: boolean;
  idCursoUsuario: number;
  idUsuario: number;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _moduloCursoUsuarioRestService: ModuloCursoUsuarioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    private readonly _auth0Service: Auth0Service,
    public dialog: MatDialog,
    protected translocoService: TranslocoService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _moduloCursoUsuarioRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      translocoService,
      'submoduloCertificadosCuros.moduloCursoModulo.rutas.rutaClienteModuloCurso'
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'ASC',
    };
    this.traducirColumnas('tablas');
  }

  ngOnInit() {
    this.habilitar = false;
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      (parametros: { idCurso: string }) => {
        this.idUsuario = +this._auth0Service.empresasEnLasQueTrabaja[0].datoUsuario.id;
        this.idCursoUsuario = +parametros.idCurso;
        this.ruta = RUTAS_MODULO_CURSO.rutaMenuModuloCurso(
          false,
          true,
          [
            this.idCursoUsuario
          ]
        ).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CLIENTE.rutaInicio(false, true),
          RUTAS_CURSO.rutaMenuInicioUsuarioCurso(false, true),
          RUTAS_CURSO.rutaMenuMisCursos(false, true),
          RUTAS_MODULO_CURSO.rutaMenuModuloCurso(false, true, [this.idCursoUsuario]),
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {
      datosUsuario: {id: this.idUsuario},
      cursoUsuario: {id: this.idCursoUsuario},
      moduloCurso: {
        siguienteModulo: {
          mlabJoin: 'left',
        },
        anteriorModulo: {
          mlabJoin: 'left',
        },
      },
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this.ordenarModulosCursos();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'ASC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        datosUsuario: {id: this.idUsuario},
        cursoUsuario: {id: this.idCursoUsuario},
        moduloCurso: {
          siguienteModulo: {
            mlabJoin: 'left',
          },
          anteriorModulo: {
            mlabJoin: 'left',
          },
        },
      };
      this.tipoBusqueda = 'findAll';
      this.ordenarModulosCursos();
      this._cargandoService.deshabilitarCargando();
    } else {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'ASC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        datosUsuario: {id: this.idUsuario},
        cursoUsuario: {id: this.idCursoUsuario},
        moduloCurso: {
          nombre: `Like("%25${busqueda}%25")`,
          siguienteModulo: {
            mlabJoin: 'left',
          },
          anteriorModulo: {
            mlabJoin: 'left',
          },
        },
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
      this._cargandoService.deshabilitarCargando();
    }
  }

  irAMenuTema(rowData) {
    const rutaMenuTema = RUTAS_TEMA.rutaMenuTema(
      false,
      true,
      [
        this.idCursoUsuario,
        rowData.id, // idModuloCursoUsuario
        rowData.moduloCurso.id, // idModuloCurso
      ]
    ).ruta;
    this._router.navigate(
      rutaMenuTema
    );
  }

  ordenarModulosCursos() {
    const observableModulosUsuario$ = this._moduloCursoUsuarioRestService.findAll(`criterioBusqueda=${JSON.stringify(this.queryParams)}`);
    observableModulosUsuario$
      .pipe(
        debounceTime(
          1000,
        ),
        mergeMap(
          (modulosConLenght: [ModuloCursoUsuarioInterface[], number]) => {
            return of(modulosConLenght[0]);
          }
        ),
        mergeMap(
          (modulosUsuarios: ModuloCursoUsuarioInterface[]) => {
            const observableModulo$ = of(modulosUsuarios.map(
              (moduloUsuario: ModuloCursoUsuarioInterface) => {
                const modulosAOrdenar = moduloUsuario.moduloCurso;
                const moduloCursoFornateado = {moduloUsuario, ...modulosAOrdenar};
                return moduloCursoFornateado;
              }
            ));
            return observableModulo$;
          }
        ),
        ordenarElementos('siguienteModulo', 'anteriorModulo')
      )
      .subscribe(
        (modulosOrdenados) => {
          this.values = modulosOrdenados.map(
            (modulo) => {
              return modulo.moduloUsuario;
            }
          );
          this._cargandoService.deshabilitarCargando();
        }
      )
    ;
  }
}
