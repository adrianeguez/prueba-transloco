import {Component, OnInit} from '@angular/core';
import {RUTAS_DIAPOSITIVA} from '../definicion-rutas/definicion-rutas-diapostiva';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {Toast, ToasterService} from 'angular2-toaster';
import {DiapositivaRestService} from '../../servicios/rest/diapositiva.rest.service';
import {DiapositivaInterface} from '../../interfaces/diapositiva.interface';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {CrearEditarDiapositivaComponent} from '../../modales/crear-editar-diapositiva/crear-editar-diapositiva.component';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_CONTENIDO} from '../../../contenido/rutas/definicion-rutas/definicion-rutas-contenido';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PREGUNTA} from '../../../pregunta/rutas/definicion-rutas/definicion-rutas-pregunta';
import {debounceTime, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ordenarElementos} from '../../../../funciones/funcionesOrdenamiento';
import {OrdenInterface} from '../../../modulo-curso/modales/gestion-orden/orden.interface';
import {GestionOrdenComponent} from '../../../modulo-curso/modales/gestion-orden/gestion-orden.component';
import {ListasAsignacionInterface} from '../../interfaces/listas-asignacion.interface';
import {AsignacionDragDropInterface} from '../../componentes/asignacion-drag-drop/asignacion-drag-drop.interface';
import {AsignacionDragDropComponent} from '../../componentes/asignacion-drag-drop/asignacion-drag-drop.component';
import {PruebaRestService} from '../../../prueba/servicios/rest/prueba.rest.service';
import {PruebaInterface} from '../../../prueba/interfaces/prueba.interface';
import {TranslocoService} from '@ngneat/transloco';
import {MensajesToasterInterface} from '../../../../../../interfaces/mensajesToaster.Interface';
import {crearToasterGeneral} from '../../../../funciones/crear-toaster-general';

