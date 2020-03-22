import {Component, OnDestroy, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {ActivatedRoute, Router} from '@angular/router';
import {RUTAS_DIAPOSITIVA} from '../definicion-rutas/definicion-rutas-diapostiva';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {DiapositivaRestService} from '../../servicios/rest/diapositiva.rest.service';
import {DiapositivaFormateadaInterface} from '../../interfaces/diapositiva.formateada.interface';
import {DiapositivaInterface} from '../../interfaces/diapositiva.interface';
import {ContenidoInterface} from '../../../contenido/interfaces/contenido.interface';
import {Observable, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {ModuloCursoUsuarioRestService} from '../../../modulo-curso/servicios/rest/modulo-curso-usuario.rest.service';
import {ModuloCursoUsuarioInterface} from '../../../modulo-curso/interfaces/modulo-curso-usuario.interface';
import {TemaRestService} from '../../../tema/servicios/rest/tema.rest.service';
import {TemaInterface} from '../../../tema/interfaces/tema.interface';
import {transformarSegundosATiempo, transformarTiempoASegundos} from '../../funciones/funciones.tiempo';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {DiapositivaUsuarioRestService} from '../../servicios/rest/diapositiva.usuario.rest.service';
import {DiapositivaUsuarioInterface} from '../../interfaces/diapositiva.usuario.interface';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {CronometroService} from '../../componentes/cronometro/cronometro.service';
import {ToasterService} from 'angular2-toaster';
import {DIAPOSITIVA_FIN, DIAPOSITIVA_INICIO} from './objetos-apoyo/diapositivas.apoyo';
import {environment} from '../../../../../../../environments/environment';
import {ordenarElementos} from '../../../../funciones/funcionesOrdenamiento';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {TranslocoService} from '@ngneat/transloco';
declare var google;

@Component({
  selector: 'app-ruta-menu-diapositiva',
  templateUrl: './ruta-menu-diapositiva.component.html',
  styleUrls: ['./ruta-menu-diapositiva.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class RutaMenuDiapositivaComponent extends RutaConMigasDePan implements OnInit, OnDestroy {
  idEmpresa: number;
  idCursoUsuario: number;
  idModuloCurso: number;
  tiempoTotalAudio = 0;
  idTema: number;
  idModuloCursoUsuario: number;
  idUsuario: any;
  tiempoCronometro: any;
  diapositivas: DiapositivaInterface[];
  totalDiapositivas = 0;
  caratulaModulo = '';
  diapositvasFormateadas: DiapositivaFormateadaInterface[] = [];
  diapositivaActual: DiapositivaFormateadaInterface = {
    id: 0,
    duracion: 0,
    habilitado: undefined,
    tipo: 0,
    titulo: '',
    clase: '',
  };
  urlAudio: string;
  tiempoActualAudio: any = '00:00:00';
  estaReproduciendo = false;
  diapositivasUsuario: DiapositivaUsuarioInterface[];
  tituloTema = '';

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private readonly _activeRoute: ActivatedRoute,
    private readonly _diapositivaRestService: DiapositivaRestService,
    private readonly _moduloCursoUsuario: ModuloCursoUsuarioRestService,
    private readonly _temaService: TemaRestService,
    private readonly _router: Router,
    private _location: Location,
    private readonly _diapositivaUsuarioService: DiapositivaUsuarioRestService,
    private readonly _auth0Service: Auth0Service,
    private readonly _cronometroService: CronometroService,
    private readonly _toasterService: ToasterService,
    protected translocoService: TranslocoService,
    private readonly _cargandoService: CargandoService,
  ) {
    super(_emitirMigaPanService, translocoService);
    this.idUsuario = +this._auth0Service.empresasEnLasQueTrabaja[0].datoUsuario.id;
  }

  escucharCronometro(event) {
    this.tiempoCronometro = event;
  }

  empezarCronometro() {
    this._cronometroService.reanudarConteo();
  }

  reiniciarConteo() {
    this._cronometroService.reiniciarTiempo();
  }

  protected formatearDiapositiva() {
    return mergeMap(
      (respuestaConsulta: [DiapositivaInterface[], number]) => {
        this.diapositivas = respuestaConsulta[0];
        this.totalDiapositivas = respuestaConsulta[1];
        return of(this.diapositivas.map(
          (diapositiva: DiapositivaInterface) => {
            const diapositivaFormateada: DiapositivaFormateadaInterface = {
              ...diapositiva
            };
            const textos: string[] = [];
            const imagenes: string[] = [];
            const links: string[] = [];
            diapositiva.contenidos.forEach(
              (contenido: ContenidoInterface) => {
                const tieneTexto = !!contenido.texto;
                const tieneImagen1 = !!contenido.urlImagen1;
                const tieneImagen2 = !!contenido.urlImagen2;
                const tieneLink = !!contenido.link;
                if (tieneTexto) {
                  textos.push(contenido.texto);
                }
                if (tieneImagen1) {
                  imagenes.push(contenido.urlImagen1);
                }
                if (tieneImagen2) {
                  imagenes.push(contenido.urlImagen2);
                }
                if (tieneLink) {
                  links.push(contenido.link);
                }
              }
            );
            diapositivaFormateada.imagenes = imagenes;
            diapositivaFormateada.textos = textos;
            diapositivaFormateada.links = links;
            return diapositivaFormateada;
          }
        ));
      }
    );
  }

  protected obtenerDiapositivas(): Observable<[DiapositivaInterface[], number]> {
    const consulta = {
      where:
        {
          tema:
            {
              id: this.idTema,
              // moduloCurso: {id: [this.idModuloCurso]},
            },
          contenidos: {
            mlabJoin: 'left'
          },
          pruebas: {
            mlabJoin: 'left'
          },
          anteriorDiapositiva: {
            mlabJoin: 'left'
          },
          siguienteDiapositiva: {
            mlabJoin: 'left'
          }
        }
    };
    return this._diapositivaRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(consulta)
    );
  }

  protected obtenerDiapositivasDelTema() {
    return mergeMap(
      (informacionModulo: [ModuloCursoUsuarioInterface[], number]) => {
        this.caratulaModulo = informacionModulo[0][0].moduloCurso.urlCaratula;
        return this.obtenerDiapositivas();
      }
    );
  }

  protected determidarClaseDiapositiva() {
    return mergeMap(
      (diapositivasFormateadas: DiapositivaFormateadaInterface[]) => {
        return of(
          diapositivasFormateadas.map(
            (diapositiva: DiapositivaFormateadaInterface) => {
              const totalImagenes = diapositiva.imagenes.length;
              const totalTextos = diapositiva.textos.length;
              const totalLinks = diapositiva.links.length;
              const totalPruebas = diapositiva.pruebas.length;
              let tipo = 'A';
              const esTipoA = totalTextos && !totalImagenes;
              const esTipoB = totalTextos === 1 && totalImagenes === 1;
              const esTipoC = totalTextos > 1 && totalImagenes > 1 && totalTextos > totalImagenes;
              const esTipoD = totalTextos === 1 && totalImagenes === 2;
              const esTipoE = totalTextos > 1 && totalImagenes > 1 && totalTextos < totalImagenes;
              const esTipoF = totalTextos > 1 && totalImagenes > 1 && totalTextos === totalImagenes;
              const esTipoG = totalTextos > 1 && totalImagenes === 3;
              const esTipoH = (totalTextos || totalImagenes) && totalLinks;
              const esTipoI = totalImagenes && totalLinks;
              const esTipoP = !!totalPruebas;
              if (esTipoA) {
                tipo = 'A';
              }
              if (esTipoB) {
                tipo = 'B';
              }
              if (esTipoC) {
                tipo = 'C';
              }
              if (esTipoD) {
                tipo = 'D';
              }
              if (esTipoE) {
                tipo = 'E';
              }
              if (esTipoF) {
                tipo = 'F';
              }
              if (esTipoG) {
                tipo = 'G';
              }
              if (esTipoH) {
                tipo = 'H';
              }
              if (esTipoI) {
                tipo = 'I';
              }
              if (esTipoP) {
                tipo = 'P';
              }
              diapositiva.clase = tipo;
              return diapositiva;
            }
          )
        );
      }
    );
  }

  ngOnInit() {
    this.googleTranslateElementInit();
    this._activeRoute.params.pipe(take(1)).subscribe(
      (parametros: { idCursoUsuario: string, idModuloCursoUsuario: string, idModuloCurso: string, idTema: string }) => {
        this.idCursoUsuario = +parametros.idCursoUsuario;
        this.idModuloCursoUsuario = +parametros.idModuloCursoUsuario;
        this.idModuloCurso = +parametros.idModuloCurso;
        this.idTema = +parametros.idTema;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_CLIENTE.rutaInicio(false, true),
            RUTAS_CURSO.rutaMenuInicioUsuarioCurso(false, true),
            RUTAS_CURSO.rutaMenuMisCursos(false, true),
            RUTAS_MODULO_CURSO.rutaMenuModuloCurso(false, true,
              [
                this.idCursoUsuario,
              ]),
            RUTAS_TEMA.rutaMenuTema(false, true,
              [
                this.idCursoUsuario,
                this.idModuloCursoUsuario,
                this.idModuloCurso
              ]),
            RUTAS_DIAPOSITIVA.rutaMenuDiapositiva(false, true,
              [
                this.idCursoUsuario,
                this.idModuloCursoUsuario,
                this.idModuloCurso,
                this.idTema,
              ])
          ]
        ;
        this.establecerMigas(rutas);
        // traducirMigas(this, rutas);
      }
    );
    this.cargarDiapositivasUsuario(); // Diapòsitivas que ha tocado el usuario
    this.obtenerInformacionTema();
    this.obtenerMetaDataModulo()
      .pipe(
        this.obtenerDiapositivasDelTema(),
        this.formatearDiapositiva(),
        this.determidarClaseDiapositiva(),
        ordenarElementos('siguienteDiapositiva', 'anteriorDiapositiva'),
        // this.ordenarDiapositivas(),
        this.agregarDiapositivasApoyo(),
      ).pipe(take(1))
      .subscribe(
        (diapositivasFormateadas) => {
          this.diapositvasFormateadas = diapositivasFormateadas;
          this.diapositivaActual = diapositivasFormateadas[0];
          this.cargarQueryParams(diapositivasFormateadas);
          this.empezarCronometro();
        }
      );
  }

  agregarDiapositivasApoyo() {
    return mergeMap(
      (diapositivasFormateadas: DiapositivaFormateadaInterface[]) => {
        const diapositivasConDiapositivasApoyo = [
          DIAPOSITIVA_INICIO,
          ...diapositivasFormateadas,
          DIAPOSITIVA_FIN
        ];
        return of(diapositivasConDiapositivasApoyo);
      }
    );
  }

  mostrarContenido(diapositiva: DiapositivaFormateadaInterface) {
    this._cargandoService.habilitarCargando();
    this.guardarEstadoDiapositiva()
      .pipe(take(1))
      .subscribe(
        (diapositivaUsuario) => {
          this.diapositivaActual = diapositiva;
          this.cargarDiapositivasUsuario();
          this.guardarQueryParams();
          this.reiniciarConteo();
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({
              error,
              data: diapositiva,
            }
          );
          this._toasterService.pop('error', 'Intertet Connection', 'Check your internet connection');
        }
      );
  }

  guardarEstadoDiapositiva() {
    // 1 ver si existe
    const diapositivaUsuario$ = of(this.diapositivasUsuario.find(
      (diapositivaDelUsuario: DiapositivaUsuarioInterface) => {
        return diapositivaDelUsuario.diapositiva.id === this.diapositivaActual.id;
      },
    ));
    return diapositivaUsuario$
      .pipe(
        mergeMap(
          (diapositivaDelUsuario: DiapositivaUsuarioInterface) => {
            if (diapositivaDelUsuario) {
              diapositivaDelUsuario.moduloUsuario = this.idModuloCursoUsuario;
              diapositivaDelUsuario.moduloCurso = this.idModuloCurso;
              diapositivaDelUsuario.diapositiva = this.diapositivaActual.id;
              diapositivaDelUsuario.tiempoEmpleado = Number(diapositivaDelUsuario.tiempoEmpleado) + Number(this.tiempoCronometro);
              return of(diapositivaDelUsuario);
            } else {

              const nuevaDiapositivaUsuario: DiapositivaUsuarioInterface = {
                diapositiva: this.diapositivaActual.id,
                fechaInicio: '',
                fechaFinalizacion: '',
                moduloUsuario: this.idModuloCursoUsuario,
                moduloCurso: this.idModuloCurso,
                tiempoEmpleado: +this.tiempoCronometro,
                tiempoMinimo: this.diapositivaActual.duracion, // tiempo minimo de la diapo
                visto: 1, // ya esta
                tiempoValido: 0, // comparar con el tiempo total del audio para el total de diapositivas con el t. valid
              };
              return of(
                nuevaDiapositivaUsuario
              );
            }
          }
        ),
        mergeMap( // 2 Guardar o Editar
          (diapositivaDelUsuario: DiapositivaUsuarioInterface) => {
            if (this.diapositivaActual.clase !== 'INICIO' && this.diapositivaActual.clase !== 'FIN') {
              if (diapositivaDelUsuario.id) {
                return this._diapositivaUsuarioService.editarAvanceDiapositiva(diapositivaDelUsuario, this.idUsuario, this.idCursoUsuario);
              } else {
                return this._diapositivaUsuarioService.crearAvanceDiapositiva(diapositivaDelUsuario, this.idUsuario, this.idCursoUsuario);
              }
            } else {
              return of(0);
            }

          }
        )
      );
  }

  protected obtenerMetaDataModulo(): Observable<[ModuloCursoUsuarioInterface[], number]> {
    const consulta = {
      where: {
        id: [this.idModuloCursoUsuario],
        moduloCurso: {},
      }
    };
    return this._moduloCursoUsuario.findAll(
      `criterioBusqueda=${JSON.stringify(consulta)}`
    );
  }

  protected obtenerInformacionTema() {
    const consulta = {
      where: {
        id: [this.idTema],
      }
    };
    this._temaService.findAll(`criterioBusqueda=${JSON.stringify(consulta)}`).pipe(take(1))
      .subscribe(
        (respuestaConsulta: [TemaInterface[], number]) => {
          const tema = respuestaConsulta[0][0];
          this.urlAudio = environment.urlGoogleCloudStorage + environment.portGoogleCloudStorage + '/tema' + tema.id;
          this.tituloTema = tema.nombre;
          DIAPOSITIVA_INICIO.titulo = this.tituloTema;
          DIAPOSITIVA_INICIO.textos = [tema.descripcion];
          DIAPOSITIVA_FIN.titulo = 'THE END';
        }
      );
  }

  escuchadorTiempoAudio(evento) {
    this.estaReproduciendo = !evento.srcElement.paused;
    const segundoActual = evento.srcElement.currentTime;
    if (this.estaReproduciendo) {
      this.tiempoActualAudio = transformarSegundosATiempo(segundoActual);
    }
    this.validarTiempoDiapositiva(this.tiempoActualAudio);
    this.guardarQueryParams();
  }

  private validarTiempoDiapositiva(tiempoActual) {
    this.diapositvasFormateadas.forEach(
      (diapositiva: DiapositivaFormateadaInterface) => {
        if (diapositiva.segundoEmpieza === tiempoActual) {
          if (this.estaReproduciendo) {
            this.mostrarContenido(diapositiva);
          }
        }
      }
    );
  }

  private guardarQueryParams() {
    const estado = {
      diapositivaActual: this.diapositivaActual.id,
      tiempoActualAudio: this.tiempoActualAudio,
    };
    const llavesEstado = Object.keys(estado);
    let uri = '';
    llavesEstado.forEach(
      (llave) => {
        uri += `;${llave}=${estado[llave]}`;
      }
    );
    const path = this._router.url.split(';')[0];
    const url = path + uri;
    this._location.go(url);
  }

  private cargarQueryParams(diapositivas) {
    this._activeRoute.params.pipe(take(1)).subscribe(
      (parameros: { diapositivaActual: string, tiempoActualAudio: any }) => {
        const idDiapositivaActual = +parameros.diapositivaActual;
        this.tiempoActualAudio = parameros.tiempoActualAudio;
        const reproductorAudio: any = document.getElementById('audio');
        reproductorAudio.currentTime = transformarTiempoASegundos(this.tiempoActualAudio);
        if (idDiapositivaActual) {
          this.diapositivaActual = diapositivas.find(
            (diapositiva) => diapositiva.id === idDiapositivaActual,
          );
        }
      }
    );
  }

  protected cargarDiapositivasUsuario() {
    const consulta = {
      where: {
        moduloUsuario: {
          id: this.idModuloCursoUsuario,
        },
        diapositiva: {},
      }
    };
    this._diapositivaUsuarioService.findAll('criterioBusqueda=' + JSON.stringify(consulta)).pipe(take(1))
      .subscribe(
        (respuesta: [DiapositivaUsuarioInterface[], number]) => {
          this.diapositivasUsuario = respuesta[0];
        },
        error => console.error(
          {
            error: error,
          }
        ),
      );
  }

  obtenerMetadataAudio(evento, audio) {
    this.tiempoTotalAudio = audio.duration;
  }

  ngOnDestroy(): void {
    //
  }
  googleTranslateElementInit() {
    setTimeout(
      () => {
        if (google.translate.TranslateElement) {
          google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
        } else {
          this.googleTranslateElementInit();
        }
      },
      5
    );
  }
}
