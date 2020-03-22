import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {
  CargandoService,
  EmitirMigaPanService,
  InicializarMapa, LineaInicioFinConfiguracion,
  MarcadorImagenOpenLayer,
  OpenlayersService,
} from 'man-lab-ng';
import {RutaInterface} from 'src/app/submodulos/submodulo-vendedor-front/interfaces/ruta-interface';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {LocalizacionRestService} from '../../../../../submodulo-empresa-front/servicios/rest/localizacion-rest.service';
import {LugarInterface} from '../../../../interfaces/lugar-interface';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {RutaClienteRestService} from '../../../../servicios/rest/ruta-cliente-rest.service';
import {RutaRestService} from '../../../../servicios/rest/ruta-rest.service';
import {RUTAS_MONITOREO} from '../definicion-rutas/rutas-monitoreo-vendedor';
import {DatosVendedorInterface} from 'src/app/submodulos/submodulo-vendedor-front/interfaces/datos-vendedor-interface';
import {RUTAS_DATOS_VENDEDOR} from '../../../datos-vendedor/rutas/definicion-rutas/rutas-datos-vendedor';
import {generarToasterErrorConMensaje, generarToasterWarningConMensaje} from '../../../../constantes/mensajes-toast';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-ruta-monitoreo-vendedores',
  templateUrl: './ruta-monitoreo-vendedores.component.html',
  styleUrls: ['./ruta-monitoreo-vendedores.component.scss'],
})
export class RutaMonitoreoVendedoresComponent extends RutaConMigasDePan
  implements OnInit, OnDestroy {
  values: any;
  rows: 2;
  totalRecords: number;
  localizacionActual: any;
  map: any;
  skip = 0;
  loading: boolean;
  interval;
  estados = ESTADOS;
  vendedores = [];
  idEmpresa: number;
  idVendedor: number;
  vendedor;
  habilitarBotonSeguir = false;

  columnas = [
    {field: 'datosVendedor', header: 'Nombre vendedor'},
    {field: 'id', header: 'Estado'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    private readonly _openlayersService: OpenlayersService,
    private readonly _rutaClienteRestService: RutaClienteRestService,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _rutaRestService: RutaRestService,
    private readonly _localizacionRestService: LocalizacionRestService,
  ) {
    super(_emitirMigaPanService);

  }

  async ngOnInit() {
    try {
      this._cargandoService.habilitarCargando();
      this.localizacionActual = await this.obtenerPosicion();
      this._activatedRoute.params.subscribe(
        r => {
          this.idEmpresa = +r.idEmpresa;
          this.idVendedor = +r.idVendedor;
          const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
            RUTAS_DATOS_VENDEDOR.rutaGestionDatosVendedor(false, true, [this.idEmpresa]),
            RUTAS_MONITOREO.rutaMonitoreoVendedores(false, true, [this.idEmpresa, this.idVendedor]),
          ];
          this.establecerMigas(rutas);
          this._cargandoService.deshabilitarCargando();
        });
      if (this.idVendedor && this.idEmpresa) {
        this.vendedor = await this._datosVendedorRestService.findOne(this.idVendedor).toPromise();
        // tslint:disable
        let coordenadasVendedor = await this.obtenerCoordenadasVendedor(this.idVendedor.toString()) as any;
        this.vendedor.localizaciones = coordenadasVendedor;
        this.vendedor.ultimaLocalizacion = coordenadasVendedor[coordenadasVendedor.length - 1];
        const configuracion: InicializarMapa = {

          // tslint:disable-next-line:max-line-length
          longitud: this.vendedor.ultimaLocalizacion ? this.vendedor.ultimaLocalizacion.localizacion.coordinates[0] : this.localizacionActual.longitude,
          // tslint:disable-next-line:max-line-length
          latitud: this.vendedor.ultimaLocalizacion ? this.vendedor.ultimaLocalizacion.localizacion.coordinates[1] : this.localizacionActual.latitude,
          zoom: 10,
          nombreMapa: 'map',
          intervalo: '100',
          mostrarEscala: true,
        };
        this.map = this._openlayersService.inicializarMapaOpenLayers(
          configuracion,
        );
        if (this.vendedor.localizaciones.length > 0) {
          this.vendedorMapaUbicacion(this.vendedor.localizaciones, 'assets/imagenes/person.png');
          this.obtenerEdificiosVendedorAsignado();
        }
      }
      this._cargandoService.deshabilitarCargando();
    } catch (e) {
      this._toasterServicePrivate.pop(toastErrorConexionServidor);
      this._cargandoService.deshabilitarCargando();
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  obtenerPosicion() {
    return new Promise((res, rej) => {
      navigator.geolocation
        .getCurrentPosition(r => {
            res(r.coords);
          },
          error => {
            console.error(error);
            this._toasterServicePrivate.pop(generarToasterErrorConMensaje('Error al obtener posición'));
            rej(error);
          }
        );
    });
  }

  async obtenerCoordenadasVendedor(idVendedor) {
    try {
      const datos = {
        entidadNombre: 'datos_vendedor',
      };
      const coordenasVendedores = await this._localizacionRestService.buscarLocalizacionesPorEntidad(datos).toPromise() as any;
      const coordenasVendedor = coordenasVendedores.filter(
        r => {
          return r.entidadId === idVendedor;
        }
      );
      return coordenasVendedor;
    } catch (e) {
      console.error(e);
      this._toasterServicePrivate.pop(generarToasterErrorConMensaje('Error al coordenadas'));
    }
  }


  seguimientoVendedorMapa() {
    this.habilitarBotonSeguir = true;
    let contador = 0;
    this._cargandoService.habilitarCargando();
    this.interval = setInterval(
      async () => {
        try {
          contador = contador + 1;
          const coordenadasVendedor = await this.obtenerCoordenadasVendedor(this.idVendedor.toString());
          this.vendedor.localizaciones = coordenadasVendedor;
          this.vendedor.ultimaLocalizacion = coordenadasVendedor[coordenadasVendedor.length - 1];
          if (coordenadasVendedor.length > 0) {
            this.vendedorMapaUbicacion(coordenadasVendedor, 'assets/imagenes/person.png');
          }
          this._cargandoService.deshabilitarCargando();
          if (contador === 30) {
            clearInterval(this.interval);
            this.seguimientoVendedorMapa();
          }
        } catch (e) {
          console.error(e);
          this._cargandoService.deshabilitarCargando();
        }
      }, 1000);
  }

  cancelarBusqueda() {
    this.habilitarBotonSeguir = false;
    clearInterval(this.interval);
    this._toasterServicePrivate.pop(generarToasterWarningConMensaje('Rastreo cancelado'));
  }

  vendedorMapaUbicacion(arreglo, imgPath: string) {
    const arregloPosiciones = [];
    const marcadores: MarcadorImagenOpenLayer[] = arreglo.map(r => {
      const objetoImagen = {
        img: imgPath,
        idMarcador: r.id,
        ...r,
      };
      arregloPosiciones.push([r.localizacion.coordinates[1], r.localizacion.coordinates[0]]);
      return {
        latitud: r.localizacion.coordinates[1],
        longitud: r.localizacion.coordinates[0],
        objetoMarcadorImagen: objetoImagen,
      };
    });
    this.map = this._openlayersService.cargarPuntosConImagenes(
      marcadores,
      this.map,
    );
    const datos: LineaInicioFinConfiguracion = {
      coordenadaInicial: {
        longitud: marcadores[0].longitud,
        latitud: marcadores[0].latitud,
      },
      coordenadaFinal: {
        latitud: marcadores[marcadores.length - 1].latitud,
        longitud: marcadores[marcadores.length - 1].longitud
      },
      configuracionPuntoInicioFin:
        {
          radio: 6,
          colorLlenado: [1, 153, 255, 0],
          colorLinea: [255, 255, 255, 1],
          anchoLinea: 1,
        },
      configuracionLinea: {
        colorLlenado: [1, 255, 255, 255],
        anchoLinea: 1,
      },
      lineasCreciendo: {
        color: 'red',
        color2: 'green',
        width: 1,
        width2: 8,
      },
      arregloCoordenadas: arregloPosiciones,
    };
    this.map = this._openlayersService.dibujarLineaConInicioFin(datos, this.map, true);
  }

  vendedorEdificiosMapaUbicacion(arreglo, imgPath: string) {
    const marcadores: MarcadorImagenOpenLayer[] = arreglo.map(r => {
      const objetoImagen = {
        img: imgPath,
        idMarcador: r.id,
        ...r,
      };
      return {
        latitud: r.edificio.direccion.localizacion.localizacion.coordinates[0],
        longitud: r.edificio.direccion.localizacion.localizacion.coordinates[1],
        objetoMarcadorImagen: objetoImagen,
      };
    });
    this.map = this._openlayersService.cargarPuntosConImagenes(
      marcadores,
      this.map,
    );
    this._openlayersService.escucharCambios(this.map, () => {});
  }

  obtenerEdificiosVendedorAsignado() {
    const datos = {
      idVendedor: this.idVendedor,
    };
    this._rutaClienteRestService
      .obtenerRutaEmpresaDireccion(datos)
      .subscribe(
        r => {
          this.vendedorEdificiosMapaUbicacion(r, 'assets/imagenes/tower.png');
        },
        error => {
          this._toasterServicePrivate.pop(toastErrorConexionServidor);
          console.error(error);
        }
      );
  }
}
