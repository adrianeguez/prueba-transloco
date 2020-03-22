import {Component, OnInit} from '@angular/core';
import {RUTAS_PREGUNTA} from '../definicion-rutas/definicion-rutas-pregunta';
import {PreguntaInterface} from '../../interfaces/pregunta.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Toast, ToasterService} from 'angular2-toaster';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {CrearEditarPreguntaComponent} from '../../modales/crear-editar-pregunta/crear-editar-pregunta.component';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {PreguntaRestService} from '../../servicios/rest/pregunta-rest.service';
import {RUTAS_PRUEBA} from '../../../prueba/rutas/definicion-rutas/rutas-prueba';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_OPCION} from '../../../opcion/rutas/definicion-rutas/definicion-rutas-opcion';
import {ParametrosRutaGestionPreguntaInterface} from '../../interfaces/parametros-ruta-gestion.pregunta.interface';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {ESTADOS} from '../../../../../../enums/estados';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-gestion-pregunta',
  templateUrl: './ruta-gestion-pregunta.component.html',
  styleUrls: ['./ruta-gestion-pregunta.component.scss']
})
// tslint:disable-next-line:max-line-length
export class RutaGestionPreguntaComponent
  extends RutaConMigasDePanTablaBusqueda<PreguntaInterface,
    PreguntaRestService,
    ToasterService>
  implements OnInit {

  habilitar: boolean;
  idEmpresa: number;
  idCurso: number;
  idModuloCurso: number;
  idPrueba: number;
  idDiapositiva: number;
  idTema: number;

  columnas = [
    {
      field: 'descripcion',
      header: 'Descripcion',
      llaveATraducir: 'descripcion',
      traduccion: ''
    },
    {
      field: 'valor',
      header: 'Valor',
      llaveATraducir: 'valor',
      traduccion: ''
    },
    {
      field: 'habilitado',
      header: 'Estado',
      llaveATraducir: 'estado',
      traduccion: ''
    },
    {
      field: 'tratarDeNuevo',
      header: 'Tratar de nuevo',
      llaveATraducir: 'tratarDeNuevo',
      traduccion: ''
    },
    {
      field: 'id',
      header: 'Acciones',
      llaveATraducir: 'acciones',
      traduccion: ''
    },
  ];

  rutaTraduccion: string;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _preguntaRestService: PreguntaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected readonly _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _preguntaRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      'submoduloCertificadosCuros.pregunta.rutas.rutaGestionPregunta'
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
      (parametros: ParametrosRutaGestionPreguntaInterface) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.idTema = +parametros.idTema;
        this.idDiapositiva = +parametros.idDiapositiva;
        this.ruta = this.setearRuta().ruta;

        this.habilitar = true;
        const rutas = this.construirMigasDePan();
        this.establecerMigas(rutas);
      }
    );
    this.setearValoresQueryParams();
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  setearRuta(): MigaDePanInterface {
    return RUTAS_PREGUNTA.rutaGestionPregunta(
      false,
      true,
      [
        // parametros
        this.idEmpresa,
        this.idCurso,
        this.idModuloCurso,
        this.idTema,
        this.idDiapositiva,
      ]);
  }

  construirMigasDePan(): MigaDePanInterface[] {
    const rutas = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
      RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
      RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true, [this.idEmpresa, this.idCurso]),
      RUTAS_TEMA.rutaGestionTema(
        false, true, [
          this.idEmpresa,
          this.idCurso,
          this.idModuloCurso,
        ]
      ),
      RUTAS_DIAPOSITIVA.rutaGestionDiapositiva(
        false, true, [
          this.idEmpresa,
          this.idCurso,
          this.idModuloCurso,
          this.idTema,
        ]
      ),
      RUTAS_PREGUNTA.rutaGestionPregunta(
        false, true, [
          this.idEmpresa,
          this.idCurso,
          this.idModuloCurso,
          this.idTema,
          this.idDiapositiva,
        ]
      )
    ];
    return rutas;
  }

  setearValoresQueryParams() {
    if (!this.queryParams.where) {
      this.queryParams.where = {
        diapositiva: {id: this.idDiapositiva},
      };
    }
  }

  buscarPorDescripcion(busqueda: string) {
    busqueda = busqueda.trim();
    if (busqueda === '') {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        diapositiva: {id: this.idDiapositiva},
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
        diapositiva: {id: this.idDiapositiva},
        descripcion: `Like(\"%25${busqueda}%25\")`
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalEditarPregunta(registro: PreguntaInterface) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarPreguntaComponent, {
      width: '600px',
      data: {pregunta: registro},
    });
    dialogRef.afterClosed().subscribe((registroEditado: PreguntaInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    });
  }

  abrirModalCrearPregunta() {
    const dialogRef = this.dialog.open(CrearEditarPreguntaComponent, {
      width: '600px',
      data: {
        pregunta: undefined,
        idDiapositiva: +this.idDiapositiva,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: PreguntaInterface) => {
      if (registroCreado) {
        this.values.unshift(registroCreado);
      }
    });
  }

  irAGestionModuloHijo(idPregunta: PreguntaInterface) {
    const rutaPregunta = RUTAS_OPCION.rutaGestionOpcion(
      false,
      true,
      [
        this.idEmpresa,
        this.idCurso,
        this.idModuloCurso,
        this.idTema,
        this.idDiapositiva,
        idPregunta
      ]
    ).ruta;
    this._router.navigate(
      rutaPregunta
    );
  }

  actualizarEstado(registro: PreguntaInterface) {
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    const preguntaaEnArreglo = this.values.find(
      pregunta => registro.id === pregunta.id,
    );
    const indicePregunta = this.values.indexOf(preguntaaEnArreglo);
    this._preguntaRestService.updateOne(registro.id, {'habilitado': habilitado}).subscribe(
      (respuesta) => {
        this.values[indicePregunta].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
      },
      error => {
        console.error({mensaje: 'Error editando', error});
        const errorEditarToast: Toast = {
          type: 'error',
          title: this._translocoService.translate('generales.toasters.toastErrorEditar.title'),
          body: this._translocoService.translate('generales.toasters.toastErrorEditarVacio.body'),
          showCloseButton: true
        };
        this._toasterService.pop(
          errorEditarToast
        );
      },
    );
  }

  actualizarTryAgain(pregunta: PreguntaInterface) {
    const intentarDenuevo = pregunta.tratarDeNuevo === ESTADOS.Inactivo ? 1 : 0;
    const preguntaaEnArreglo = this.values.find(
      preguntaArreglo => preguntaArreglo.id === pregunta.id,
    );
    const indicePregunta = this.values.indexOf(preguntaaEnArreglo);
    this._preguntaRestService.updateOne(pregunta.id, {'tratarDeNuevo': intentarDenuevo}).subscribe(
      (respuesta: PreguntaInterface) => {
        this.values[indicePregunta].tratarDeNuevo = respuesta.tratarDeNuevo
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
      },
      error => {
        console.error({mensaje: 'Error editando', error});
        const errorEditarToast: Toast = {
          type: 'error',
          title: this._translocoService.translate('generales.toasters.toastErrorEditar.title'),
          body: this._translocoService.translate('generales.toasters.toastErrorEditarVacio.body'),
          showCloseButton: true
        };
        this._toasterService.pop(
          errorEditarToast
        );
      },
    );
  }

}

