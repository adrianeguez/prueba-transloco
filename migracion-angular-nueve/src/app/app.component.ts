import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {CargandoService} from 'man-lab-ng';
import {LocalForageService} from 'ngx-localforage';
import {Auth0Service} from './submodulos/submodulo-front-comun/servicios/auth0/auth0.service';
import {createConnection} from 'typeorm';
import {ENTIDADES_PEDIDO} from './submodulos/submodulo-pedido-front/constantes/entidades';
import {getConnection, getRepository, Repository} from 'typeorm/browser';
// tslint:disable-next-line:max-line-length
import {CargarArticulosPreciosImpuestosService} from './submodulos/submodulo-pedido-front/servicios/cargar-articulos-precios-impuestos.service';
import {TIEMPO_CARGAR_DATOS_ARTICULOS, TIEMPO_CARGAR_VENTAS} from './constantes/tiempo-cargar-datos';
// tslint:disable-next-line:max-line-length
import {ConfiguracionRestSqljsService} from './submodulos/submodulo-pedido-front/servicios/rest/configuracion/configuracion-rest-sqljs.service';
import {fromEvent, Subscription} from 'rxjs';
import {ConfiguracionEntity} from './submodulos/submodulo-pedido-front/servicios/rest/configuracion/configuracio.entity';
import {CargarVentasService} from './submodulos/submodulo-pedido-front/servicios/cargar-ventas.service';
import {toastErrorCargarDatos, toastExitoCargarDatos} from './constantes/mensajes-toaster';
import * as moment from 'moment';
import {environment} from '../environments/environment';
import {AvailableLangs, TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend-pruebas-submodullos';
  private backEvent: Subscription;
  bloqueado = false;
  mostrarIconos = true;
  configuracion: ConfiguracionEntity;
  urlSalir: string;
  fechaActual;
  availableLangs: AvailableLangs;

  constructor(
    private readonly _cargandoService: CargandoService,
    private localforage: LocalForageService,
    public readonly _auth0Service: Auth0Service,
    private readonly _cargarArticulosPreciosImpuestosService: CargarArticulosPreciosImpuestosService,
    private readonly _cargarVentasService: CargarVentasService,
    private readonly _translocoService: TranslocoService,
  ) {
    moment.locale('es');
    this.establecerLenguajesDeInternacionalizacion(_translocoService);
    this.urlSalir = `${environment.url}${environment.port}/logout`;
    this.fechaActual = moment();
  }

  establecerLenguajesDeInternacionalizacion(_translocoService: TranslocoService) {
    _translocoService.setAvailableLangs(
      [
        {
          id: 'en',
          label: 'English'
        },
        {
          id: 'es',
          label: 'Español'
        }
      ]
    );
  }

  async ngOnInit() {
    this.escucharCambiosEnCargandoService();
    try {
      await createConnection({
        type: 'sqljs',
        location: 'test',
        autoSave: true,
        logging: [
          // 'query',
          // 'schema'
        ],
        // synchronize: true,
        // dropSchema: false,
        entities: [...ENTIDADES_PEDIDO]
      });
      try {
        const connection = await getConnection();
        const queryRunner = await connection.createQueryRunner();
        await queryRunner.connection.synchronize(false);
        console.log({
          mensaje: 'Base de datos sincronizada'
        });
        this.iniciarCargas();
      } catch (e) {
        console.error({
          error: e,
          mensaje: 'Ya hay base de datos',
        });
      }
    } catch (e) {
    }
  }

  iniciarCargas() {
    setInterval(async () => {
      this._cargarArticulosPreciosImpuestosService.cargarArticulosPreciosImpuestos().then(() => {
      }).catch(error => {
        console.error(error);
      });
    }, TIEMPO_CARGAR_DATOS_ARTICULOS);
    setInterval(async () => {
      try {
        this._cargarVentasService.cargarPedidosVenta();
      } catch (e) {
        console.error(e);
      }
    }, TIEMPO_CARGAR_VENTAS);
  }

  escucharCambiosEnCargandoService() {
    this._cargandoService.cambioCargando.subscribe(cambio => {
      this.bloqueado = cambio;
    });
  }

  // cerrar pagina
  @HostListener('window:unload', ['$event'])
  async unloadHandler($event) {
    alert('This is an Alert Dialog');
    $event.returnValue = true;
    const estaCargaVentasEnCurso = JSON.parse(localStorage.getItem('estaCargandoVentas'));
    const estaCargaEnCurso = JSON.parse(localStorage.getItem('estaCargando'));
    if (estaCargaVentasEnCurso || estaCargaEnCurso) {
      alert('This is an Alert Dialog');
      if (estaCargaVentasEnCurso) {
        localStorage.setItem('cierreForzadoVentas', '1');
        localStorage.setItem('estaCargandoVentas', '0');
      }
      if (estaCargaEnCurso) {
        localStorage.setItem('cierreForzado', '1');
        localStorage.setItem('estaCargando', '0');
      }
      $event.returnValue = true;
    }
  }

  // actualizar pagina
  @HostListener('window:beforeunload', ['$event'])
  async beforeUnloadHander($event) {
    const estaCargaVentasEnCurso = JSON.parse(localStorage.getItem('estaCargandoVentas'));
    const estaCargaEnCurso = JSON.parse(localStorage.getItem('estaCargando'));
    if (estaCargaVentasEnCurso || estaCargaEnCurso) {
      alert('This is an Alert Dialog');
      if (estaCargaVentasEnCurso) {
        localStorage.setItem('cierreForzadoVentas', '1');
        localStorage.setItem('estaCargandoVentas', '0');
      }
      if (estaCargaEnCurso) {
        localStorage.setItem('cierreForzado', '1');
        localStorage.setItem('estaCargando', '0');
      }
      $event.returnValue = true;
    }
  }

  cerrarSesion() {
    window.location.href = this.urlSalir;
  }
}
