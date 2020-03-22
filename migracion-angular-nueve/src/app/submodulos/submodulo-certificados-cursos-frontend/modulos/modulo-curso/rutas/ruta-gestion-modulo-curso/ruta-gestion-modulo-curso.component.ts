import {Component, OnInit} from '@angular/core';
import {ModuloCursoInterface} from '../../interfaces/modulo-curso.interface';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {Toast, ToasterService} from 'angular2-toaster';
import {ModuloCursoRestService} from '../../servicios/rest/modulo-curso-rest.service';
import {CargandoService, EmitirMigaPanService, ESTADOS} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_MODULO_CURSO} from '../definicion-rutas/definicion-rutas-modulo';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_PRUEBA} from '../../../prueba/rutas/definicion-rutas/rutas-prueba';
import {CrearEditarModuloCursoComponent} from '../../modales/crear-editar-modulo-curso/crear-editar-modulo-curso.component';
import {ModalSubirCaratulaComponent} from '../../modales/modal-subir-caratula/modal-subir-caratula.component';
import {environment} from '../../../../../../../environments/environment';
import {GestionOrdenComponent} from '../../modales/gestion-orden/gestion-orden.component';
import {OrdenInterface} from '../../modales/gestion-orden/orden.interface';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ordenarElementos} from '../../../../funciones/funcionesOrdenamiento';
import {CursoInterface} from '../../../curso/interfaces/curso.interface';
import {TranslocoService} from '@ngneat/transloco';
import {MensajesToasterInterface} from '../../../../../../interfaces/mensajesToaster.Interface';

