import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {of, Subscription} from 'rxjs';
import {CargandoService} from 'man-lab-ng';
import {OpenlayersService} from '../../servicios/open-layers/open.layers.service';
import {InicializarMapa} from '../../servicios/open-layers/interfaces/inicializar-mapa';
import {GeolocationServices} from '../../servicios/open-layers/geolocation.service';
import {MarcadorImagenOpenLayer} from '../../servicios/open-layers/interfaces/marcador-imagen-open-layer';
import {ObjetoEventoClickOpenLayer} from '../../servicios/open-layers/interfaces/objeto-click-open-layer';
import {EdificioInterface} from '../../../../submodulos/submodulo-empresa-front/interfaces/edificio.interface';
import {EdificioLocalizacionInterface} from '../../interfaces/edificions.localizacion.interface';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, OnDestroy {
  establecimientos: [] = [];
  edificios: [] = [];
  skip = 0;
  take = 1000;
  map: any;
  esConEdificios = false;
  esConPuntos = false;
  @Input()
  informacionGeograficaEntrada;
  @Input()
  edificiosConLocalizacion = false;
  @Input()
  configuracionMapa: InicializarMapa;
  @Output()
  informacionGeografica: EventEmitter<any> = new EventEmitter<any>();
  subscripciones: Subscription[] = [];
  @Output()
  informacionEdificio: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _openLayersService: OpenlayersService,
    private readonly _toasterService: ToasterService,
    private readonly _geolocationService: GeolocationServices,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  async ngOnInit() {
    this.map = undefined;
    await this.cargarMapa();
  }

  async cargarMapa() {
    console.log('cargando...');
    try {
      this._cargandoService.habilitarCargando();
      let coordenadas;
      if (this.informacionGeograficaEntrada || this.edificiosConLocalizacion) {
        if (this.configuracionMapa.tipo === 'Point') {
          /// console.log('Punto', this.informacionGeograficaEntrada);
          const existeInfoGeoGrafica = !!this.informacionGeograficaEntrada;
          if (existeInfoGeoGrafica) {
            this.esConPuntos = true;
            this.esConEdificios = false;
            coordenadas = {
              lng: this.informacionGeograficaEntrada[0][1],
              lat: this.informacionGeograficaEntrada[0][0]
            };
          } else {
            const existenEdificios = !!this.configuracionMapa.edificios;
            if (existenEdificios) {
              this.esConPuntos = false;
              this.esConEdificios = true;
              coordenadas = {
                lng: this.configuracionMapa.edificios[0].localizacion.localizacion.coordinates[1],
                lat: this.configuracionMapa.edificios[0].localizacion.localizacion.coordinates[0],
              };
            }
          }
        }
        if (this.informacionGeograficaEntrada && this.configuracionMapa.tipo === 'LineString') {
          coordenadas = {
            lng: this.informacionGeograficaEntrada[0][1],
            lat: this.informacionGeograficaEntrada[0][0]
          };
        }
        if (this.informacionGeograficaEntrada && this.configuracionMapa.tipo === 'Polygon') {
          coordenadas = {
            lng: this.informacionGeograficaEntrada[0][0][1],
            lat: this.informacionGeograficaEntrada[0][0][0]
          };
        }
      } else {
        coordenadas = this._geolocationService.getCoordendas();
      }
      await this.inicializarMapa(coordenadas.lat, coordenadas.lng);
      this._cargandoService.deshabilitarCargando();
    } catch (e) {
      this._cargandoService.deshabilitarCargando();
      console.error(e);
    }

  }

  async inicializarMapa(latitud: number, longitud: number) {
    this.configuracionMapa.latitud = latitud;
    this.configuracionMapa.longitud = longitud;
    this.map = await this._openLayersService.inicializarMapaOpenLayers(this.configuracionMapa);
    // const marcadores = [];
    if (this.informacionGeograficaEntrada || this.edificiosConLocalizacion) {
      if (this.informacionGeograficaEntrada && this.configuracionMapa.tipo === 'Polygon') {
        this._openLayersService.dibujarPoligonos(this.map, this.informacionGeograficaEntrada);
      }
      if (this.informacionGeograficaEntrada && this.configuracionMapa.tipo === 'LineString') {
        this._openLayersService.dibujarRuta(this.map, this.informacionGeograficaEntrada);
      }
      if (this.configuracionMapa.tipo === 'Point') {
        if (this.esConEdificios) {
          const edificiosConLocalizacion = this.configuracionMapa.edificios;
          const marcadores: MarcadorImagenOpenLayer[] = edificiosConLocalizacion.map(
            (edificio: EdificioLocalizacionInterface) => {
              const direccion = edificio.direccion;
              const objetoImagen = {
                img: 'assets/imagenes/sistema/edificio.svg',
                idMarcador: edificio.id,
                configuracionTexto: {
                  nombreAMostrar: edificio.nombre,
                },
                edificio,
              };
              return {
                // latitud: +direccion.localizacion.localizacion.coordinates[0],
                // longitud: +direccion.localizacion.localizacion.coordinates[1],
                objetoMarcadorImagen: objetoImagen,
                latitud: edificio.localizacion.localizacion.coordinates[0],
                longitud: edificio.localizacion.localizacion.coordinates[1],
              };
            });
          this._openLayersService.cargarPuntosConImagenes(marcadores, this.map);
        }
        // this._openLayersService.dibujarPuntos(this.map, [this.informacionGeograficaEntrada]);
      }
    }
    this._openLayersService.escucharCambios(
      this.map,
      (objeto: ObjetoEventoClickOpenLayer<EdificioInterface>) => {
        if (objeto.salioDeFoco) {
          // Se ejecuta este codigo cuando sale de foco (das click afuera de la imagen ya seleccionada)
          // this.lubricadoraSeleccionada = undefined;
          this.informacionEdificio.emit(undefined);
        } else {
          this.informacionEdificio.emit(objeto);
          // Se ejecuta este codigo cuando das click a una imagen seleccionada
          // this.abrirModalDeInformacionDeEdificio(objeto.objetoImagen.id, objeto.coordenadas)
        }
      }
    );
    // this.map = this._openLayersService.cargarPuntosConImagenes(marcadores, this.map);
    const subscripcionPoligono = this._openLayersService.poligonoEmmiter.subscribe(
      (informacion: number[][][] | boolean) => {
        if (informacion) {
          this.informacionGeografica.emit(informacion);
        } else {
          this.informacionGeografica.emit(informacion);
        }
      }
    );
    this.subscripciones.push(subscripcionPoligono);

    const subsPosicionActual = this._openLayersService
      .emitioIrAPosicionActual
      .subscribe(
        async () => {
          try {
            const coordenadas = this._geolocationService.getCoordendas();
            this.map = this._openLayersService
              .centrarEnLatitudLongitud(
                this.map,
                coordenadas.lat, coordenadas.lng
              );
          } catch (e) {
            console.error({
              error: e,
              mensaje: 'Error llevando al usuario a su posicion actual',
            });
          }
        }
      );
    const subsPosicion = this._openLayersService
      .emitioPosicion
      .subscribe(
        (posicion: [number, number]) => {
          this.map = this._openLayersService
            .centrarEnLatitudLongitud(
              this.map,
              posicion[0], posicion[1]
            );
        }
      );
    this.subscripciones.push(subsPosicionActual);
    this.subscripciones.push(subsPosicion);
  }

  borrar() {
    this._openLayersService.borrar();
  }

  ngOnDestroy(): void {
    this._openLayersService.borrar();
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }


}
