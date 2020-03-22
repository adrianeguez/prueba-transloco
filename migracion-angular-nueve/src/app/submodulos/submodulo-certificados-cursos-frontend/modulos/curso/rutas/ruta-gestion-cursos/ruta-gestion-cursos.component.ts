import {Component, OnInit} from '@angular/core';
import {RUTAS_CURSO} from '../definicion-rutas/definicion-rutas-curso';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {CursoInterface} from '../../interfaces/curso.interface';
import {CursoRestService} from '../../servicios/rest/curso-rest.service';
import {Toast, ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, ESTADOS} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {CrearEditarCursoComponent} from '../../modales/crear-editar-curso/crear-editar-curso.component';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-gestion-cursos',
  templateUrl: './ruta-gestion-cursos.component.html',
  styleUrls: ['./ruta-gestion-cursos.component.scss']
})
export class RutaGestionCursosComponent
  extends RutaConMigasDePanTablaBusqueda<CursoInterface,
    CursoRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {
      field: 'nombre',
      header: 'Nombre',
      llaveATraducir: 'nombre',
      traduccion: ''
    },
    {
      field: 'descripcion',
      header: 'Descripcion',
      llaveATraducir: 'descripcion',
      traduccion: ''
    },
    {
      field: 'duracion',
      header: 'Duracion',
      llaveATraducir: 'duracion',
      traduccion: ''
    },
    {
      field: 'habilitado',
      header: 'Estado',
      llaveATraducir: 'habilitado',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: ''
    }];
  rutaTraduccion: string;

  habilitar: boolean;
  idEmpresa: number;
  estadoSeleccionado: number | any;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _CursoRestService: CursoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected _translocoService: TranslocoService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _CursoRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso'
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
      (parametros: { idEmpresa: string }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.ruta = RUTAS_CURSO.rutaGestionCursos(
          false,
          true,
          [
            this.idEmpresa,
          ]).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
        ];
        this.establecerMigas(rutas);
      }
    );
    this.queryParams.where = {
      articulo: {
        articuloPorEmpresa: {
          empresa: {id: this.idEmpresa}
        }
      }
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  establecerTraduccion() {
    // const traduccionModulo$ = this._translocoService.selectTranslateObject(this.rutaTraduccion);
    // traducirColumnas(this._translocoService, this.rutaTraduccion + '.tablas', this.columnas);
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
      this.queryParams.where = {};
      // {
      //   // marca: `Like("%25${busqueda}%25")`,
      //
      // } ejemplo where con like
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalEditarCursoModule(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarCursoComponent, {
      width: '500px',
      data: {curso: registro, idEmpresa: this.idEmpresa},
    });
    dialogRef.afterClosed().subscribe((registroEditado: CursoInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    });
  }

  abrirModalCrearCursoModule() {
    const dialogRef = this.dialog.open(CrearEditarCursoComponent, {
      width: '500px',
      data: {
        curso: undefined,
        idEmpresa: this.idEmpresa,
        cursosEnTabla: this.values,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: CursoInterface) => {
      if (registroCreado) {
        this.values.unshift(registroCreado);
      }
    });
  }

  irA(rowData) {
    const rutaModuloCurso = RUTAS_MODULO_CURSO.rutaGestionModuloCurso(
      false,
      true,
      [
        this.idEmpresa,
        rowData.id, // idCurso
      ]
    ).ruta;
    this._router.navigate(
      rutaModuloCurso
    );
  }


  actualizarEstado(registro: CursoInterface) {
    const cursoEnArreglo = this.values.find(
      curso => curso.id === registro.id
    );
    const indiceRegistro = this.values.indexOf(cursoEnArreglo);
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    this._cargandoService.habilitarCargando();
    this._CursoRestService.updateOne(
      registro.id,
      {habilitado}
    ).subscribe(
      () => {
        const exitoEditarToast: Toast = {
          type: 'success',
          title: this._translocoService.translate('generales.toasters.toastExitoEditar.title'),
          body: this._translocoService.translate('generales.toasters.toastExitoEditar.body',
            {nombre: registro.nombre}),
          showCloseButton: true
        };
        this._toasterService.pop(
          exitoEditarToast
        );
        this.values[indiceRegistro].habilitado = habilitado;
      }, error => {
        const errorEditarToast: Toast = {
          type: 'error',
          title: this._translocoService.translate('generales.toasters.toastErrorEditar.title'),
          body: this._translocoService.translate('generales.toasters.toastErrorEditarVacio.body'),
          showCloseButton: true
        };
        this._toasterService.pop(
          errorEditarToast
        );
      }
    );
    this._cargandoService.deshabilitarCargando();
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo, busqueda: string) {
    if (busqueda !== null) {
      this.queryParams.where = {
        articulo: {
          articuloPorEmpresa: {
            empresa: {id: this.idEmpresa}
          }
        },
        nombre: `Like(\"%25${busqueda}%25\")`,
        habilitado: eventoEstado,
      };
    } else {
      this.queryParams.where = {
        habilitado: eventoEstado,
        articulo: {
          articuloPorEmpresa: {
            empresa: {id: this.idEmpresa}
          }
        }
      };
    }
    this.tipoBusqueda = 'findAll';
    this.queryParams.skip = 0;
    this.queryParams.take = 10;
    this.queryParams.order = {
      id: 'DESC',
    };
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }


}