@Component({
  selector: 'app-ruta-gestion-diapositiva',
  templateUrl: './ruta-gestion-diapositiva.component.html',
  styleUrls: ['./ruta-gestion-diapositiva.component.scss']
})
export class RutaGestionDiapositivaComponent
  extends RutaConMigasDePanTablaBusqueda<DiapositivaInterface,
    DiapositivaRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'titulo', header: 'Titulo', llaveATraducir: 'titulo', traduccion: ''},
    {field: 'duracion', header: 'Duracion', llaveATraducir: 'duracion', traduccion: ''},
    {field: 'habilitado', header: 'Estado', llaveATraducir: 'estado', traduccion: ''},
    {field: 'pruebas', header: 'Pruebas', llaveATraducir: 'pruebas', traduccion: ''},
    {field: 'id', header: 'Acciones', llaveATraducir: 'id', traduccion: ''},
  ];

  habilitar: boolean;
  idEmpresa: number;
  idCurso: number;
  idModuloCurso: number;
  idTema: number;
  estadoSeleccionado: number;
  traduccionesTitulos;
  traduccionesToaster: MensajesToasterInterface;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _DiapositivaRestService: DiapositivaRestService,
    protected _pruebaRestService: PruebaRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected translocoService: TranslocoService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _DiapositivaRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      translocoService,
      'submoduloCertificadosCuros.diapositiva.rutas.rutaGestionDiapositiva'
    );
    //
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
    this.traducirColumnas('tablas');
  }

  ngOnInit() {
    this._translocoService.selectTranslateObject('submoduloCertificadosCuros.diapositiva.rutas.rutaGestionDiapositiva.titulos').subscribe(
      (traduccion) => {
        this.traduccionesTitulos = traduccion;
      }
    );
    this._translocoService.selectTranslateObject('generales.toasters').subscribe(
      (traduccion) => {
        this.traduccionesToaster = traduccion;
      }
    );
    this.habilitar = false;
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      (parametros: {
        idEmpresa: string,
        idCurso: string,
        idModuloCurso: string,
        idTema: string,
      }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.idTema = +parametros.idTema;
        this.ruta = RUTAS_DIAPOSITIVA.rutaGestionDiapositiva(
          false,
          true,
          [
            this.idEmpresa,
            this.idCurso,
            this.idModuloCurso,
            this.idTema,
          ]
        ).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
          RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true, [this.idEmpresa, this.idCurso]),
          RUTAS_TEMA.rutaGestionTema(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso]),
          RUTAS_DIAPOSITIVA.rutaGestionDiapositiva(false, true, [this.idEmpresa, this.idCurso, this.idModuloCurso, this.idTema]),
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );
    // cargar con activated route y setear el habilitar
    this.queryParams.where = {
      siguienteDiapositiva: {mlabJoin: 'left'},
      anteriorDiapositiva: {mlabJoin: 'left'},
      tema: {id: this.idTema},
      pruebas: {mlabJoin: 'left'}
    };
    this._cargandoService.deshabilitarCargando();
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
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
        siguienteDiapositiva: {
          mlabJoin: 'left',
        },
        anteriorDiapositiva: {
          mlabJoin: 'left',
        },
        mlabOr: true,
        tema: {id: this.idTema},
        pruebas: {mlabJoin: 'left'}
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
        siguienteDiapositiva: {
          mlabJoin: 'left',
        },
        anteriorDiapositiva: {
          mlabJoin: 'left',
        },
        mlabOr: true,
        titulo: `Like(\"%25${busqueda}%25\")`,
        tema: {id: this.idTema},
        pruebas: {mlabJoin: 'left'}
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalEditarDiapositiva(registro: DiapositivaInterface) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarDiapositivaComponent, {
      width: '800px',
      data: {
        diapositiva: registro,
        idTema: this.idTema,
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: DiapositivaInterface) => {
      if (registroEditado) {
        this.values[indiceRegistro] = registroEditado;
      }
    });
  }

  abrirModalCrearDiapositiva() {
    const dialogRef = this.dialog.open(CrearEditarDiapositivaComponent, {
      width: '800px',
      data: {
        diapositiva: undefined,
        idTema: this.idTema,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: DiapositivaInterface) => {
      if (registroCreado) {
        if (registroCreado.anteriorDiapositiva) {
          this.actualizarOrden('anteriorDiapositiva', registroCreado, undefined);
        }
        if (registroCreado.siguienteDiapositiva) {
          this.actualizarOrden('siguienteDiapositiva', registroCreado, undefined);
        }
        this.values.unshift(registroCreado);
      }
    });
  }

  actualizarOrden(nombreCampo: string, registroCrearEditar, data) {
    this._cargandoService.habilitarCargando();
    const nombreCampoActualizar = nombreCampo === 'anteriorDiapositiva' ? 'siguienteDiapositiva' : 'anteriorDiapositiva';
    const nombre = `${nombreCampoActualizar}`;
    const diapositiva = registroCrearEditar[nombreCampo] as DiapositivaInterface;
    if (diapositiva) {
      const campoActualizar = {};
      campoActualizar[nombre] = registroCrearEditar;
      if (data) {
        if (data.diapositiva[nombreCampo].id !== diapositiva) {
          this._DiapositivaRestService.updateOne(
            +diapositiva,
            campoActualizar
          ).subscribe(
            () => {
              this._cargandoService.deshabilitarCargando();
            }, error => {
              console.error(
                {
                  error,
                  mensaje: 'Error al editar diapositiva sig/ant',
                  data: registroCrearEditar
                },
              );
              this._cargandoService.deshabilitarCargando();
            }
          );
        }
      } else {
        this._DiapositivaRestService.updateOne(
          +diapositiva,
          campoActualizar
        ).subscribe(
          () => {
            this._cargandoService.deshabilitarCargando();
          }, error => {
            console.error(
              {
                error,
                mensaje: 'Error al editar diapositiva ant/sig',
                data: registroCrearEditar
              },
            );
            this._cargandoService.deshabilitarCargando();
          }
        );
      }
    }
  }

  irAGestionModuloHijo(
    idDiapositiva: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    let ruta;
    if (moduloHijo === 'contenido') {
      ruta = RUTAS_CONTENIDO.rutaGestionContenido(
        false,
        true,
        [
          this.idEmpresa,
          this.idCurso,
          this.idModuloCurso,
          this.idTema,
          idDiapositiva, // idDiapositiva
        ]
      ).ruta;
    }
    if (moduloHijo === 'pregunta') {
      ruta = RUTAS_PREGUNTA.rutaGestionPregunta(
        false,
        true,
        [
          this.idEmpresa,
          this.idCurso,
          this.idModuloCurso,
          this.idTema,
          idDiapositiva, // idDiapositiva
        ]
      ).ruta;
    }
    this._router.navigate(
      ruta
    );
  }

  actualizarEstado(registro: DiapositivaInterface) {
    this.traduccionesToaster.toastExitoEditarVacio.type = 'success';
    this.traduccionesToaster.toastErrorEditarVacio.type = 'error';
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    const diapositivaEnArreglo = this.values.find(
      diapositiva => registro.id === diapositiva.id,
    );
    const indiceDiapositiva = this.values.indexOf(diapositivaEnArreglo);
    this._DiapositivaRestService.updateOne(registro.id, {'habilitado': habilitado}).subscribe(
      () => {
        this.values[indiceDiapositiva].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
        this._toasterService.pop(this.traduccionesToaster.toastExitoEditarVacio as Toast);
      },
      error => {
        console.error({mensaje: 'Error editando', error, data: registro});
        this._toasterService.pop(this.traduccionesToaster.toastErrorEditarVacio as Toast);
      },
    );
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo, busqueda: string) {
    if (busqueda !== null) {
      this.queryParams.where = {
        titulo: `Like(\"%25${busqueda}%25\")`,
        habilitado: eventoEstado,
        tema: {id: this.idTema}
      };
    } else {
      this.queryParams.where = {
        habilitado: eventoEstado,
        tema: {id: this.idTema}
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

  irAPreguntas(registro: DiapositivaInterface) {
    const rutaModuloContenido = RUTAS_PREGUNTA.rutaGestionPregunta(
      false,
      true,
      [
        this.idEmpresa,
        this.idCurso,
        this.idModuloCurso,
        this.idTema,
        registro.id, // idDiapositiva
      ]
    ).ruta;
    this._router.navigate(
      rutaModuloContenido
    );
  }

  cargarPruebas(idDiapositiva: number): ListasAsignacionInterface {
    const pruebasSinAsignar: PruebaInterface [] = [];
    const pruebasAsignadas: PruebaInterface [] = [];
    const consulta = {
      where: {
        diapositiva: {
          mlabJoin: 'left'
        },
        habilitado: 1,
        moduloCurso: {
          id: this.idModuloCurso
        }
      }
    };
    const pruebasDelModulo$
      = this._pruebaRestService.findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    pruebasDelModulo$
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        (pruebasSinFormat: [PruebaInterface[], number]) => {
          const pruebas = pruebasSinFormat[0];
          pruebas.forEach(
            (prueba: PruebaInterface) => {
              if (prueba.diapositiva === null) {
                // console.log(prueba, 'sin asignar');
                pruebasSinAsignar.push(prueba);
              } else if (typeof prueba.diapositiva === 'object' && prueba.diapositiva.id === idDiapositiva) {
                // console.log(prueba, 'asignada');
                pruebasAsignadas.push(prueba);
              }
            }
          );
        },
        error => {
          console.error(error);
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'error', 'generales.toasters.toastErrorMostrarVacio')
          );
        }
      );
    return {
      listaOrigen: pruebasSinAsignar,
      listaDestino: pruebasAsignadas
    };
  }

  actualizarAsignacionPruebas(idDiapositiva: number, listasAsignacion: ListasAsignacionInterface) {
    listasAsignacion.listaOrigen.forEach(
      (prueba) => {
        prueba.diapositiva = null;
      }
    );
    listasAsignacion.listaDestino.forEach(
      (prueba) => {
        prueba.diapositiva = idDiapositiva;
      }
    );
    const pruebasAActualizar = [
      ...listasAsignacion.listaOrigen,
      ...listasAsignacion.listaDestino
    ];
    // console.log({pruebasAActualizar});
    this._pruebaRestService.updateMany(pruebasAActualizar)
      .subscribe(
        (regresa) => {
          this._toasterService.pop(
            crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastExitoEditarVacio')
          );
          // this.llamarDatos(0, this.queryParams.where);
        },
        (error => this._toasterService.pop(
          crearToasterGeneral(this._translocoService, 'success', 'generales.toasters.toastErrorEditarVacio')
        ))
      );
  }

  asignarPrueba(rowData) {
    const listasAsignacion = this.cargarPruebas(rowData.id);
    const objetoConfiguracion: AsignacionDragDropInterface = {
      atributosMostrar: ['nombre', 'tipo'],
      descripcionModal: this.traduccionesTitulos.descripcionPrueba + rowData.titulo,
      dragdrop: true,
      listaOrigen: listasAsignacion.listaOrigen,
      listaDestino: listasAsignacion.listaDestino,
      tituloDestino: this.traduccionesTitulos.pruebasAsignadas,
      tituloModal: this.traduccionesTitulos.modalAsignarPrueba,
      tituloOrigen: this.traduccionesTitulos.pruebasDisponibles
    };
    const dialogRef = this.dialog.open(AsignacionDragDropComponent, {
        width: '800px',
        data: {
          configuracion: objetoConfiguracion
        },
      }
    );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((listasAActualizar: ListasAsignacionInterface) => {
      if (listasAActualizar) {
        // console.log({listasAActualizar});
        this.actualizarAsignacionPruebas(rowData.id, listasAActualizar);
        rowData.pruebas = listasAActualizar.listaDestino;
      }
    });
  }

  gestionarOrden() {
    this.traduccionesToaster.toastExitoOrdenVacio.type = 'success';
    this.traduccionesToaster.toastErrorOrdenVacio.type = 'error';
    const consultaModulo = JSON.stringify(
      {
        where: {
          tema: {id: this.idTema},
          siguienteDiapositiva: {
            mlabJoin: 'left'
          },
          anteriorDiapositiva: {
            mlabJoin: 'left'
          },
        },
        take: 1000,
      }
    );
    this._cargandoService.habilitarCargando();
    this._DiapositivaRestService.findAll('criterioBusqueda=' + consultaModulo)
      .pipe(
        mergeMap(
          (respuesta: [DiapositivaInterface[], number]) => {
            return of(respuesta[0]);
          }
        ),
        ordenarElementos('siguienteDiapositiva', 'anteriorDiapositiva'),
      )
      .subscribe(
        (respuesta: DiapositivaInterface[]) => {
          this._cargandoService.deshabilitarCargando();
          const configuracion: OrdenInterface = {
            listaOrigen: respuesta,
            atributoMostrar: 'titulo',
            tituloDestino: this.traduccionesTitulos.ordenNuevo,
            tituloOrigen: this.traduccionesTitulos.ordenActual,
            atributoFiltrar: 'titulo',
            atributoOrdenInicio: 'anteriorDiapositiva',
            atributoOrdenFinal: 'siguienteDiapositiva',
            tituloModal: this.traduccionesTitulos.modalGestionOrden,
          };
          const dialogRef = this.dialog.open(GestionOrdenComponent, {
            width: '800px',
            data: {
              configuracion,
            },
          });
          dialogRef.afterClosed().subscribe(
            (respuestaModal) => {
              if (respuestaModal) {
                this._cargandoService.habilitarCargando();
                this._DiapositivaRestService.actualizarMasivo(respuestaModal)
                  .subscribe(
                    respuestaActualizacion => {
                      if (respuestaActualizacion) {
                        this._toasterService.pop(this.traduccionesToaster.toastExitoOrdenVacio as Toast);
                        this._cargandoService.deshabilitarCargando();
                      }
                    }, error => {
                      console.error({mensaje: 'error actualizar masivo', error, data: respuestaModal});
                      this._toasterService.pop(this.traduccionesToaster.toastErrorOrdenVacio as Toast);
                      this._cargandoService.deshabilitarCargando();
                    }
                  );
              }
            }
          );
        }
      );
  }
}
