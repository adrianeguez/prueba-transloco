import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {OpcionRestService} from '../../servicios/rest/opcion-rest.service';
import {CrearEditarOpcionComponent} from '../../modales/crear-editar-opcion/crear-editar-opcion.component';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {MatDialog} from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_OPCION} from '../definicion-rutas/definicion-rutas-opcion';
import {OpcionInterface} from '../../interfaces/opcion.interface';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {RUTAS_PREGUNTA} from '../../../pregunta/rutas/definicion-rutas/definicion-rutas-pregunta';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {ESTADOS} from '../../../../../../enums/estados';
import {TranslocoService} from '@ngneat/transloco';
import {crearToasterGeneral} from '../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-ruta-gestion-opcion',
  templateUrl: './ruta-gestion-opcion.component.html',
  styleUrls: ['./ruta-gestion-opcion.component.scss']
})

export class RutaGestionOpcionComponent
  extends RutaConMigasDePanTablaBusqueda<OpcionInterface,
    OpcionRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'descripcion', header: 'Description', llaveATraducir: 'descripcion', traduccion: ''},
    {field: 'esRespuesta', header: 'Is the Answer', llaveATraducir: 'esRespuesta', traduccion: ''},
    {field: 'habilitado', header: 'State', llaveATraducir: 'habilitado', traduccion: ''},
    {field: 'id', header: 'Acciones', llaveATraducir: 'id', traduccion: ''},
  ];

  habilitar: boolean;
  idEmpresa: number;
  idCurso: number;
  idModuloCurso: number;
  idPrueba: number;
  idPregunta: number;
  idTema: number;
  idDiapositiva: number;
  estadoSeleccionado: number;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _opcionRestService: OpcionRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected _translocoService: TranslocoService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _opcionRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      _translocoService,
      'submoduloCertificadosCuros.opcionModulo.rutas.rutaGestionOpcion'
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
      (parametros: { idEmpresa: string, idCurso: string, idModuloCurso: string, idTema: string, idDiapositiva: string, idPregunta: string }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.idTema = +parametros.idTema;
        this.idPregunta = +parametros.idPregunta;
        this.idDiapositiva = +parametros.idDiapositiva;
        this.ruta = RUTAS_OPCION.rutaGestionOpcion(
          false,
          true,
          [
            this.idEmpresa,
            this.idCurso,
            this.idModuloCurso,
            this.idTema,
            this.idDiapositiva,
            this.idPregunta
          ]).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
          RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true, [this.idEmpresa, this.idCurso]),
          RUTAS_TEMA.rutaGestionTema(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso]),
          RUTAS_DIAPOSITIVA.rutaGestionDiapositiva(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso, this.idTema]),
          RUTAS_PREGUNTA.rutaGestionPregunta(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso, this.idTema, this.idDiapositiva]),
          RUTAS_OPCION.rutaGestionOpcion(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso, this.idTema, this.idDiapositiva, this.idPregunta]),
        ];
        this.establecerMigas(rutas);
      }
    );

    this.queryParams.where = {
      pregunta: {
        id: this.idPregunta,
      }
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    this._cargandoService.habilitarCargando();
    if (busqueda === '') {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        pregunta: {
          id: this.idPregunta,
        }
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
      this._cargandoService.deshabilitarCargando();
    } else {
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        pregunta: {
          id: this.idPregunta,
        },
        descripcion: `Like("%25${busqueda}%25")`,
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
      this._cargandoService.deshabilitarCargando();
    }
  }

  abrirModalEditarOpcion(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarOpcionComponent, {
      width: '700px',
      data: {opcion: registro},
    });
    dialogRef.afterClosed().subscribe((registroEditado: OpcionInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    });
  }

  abrirModalCrearOpcion() {
    const dialogRef = this.dialog.open(CrearEditarOpcionComponent, {
      width: '700px',
      data: {
        opcion: undefined,
        idPregunta: this.idPregunta,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: OpcionInterface) => {
      if (registroCreado) {
        this.values.unshift(registroCreado);
        this.actualizarEsRespuesta(registroCreado, true);
      }
    });
  }

  actualizarEsRespuesta(opcion: OpcionInterface, registroNuevo: boolean) {
    this._cargandoService.habilitarCargando();
    const existeEsRespuesta = this.values.find(
      opcionArreglo => opcionArreglo.esRespuesta === 1 && opcionArreglo.id !== opcion.id
    );
    const indiceEsRespuesta = this.values.indexOf(existeEsRespuesta);
    if (existeEsRespuesta && opcion.esRespuesta === 1) {
      this.metodoActualizar(existeEsRespuesta.id, 0, indiceEsRespuesta);
    }
    if (opcion.esRespuesta === 0 && !registroNuevo) {
      const indiceActualizar = this.values.indexOf(opcion);
      this.metodoActualizar(opcion.id, 1, indiceActualizar);
      if (existeEsRespuesta) {
        this.metodoActualizar(existeEsRespuesta.id, 0, indiceEsRespuesta);
      }
    }
    this._cargandoService.deshabilitarCargando();
  }

  metodoActualizar(idActualizarServicio, respuesta: number, indiceActualizar) {
    this._opcionRestService.updateOne(
      idActualizarServicio,
      {esRespuesta: respuesta}
    ).subscribe(
      (opcionActualizada: OpcionInterface) => {
        this.values[indiceActualizar].esRespuesta = opcionActualizada.esRespuesta;
      }, error => {
        console.error({
          error,
          datos: idActualizarServicio,
          mensaje: 'Error al actualizar es respuesta'
        });
      }
    );
  }

  escucharEstadoSeleccionado($event: ESTADOS.Activo | ESTADOS.Inactivo, busqueda: string) {
    this._cargandoService.habilitarCargando();
    if (busqueda !== '') {
      this.queryParams.where = {
        habilitado: $event,
        pregunta: {
          id: this.idPregunta,
        },
        descripcion: `Like("%25${busqueda}%25")`,
      };
    } else {
      this.queryParams.where = {
        habilitado: $event,
        pregunta: {
          id: this.idPregunta,
        },
      };
    }
    this.queryParams.relations = [];
    this.queryParams.skip = 0;
    this.queryParams.take = 10;
    this.queryParams.order = {
      id: 'DESC',
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    this._cargandoService.deshabilitarCargando();
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const estadoActualizado = registro.habilitado ? 0 : 1;
    this._opcionRestService
      .updateOne(
        registro.id,
        {habilitado: estadoActualizado}
      )
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = estadoActualizado;
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoEditarVacio')
          );
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error al actualizar el estado',
            data: {
              estadoActualizado,
              id: registro.id,
            }
          });
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorEditarVacio')
          );
        },
      );
  }
}

