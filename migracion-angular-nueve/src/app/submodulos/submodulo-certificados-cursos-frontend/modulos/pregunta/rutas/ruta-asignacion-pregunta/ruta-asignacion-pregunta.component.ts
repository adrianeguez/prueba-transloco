import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Toast, ToasterService} from 'angular2-toaster';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {PreguntaPorPruebaInterface} from '../../interfaces/pregunta-por-prueba.interface';
import {PreguntaPorPruebaRestService} from '../../servicios/rest/pregunta-por-prueba-rest.service';
import {ParametrosRutaGestionPreguntaInterface} from '../../interfaces/parametros-ruta-gestion.pregunta.interface';
import {RUTAS_PREGUNTA} from '../definicion-rutas/definicion-rutas-pregunta';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_PRUEBA} from '../../../prueba/rutas/definicion-rutas/rutas-prueba';
import {SeleccionarPreguntasComponent} from '../../modales/modal-seleccionar-preguntas/seleccionar-preguntas.component';
import {PreguntaInterface} from '../../interfaces/pregunta.interface';
import {ESTADOS} from '../../../../../../enums/estados';
import {ModalMostrarOpcionesComponent} from '../../../opcion/modales/mostrar-opciones/modal-mostrar-opciones/modal-mostrar-opciones.component';
import {TranslocoService} from '@ngneat/transloco';
import {crearToasterGeneral} from '../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-ruta-asignacion-pregunta',
  templateUrl: './ruta-asignacion-pregunta.component.html',
  styleUrls: ['./ruta-asignacion-pregunta.component.scss']
})

export class RutaAsignacionPreguntaComponent
  extends RutaConMigasDePanTablaBusqueda<PreguntaPorPruebaInterface,
    PreguntaPorPruebaRestService,
    ToasterService>
  implements OnInit {
  idEmpresa: number;
  idCurso: number;
  idModuloCurso: number;
  idPrueba: number;

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

  habilitar: boolean;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _preguntaPorPruebaRestService: PreguntaPorPruebaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _translocoService: TranslocoService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _preguntaPorPruebaRestService,
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
    this._activatedRoute.params.subscribe(
      (parametros: ParametrosRutaGestionPreguntaInterface) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.idPrueba = +parametros.idPrueba;
        this.ruta = this.setearRuta().ruta;
        this.habilitar = true;
        const rutas = this.construirMigasDePan();
        this.establecerMigas(rutas);
        //  traducirMigas(this, rutas);
      }
    );
    this.habilitar = true;
    this.setearValoresQueryParams();
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  setearRuta(): MigaDePanInterface {
    return RUTAS_PREGUNTA.rutaGestionPreguntaPrueba(
      false, true, [
        this.idEmpresa,
        this.idCurso,
        this.idModuloCurso,
        this.idPrueba
      ]
    );
  }

  construirMigasDePan(): MigaDePanInterface[] {
    const rutas = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
      RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
      RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true, [this.idEmpresa, this.idCurso]),
      RUTAS_PRUEBA.rutaGestionPrueba(
        false, true, [
          this.idEmpresa,
          this.idCurso,
          this.idModuloCurso,
        ]
      ),
      RUTAS_PREGUNTA.rutaGestionPreguntaPrueba(
        false, true, [
          this.idEmpresa,
          this.idCurso,
          this.idModuloCurso,
          this.idPrueba,
        ]
      )
    ];
    return rutas;
  }

  setearValoresQueryParams() {
    if (!this.queryParams.where) {
      if (this.idPrueba) {
        this.queryParams.where = {
          prueba: {id: this.idPrueba},
          pregunta: {},
        };
      }
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
      if (this.idPrueba) {
        this.queryParams.where = {
          prueba: {id: this.idPrueba},
          pregunta: {},
        };
      }
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
        prueba: {id: this.idPrueba},
        pregunta: {
          descripcion: `Like(\"%25${busqueda}%25\")`
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }


  abrirModalAsignarPregunta() {
    const dialogRef = this.dialog.open(SeleccionarPreguntasComponent, {
      width: '600px',
      data: {
        idPrueba: this.idPrueba,
        preguntasEnTabla: this.values,
        idModuloCurso: this.idModuloCurso,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registrosCreado) => {
      if (registrosCreado) {
        registrosCreado.forEach(
          registro => {
            this.values.unshift(registro);
          }
        );
      }
    });
  }

  actualizarEstado(registro: PreguntaPorPruebaInterface) {
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    const preguntaaEnArreglo = this.values.find(
      pregunta => registro.id === pregunta.id,
    );
    const indicePregunta = this.values.indexOf(preguntaaEnArreglo);
    this._preguntaPorPruebaRestService.updateOne(registro.id, {'habilitado': habilitado}).subscribe(
      (respuesta) => {
        this.values[indicePregunta].habilitado = respuesta.habilitado;
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

  abrirModalVerOpciones(registro) {
    const dialogRef = this.dialog.open(ModalMostrarOpcionesComponent, {
      width: '600px',
      data: {
        pregunta: registro.pregunta,
        idPregunta: registro.pregunta.id,
      },
    });
  }

  desasignarPregunta(registro: PreguntaInterface) {
    this._cargandoService.habilitarCargando();
    const preguntaaEnArreglo = this.values.find(
      pregunta => registro.id === pregunta.id,
    );
    const indicePregunta = this.values.indexOf(preguntaaEnArreglo);
    this._preguntaPorPruebaRestService.deleteOne(registro.id)
      .subscribe(
        () => {
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastErrorEliminarVacio')
          );
          this._cargandoService.deshabilitarCargando();
          this.values.splice(indicePregunta, 1);
        }, error => {
          console.error({
            error,
            mensaje: 'Error eliminando registro',
            data: registro
          });
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEliminarVacio')
          );
        }
      );
  }
}
