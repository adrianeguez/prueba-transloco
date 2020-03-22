import {PreguntasPorPruebaInterface} from '../../interfaces/preguntas-por-prueba.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Toast, ToasterService} from 'angular2-toaster';
import {PruebaUsuarioInterface} from '../../interfaces/prueba-usuario.interface';
import * as moment from 'moment';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Moment} from 'moment';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {PruebaUsuarioRestService} from '../../servicios/rest/prueba-usuario-rest.service';
import {PruebaInterface} from '../../interfaces/prueba.interface';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {TiemposPreguntasPorPruebaUsuarioInterface} from '../../interfaces/tiempos-preguntas-por-prueba-usuario.interface';
import {PreguntasPorPruebaUsuarioInterface} from '../../interfaces/pregunta-por-prueba-usuario.interface';
import {CountdownComponent, CountdownEvent} from 'ngx-countdown';
import {OpcionInterface} from '../../../opcion/interfaces/opcion.interface';
import {Auth0Service} from '../../../../../submodulo-roles-frontend/servicios/rest/auth0.service';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-test-pretest',
  templateUrl: './test-pretest.component.html',
  styleUrls: ['./test-pretest.component.scss']
})
export class TestPretestComponent extends RutaConMigasDePan implements OnInit {

  @Input()
  rutas: MigaDePanInterface[];

  @Input()
  rutaTraduccion: string;

  @Input()
  parametros: {
    idCursoUsuario: number; idModuloCursoUsuario: number;
    idModuloCurso: number; idTema: number; idPruebaUsuario: number
  };

  tipoTest: string;
  cargarPrueba = true;

  test: PruebaInterface;
  pruebaUsuario: PruebaUsuarioInterface;
  preguntasPorPruebaUsuario: PreguntasPorPruebaUsuarioInterface [] = [];
  tiemposPreguntasPorPruebaUsuario: TiemposPreguntasPorPruebaUsuarioInterface [] = [];

  tiempoIniciaPrueba: Moment;
  tiempoFinalizaPrueba: Moment;
  tiempoLimite: number;