@Component({
  selector: 'app-ruta-gestion-modulo-curso',
  templateUrl: './ruta-gestion-modulo-curso.component.html',
  styleUrls: ['./ruta-gestion-modulo-curso.component.scss']
})
export class RutaGestionModuloCursoComponent
  extends RutaConMigasDePanTablaBusqueda<ModuloCursoInterface,
    ModuloCursoRestService,
    ToasterService>
  implements OnInit {
  urlImagen = environment.urlGoogleCloudStorage + environment.portGoogleCloudStorage;
  columnas = [
    {field: 'nombre', header: 'Nombre', llaveATraducir: 'nombre', traduccion: ''},
    {field: 'descripcion', header: 'Descripcion', llaveATraducir: 'descripcion', traduccion: ''},
    {field: 'tiempo', header: 'Tiempo', llaveATraducir: 'tiempo', traduccion: ''},
    {field: 'habilitado', header: 'Estado', llaveATraducir: 'habilitado', traduccion: ''},
    {field: 'id', header: 'Acciones', llaveATraducir: 'acciones', traduccion: ''},
  ];

  habilitar: boolean;
  idCurso: number;
  idEmpresa: number;
  estadoSeleccionado: number | any;
  traduccionesTitulos;
  traduccionesToaster: MensajesToasterInterface;


  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _moduloCursoRestService: ModuloCursoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected translocoService: TranslocoService
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _moduloCursoRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
      translocoService,
      'submoduloCertificadosCuros.moduloCursoModulo.rutas.rutaGestionModuloCurso'
    );
    this.tipoBusqueda = 'findAll';
    this.queryParams.order = {
      id: 'DESC',
    };
    this.traducirColumnas('tablas');
  }

  ngOnInit() {
    this._translocoService.selectTranslateObject('submoduloCertificadosCuros.moduloCursoModulo.rutas.rutaGestionModuloCurso.titulos').subscribe(
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
      (parametros: { idEmpresa: string, idCurso: string }) => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idCurso = +parametros.idCurso;
        this.ruta = RUTAS_MODULO_CURSO.rutaGestionModuloCurso(
          false,
          true,
          [
            this.idEmpresa,
            this.idCurso
          ],
        ).ruta;
        this.habilitar = true;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          // declarar rutas para migas de pan en orden
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_CURSO.rutaGestionCursos(false, true, [this.idEmpresa]),
          RUTAS_MODULO_CURSO.rutaGestionModuloCurso(false, true, [
              this.idEmpresa,
              this.idCurso
            ],
          ),
        ];
        this.habilitar = true;
        this.establecerMigas(rutas);
      }
    );

    this.queryParams.where = {
      siguienteModulo: {
        mlabJoin: 'left'
      },
      anteriorModulo: {
        mlabJoin: 'left'
      },
      curso: {
        id: [this.idCurso]
      },
    };
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.where.nombre = undefined;
    } else {
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where.nombre = [
        `Like("%25${busqueda}%25")`,
      ];
    }
    this.queryParams.skip = 0;
    this.queryParams.take = 10;
    this.queryParams.order = {
      id: 'DESC',
    };
    this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
  }

  abrirModalEditarModuloCursoInterface(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    this.establecerRegistroActual(registro.id);
    const dialogRef = this.dialog.open(CrearEditarModuloCursoComponent, {
      width: '600px',
      data: {
        moduloCurso: registro,
        idCurso: this.idCurso,
      },
    });
    dialogRef.afterClosed().subscribe((registroEditado: ModuloCursoInterface) => {
      if (registroEditado) {
        const consulta = {
          where: {
            id: [registroEditado.id],
            siguienteModulo: {
              mlabJoin: 'left'
            },
            anteriorModulo: {
              mlabJoin: 'left'
            },
          },
        };
        this._moduloCursoRestService.findAll('criterioBusqueda=' + JSON.stringify(consulta)).subscribe(
          (registros) => {
            const registroEditadoConsultado = registros[0][0];
            this.values[indiceRegistro] = registroEditadoConsultado;
          }
        );
      }
    });
  }

  abriModalCrearEditarCaratula(moduloCurso) {
    const dialogRef = this.dialog.open(
      ModalSubirCaratulaComponent,
      {
        width: '700px',
        data: {
          moduloCurso: moduloCurso,
        },
      }
    );
    dialogRef.afterClosed().subscribe(
      (respuestaModal) => {
        if (respuestaModal) {
          moduloCurso.urlCaratula = respuestaModal.data.urlCaratula;
        }
      },
      error => console.error({
        mensaje: 'No se pudo actualizar el registro',
        error
      }),
    );
  }

  abrirModalCrearModuloCursoInterface() {
    const dialogRef = this.dialog.open(CrearEditarModuloCursoComponent, {
      width: '600px',
      data: {
        moduloCurso: undefined,
        idCurso: this.idCurso,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: ModuloCursoInterface) => {
        if (registroCreado) {
          const consulta = {
            where: {
              id: [registroCreado.id],
              siguienteModulo: {
                mlabJoin: 'left'
              },
              anteriorModulo: {
                mlabJoin: 'left'
              },
            },
          };
          this._moduloCursoRestService.findAll('criterioBusqueda=' + JSON.stringify(consulta)).subscribe(
            (registros) => {
              const registroCreadoConsultado = registros[0][0];
              this.values.unshift(registroCreadoConsultado);
            }
          );
        }
      },
      error => console.error({
        mensaje: 'No se pudo crear el registro',
        error,
      })
    );
  }

  irAGestionModuloHijo(
    idModuloCurso: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    let ruta;
    if (moduloHijo === 'tema') {
      ruta = RUTAS_TEMA.rutaGestionTema(
        false,
        true,
        [
          this.idEmpresa,
          this.idCurso,
          idModuloCurso
        ]
      ).ruta;
    }
    if (moduloHijo === 'prueba') {
      ruta = RUTAS_PRUEBA.rutaGestionPrueba(
        false,
        true,
        [
          this.idEmpresa,
          this.idCurso,
          idModuloCurso
        ]
      ).ruta;
    }
    this._router.navigate(
      ruta
    );
  }

  gestionarOrden() {
    this.traduccionesToaster.toastExitoOrdenVacio.type = 'success';
    this.traduccionesToaster.toastErrorOrdenVacio.type = 'error';
    const consultaModulo = JSON.stringify(
      {
        where: {
          curso: {
            id: [+this.idCurso]
          },
          siguienteModulo: {
            mlabJoin: 'left'
          },
          anteriorModulo: {
            mlabJoin: 'left'
          },
        },
        take: 1000,
      }
    );
    this._cargandoService.habilitarCargando();
    this._moduloCursoRestService.findAll('criterioBusqueda=' + consultaModulo)
      .pipe(
        mergeMap(
          (respuesta: [ModuloCursoInterface[], number]) => {
            return of(respuesta[0]);
          }
        ),
        ordenarElementos('siguienteModulo', 'anteriorModulo'),
      )
      .subscribe(
        (respuesta: ModuloCursoInterface[]) => {
          this._cargandoService.deshabilitarCargando();
          const configuracion: OrdenInterface = {
            listaOrigen: respuesta,
            atributoMostrar: 'nombre',
            tituloDestino: this.traduccionesTitulos.ordenNuevo,
            tituloOrigen: this.traduccionesTitulos.ordenActual,
            atributoFiltrar: 'nombre',
            atributoOrdenInicio: 'anteriorModulo',
            atributoOrdenFinal: 'siguienteModulo',
            tituloModal: this.traduccionesTitulos.modalGestionOrden,
          };
          const dialogRef = this.dialog.open(GestionOrdenComponent, {
            width: '500px',
            data: {
              configuracion,
            },
          });
          dialogRef.afterClosed().subscribe(
            (respuestaModal) => {
              if (respuestaModal) {
                this._cargandoService.habilitarCargando();
                this._moduloCursoRestService.cargarMasivo(
                  respuestaModal,
                ).subscribe(
                  (respuestaConsulta) => {
                    this._cargandoService.deshabilitarCargando();
                    this._toasterServicePrivate.pop(this.traduccionesToaster.toastExitoOrdenVacio as Toast);
                  },
                  error => {
                    console.error(
                      {
                        mensaje: 'No se actualizo el orden',
                        error: error,
                        data: {registro: respuestaModal}
                      }
                    );
                    this._cargandoService.deshabilitarCargando();
                    this._toasterServicePrivate.pop(this.traduccionesToaster.toastErrorOrdenVacio as Toast);
                  }
                );
              }
            }
          );
        },
        error => console.error({error})
      );
  }

  escucharEstadoSeleccionado(eventoEstado: ESTADOS.Activo | ESTADOS.Inactivo, busqueda: string) {
    this.queryParams.where.habilitado = eventoEstado;
  }

  actualizarEstado(registro: CursoInterface) {
    this.traduccionesToaster.toastExitoEditarVacio.type = 'success';
    this.traduccionesToaster.toastErrorEditarVacio.type = 'error';
    const cursoEnArreglo = this.values.find(
      curso => curso.id === registro.id
    );
    const indiceRegistro = this.values.indexOf(cursoEnArreglo);
    const habilitado = registro.habilitado === ESTADOS.Inactivo ? 1 : 0;
    this._cargandoService.habilitarCargando();
    this._moduloCursoRestService.cambiarEstado(
      registro.id,
      {habilitado}
    ).subscribe(
      () => {
        this._toasterService.pop(this.traduccionesToaster.toastExitoEditarVacio as Toast);
        this.values[indiceRegistro].habilitado = habilitado;
      }, error => {
        console.error(
          {
            mensaje: 'No se actualizo el registro',
            error: error,
            data: {registro}
          }
        );
        this._toasterService.pop(this.traduccionesToaster.toastErrorEditarVacio as Toast);
      }
    );
    this._cargandoService.deshabilitarCargando();
  }
}