  formulario: FormGroup;
  puntaje = 0;
  aciertos = 0;
  fallos = 0;
  termino: 0 | 1;
  mensajePuntaje = '';
  mensajePretest = '';
  mensajeError: string;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private readonly  _pruebaUsuarioRestService: PruebaUsuarioRestService,
    private readonly _toasterService: ToasterService,
    private readonly _auth0RestService: Auth0Service,
    public _formBuilder: FormBuilder,
    protected _translocoService: TranslocoService,
    protected _router: Router,
  ) {
    super(_emitirMigaPanService, _translocoService);
  }

  ngOnInit() {
    this.obtenerDatosTest();
    this.tiempoIniciaPrueba = moment();
  }

  iniciarFormularios() {
    const controles: {
      [key: string]: any;
    } = {};
    this.test.preguntasPorPrueba.forEach(
      (preguntas: PreguntasPorPruebaInterface) => {
        const idPregunta = preguntas.pregunta.id;
        controles[idPregunta] = [''];
      }
    );
    this.formulario = this._formBuilder.group(
      {
        ...controles
      }
    );
  }

  obtenerDatosTest() {
    const consulta = {
      where: {
        id: this.parametros.idPruebaUsuario,
        prueba: {
          mlabJoin: 'left',
          preguntasPorPrueba: {
            mlabJoin: 'left',
            habilitado: true,
            pregunta: {
              mlabJoin: 'left',
              opciones: {
                mlabJoin: 'left',
                habilitado: true,
              }
            }
          }
        },
      },
      skip: 0
    };
    this.establecerMigas(this.rutas);
    const pruebaUsuarioEncontrada$ = this._pruebaUsuarioRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    pruebaUsuarioEncontrada$
      .subscribe(
        (pruebaUsuario: [PruebaUsuarioInterface[], number]) => {
          this.pruebaUsuario = pruebaUsuario[0][0];
          this.test = pruebaUsuario[0][0].prueba;
          this.tipoTest = this.test.tipo;
          this.pruebaUsuario.puntajeTotal = 0;
          if (this.pruebaUsuario.fechaFin) {
            this.mensajeError =
              this._translocoService.translate(this.rutaTraduccion + '.mensajes.mensajePruebaHecha');
            this.cargarPrueba = false;
            this.tiempoLimite = 1;
          } else {
            this.calcularTiempoFaltante();
            this.iniciarFormularios();
            this.iniciarPreguntasPorPruebaUsuario();
          }
        },
        error => {
          const errorMostrarToast: Toast = {
            type: 'error',
            title: this._translocoService.translate('generales.toasters.toastErrorMostrar.title'),
            body: this._translocoService.translate('generales.toasters.toastErrorMostrarVacio.body'),
            showCloseButton: true
          };
          this._toasterService.pop(
            errorMostrarToast
          );
        }
      );
  }

  comprobarRespuesta(opcion: OpcionInterface, i: number, i2: number) {
    const preguntaSeleccionada = this.test.preguntasPorPrueba[i].pregunta;
    this.test.preguntasPorPrueba[i].pregunta.opciones[i2].hizoCheck = 1;
    this.formulario.get(preguntaSeleccionada.id.toString()).disable();
    if (!opcion.esRespuesta) {
      preguntaSeleccionada.habilitarBotonTratar = 1;
      this.fallos++;
    } else {
      preguntaSeleccionada.habilitarBotonTratar = 0;
      this.aciertos++;
    }
  }

  comprobarResultadosYEnviar() {
    this.termino = 1;
    this.formulario.disable();
    this.tiempoFinalizaPrueba = moment();
    if (this.tipoTest === 'test') {
      this.comprobarResultados();
    }
    this.establecerDatosPruebaUsuario();
    this.crearPruebaPreguntasUsuario(this.pruebaUsuario, this.preguntasPorPruebaUsuario);
  }

  establecerDatosPruebaUsuario() {
    if (this.aciertos === 0 && this.fallos === 0) {
      this.puntaje = 0;
    } else {
      this.puntaje = this.aciertos * 100 / (this.aciertos + this.fallos);
    }
    this._translocoService
      .selectTranslate(
        this.rutaTraduccion + '.mensajes.mensajePuntaje',
        {puntaje: this.puntaje})
      .subscribe(
        value => this.mensajePuntaje = value
      );
    let estado: string;
    if (this.puntaje > 80) {
      estado = 'passed';
    } else {
      estado = 'failed';
      if (this.tipoTest === 'pretest') {
        this.mensajePretest = this._translocoService.translate(this.rutaTraduccion + '.mensajes.mensajePretest');
      }
    }
    const duracionPruebaUsuario = this.tiempoFinalizaPrueba.diff(this.tiempoIniciaPrueba, 'seconds');
    this.pruebaUsuario.puntajeTotal = this.puntaje;
    this.pruebaUsuario.totalAciertos = this.aciertos;
    this.pruebaUsuario.totalErroneas = this.fallos;
    this.pruebaUsuario.estado = estado;
    this.pruebaUsuario.tiempoTotal = duracionPruebaUsuario;
    this.pruebaUsuario.moduloUsuario = this.parametros.idModuloCursoUsuario;
  }

  regresarTest() {
    const rutaModulo = RUTAS_MODULO_CURSO.rutaMenuModuloCurso(false, true,
      [
        this.parametros.idCursoUsuario,
      ]).ruta;
    this._router.navigate(
      rutaModulo
    );
  }

  regresarPretest() {
    const ruta = RUTAS_DIAPOSITIVA.rutaMenuDiapositiva(false, true,
      [
        this.parametros.idCursoUsuario,
        this.parametros.idModuloCursoUsuario,
        this.parametros.idModuloCurso,
        this.parametros.idTema,
      ]).ruta;
    this._router.navigate(
      ruta
    );
  }

  limpiar(formulario: FormGroup, idPregunta: string) {
    formulario.get(idPregunta.toString()).enable();
    formulario.get(idPregunta.toString()).reset();
    this.fallos--;
  }

  iniciaTiempoPregunta(i: number) {
    this.tiemposPreguntasPorPruebaUsuario[i].tiempoInicia = moment();
  }

  terminaTiempoPregunta(i: number) {
    this.tiemposPreguntasPorPruebaUsuario[i].tiempoFinaliza = moment();
    const tiempoIniciaPregunta = this.tiemposPreguntasPorPruebaUsuario[i].tiempoInicia;
    const tiempoFinalizaPregunta = this.tiemposPreguntasPorPruebaUsuario[i].tiempoFinaliza;
    const nuevoTiempoEmpleado = tiempoFinalizaPregunta.diff(tiempoIniciaPregunta, 'seconds');
    if (this.preguntasPorPruebaUsuario[i].tiempoEmpleado > 0) {
      this.preguntasPorPruebaUsuario[i].tiempoEmpleado =
        this.preguntasPorPruebaUsuario[i].tiempoEmpleado + nuevoTiempoEmpleado;
    } else {
      this.preguntasPorPruebaUsuario[i].tiempoEmpleado = nuevoTiempoEmpleado;
    }
  }

  iniciarPreguntasPorPruebaUsuario() {
    let cont = 0;
    this.test.preguntasPorPrueba.forEach(
      (preguntas: PreguntasPorPruebaInterface) => {
        const nuevaPreguntaPorPruebaUsuario: PreguntasPorPruebaUsuarioInterface = {
          pregunta: preguntas.pregunta,
          correcto: 0,
          pruebaUsuario: this.pruebaUsuario,
          tiempoEmpleado: 0,
        };
        this.preguntasPorPruebaUsuario.push(nuevaPreguntaPorPruebaUsuario);
        const nuevosTiempos: TiemposPreguntasPorPruebaUsuarioInterface = {
          tiempoInicia: moment(),
          tiempoFinaliza: moment()
        };
        this.tiemposPreguntasPorPruebaUsuario.push(nuevosTiempos);
        cont++;
      }
    );
  }

  comprobarResultados() {
    const opcionesSeleccionadas = Object.values(this.formulario.value);
    let i = 0;
    opcionesSeleccionadas.forEach(
      (opcion: string) => {
        const esRespuesta = opcion.split('/');
        const esRespuestaNumero = Number(esRespuesta[1]);
        if (isNaN(esRespuestaNumero) || !esRespuestaNumero) {
          // respuesta vacía o errónea
          this.preguntasPorPruebaUsuario[i].correcto = 0;
          this.fallos++;
        } else if (esRespuestaNumero) {
          this.preguntasPorPruebaUsuario[i].correcto = 1;
          this.aciertos++;
        }
        i++;
      }
    );
  }

  handleEvent($event: CountdownEvent, countdown: CountdownComponent) {
    if ($event.status === 3) {
      // termino el temporizador
      this.comprobarResultadosYEnviar();
    }
    if (!this.cargarPrueba) {
      countdown.stop();
    }
  }

  crearPruebaPreguntasUsuario(pruebaUsuario: PruebaUsuarioInterface,
                              preguntasPorPruebaUsuario: PreguntasPorPruebaUsuarioInterface[]) {
    const consultaCreacion$ = this._pruebaUsuarioRestService.crearPruebaPreguntasUsuario(pruebaUsuario,
      preguntasPorPruebaUsuario);
    consultaCreacion$
      .subscribe(
        () => {
          const exitoCrearToast: Toast = {
            type: 'success',
            title: this._translocoService.translate('generales.toasters.toastExitoCrear.title'),
            body: this._translocoService.translate('generales.toasters.toastExitoCrear.body',
              {nombre: pruebaUsuario.prueba.nombre}),
            showCloseButton: true
          };
          this._toasterService.pop(
            exitoCrearToast
          );
        },
        error => {
          const errorCrearToast: Toast = {
            type: 'error',
            title: this._translocoService.translate('generales.toasters.toastErrorCrear.title'),
            body: this._translocoService.translate('generales.toasters.toastErrorCrearVacio.body'),
            showCloseButton: true
          };
          this._toasterService.pop(
            errorCrearToast
          );
        }
      );
  }

  calcularTiempoFaltante() {
    let fechaServidor;
    this._auth0RestService.obtenerFechaServidor().subscribe(
      (fechaString) => {
        fechaServidor = fechaString;
      },
      (error) => {
        console.error(error);
      }
    );
    this.tiempoLimite = moment(this.pruebaUsuario.fechaLimite)
      .diff(moment(fechaServidor), 'seconds');
  }
}
