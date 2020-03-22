import {EventEmitter, Injectable} from '@angular/core';
import {InicializarMapa} from './interfaces/inicializar-mapa';
import {MarcadorImagenOpenLayer} from './interfaces/marcador-imagen-open-layer';
import {ObjetoEventoClickOpenLayer} from './interfaces/objeto-click-open-layer';
import {LineaInicioFinConfiguracion} from './interfaces/linea-inicio-fin-configuracion';
import {emitirInformacionGeografica, transformarACoordenadasEspeciales} from './funciones/funciones.puntos';
import {estiloRuta, generarEstiloRuta, getFeatureStyle} from './funciones/estilos.vector';
import {GeolocationServices} from './geolocation.service';

declare var ol;

@Injectable()
export class OpenlayersService {
  poligonoActual;
  mapa;
  view;
  vectorPoligonos;
  vectorSource;
  positionFeature;
  accuracyFeature;
  geolocation;
  rastrearAutomaticamente = false;
  emitioIrAPosicionActual: EventEmitter<boolean> = new EventEmitter();
  emitioPosicion: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();
  interactions: any = {};
  poligonoEmmiter: EventEmitter<any> = new EventEmitter<any>();
  protected vectorRutas = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: generarEstiloRuta,
  });
  undoInteraction = new ol.interaction.UndoRedo();
  vectorRuta = new ol.layer.Vector({
    name: 'Vecteur',
    source: new ol.source.Vector({features: new ol.Collection()}),
    style: estiloRuta
  });

  constructor(
    private readonly _geolocationService: GeolocationServices,
  ) {
  }


  inicializarMapaOpenLayers(configuracion: InicializarMapa): any {
    if (!configuracion.zoom) {
      configuracion.zoom = 17;
    }
    const coordenadas = [
      configuracion.longitud,
      configuracion.latitud
    ];
    this.view = new ol.View({
      center: ol.proj.fromLonLat(
        coordenadas
      ),
      zoom: configuracion.zoom
    });
    const mapa = new ol.Map({
      target: configuracion.nombreMapa,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: this.view,
    });
    if (configuracion.mostrarEscala) {
      const ctrl = new ol.control.Scale({});
      mapa.addControl(ctrl);
      mapa.addControl(new ol.control.ScaleLine());
    }

    if (configuracion.mostrarPuntoUsuario) {
      this.craerPuntoUsuarioMapa(mapa, coordenadas[1], coordenadas[0], configuracion.imagenPuntoUsuario);
    }

    if (configuracion.mostrarIrAPuntoUsuario) {
      let html;
      let clase;
      let titulo;
      if (configuracion.configuracionBotonIrAPuntoUsuario) {
        html = configuracion.configuracionBotonIrAPuntoUsuario.html;
        clase = configuracion.configuracionBotonIrAPuntoUsuario.claseCss;
        titulo = configuracion.configuracionBotonIrAPuntoUsuario.titulo;
      }

      const botonIrAPuntoUsuario = new ol.control.Button(
        {
          html: html ? html : '<ion-icon name="locate"></ion-icon>',
          className: clase ? clase : 'ol-boton-posicion',
          title: titulo ? titulo : 'Ir a posición actual',
          handleClick: async () => {
            try {
              // const coordenadasOriginales = await this.getPosition();
              const coordenadasOriginales = this._geolocationService.getCoordendas();
              // {lng: -78.48654909999999, lat: -0.17403}
              const coordenadasEnLatitudLongitud = ol.proj
                .transform(
                  [
                    coordenadasOriginales.lng,
                    coordenadasOriginales.lat,
                  ],
                  'EPSG:3857',
                  'EPSG:4326',
                );
              console.log({
                mensaje: `Esta rastreando con la geolocalizacion del navegador:
                            ${this.rastrearAutomaticamente}, dio click para ir a la posicion actual`,
                coordenadas: `Latitud: ${coordenadasEnLatitudLongitud[1]} Longitud: ${coordenadasEnLatitudLongitud[0]}`
              });
              if (this.rastrearAutomaticamente) {
                this.centrarEnLatitudLongitud(this.mapa, coordenadasEnLatitudLongitud[1], coordenadasEnLatitudLongitud[0]);
              } else {
                console.log({
                  mensaje: 'Use la funcion: this.centrarEnLatitudLongitud(mapa,latitud,longitud)'
                });
                this.emitioIrAPosicionActual.emit(true);
              }
            } catch (e) {
              console.error({
                error: e,
                mensaje: 'Error cargando coordenadas'
              });
            }


          }
        });
      mapa.addControl(botonIrAPuntoUsuario);
    }
    if (configuracion.mostrarBarraEdicion) {
      this.establecerConfiguracionEdicion(configuracion, mapa);
    }
    const numero = configuracion.intervalo as number;
    setInterval(
      () => {
        mapa.updateSize();
      },
      numero
    );

    return mapa;
  }

  cargarPuntosConImagenesImplicito(marcadoresImagen: MarcadorImagenOpenLayer[]) {
    if (marcadoresImagen.length > 0) {
      const features = marcadoresImagen.map(
        (marcador: MarcadorImagenOpenLayer) => {
          const objetosDePropiedades = {
            ...marcador.objetoMarcadorImagen
          };
          console.log('Objeto de Propiedades', objetosDePropiedades);
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: ol.proj.transform([marcador.longitud, marcador.latitud], 'EPSG:4326', 'EPSG:3857')
            },
            properties: {
              objetoImagen: {
                ...objetosDePropiedades
              }
            }
          };
        }
      );
      const vectorSource = new ol.source.Vector({
        loader: (extent, resolution, projection) => {
          vectorSource.addFeatures(
            vectorSource.getFormat().readFeatures({
              type: 'FeatureCollection',
              features
            }));

        },
        projection: 'EPSG:3857',
        format: new ol.format.GeoJSON(),
        attributions: ['&copy; <a href=\'https://manticore-labs.com\'>manticore-labs.com</a>'],
        logo: 'https://ideas.manticore-labs.com/wp-content/uploads/2018/08/Logo-sitio.png'
      });

      const vector = new ol.layer.Vector(
        {
          name: 'imagenes',
          source: vectorSource,
          renderOrder: ol.ordering.yOrdering(),
          style: getFeatureStyle
        });
      this.mapa.addLayer(vector);
    } else {
      console.error({
        error: 400,
        mensaje: 'Error, no tiene ningun marcador seleccionado'
      });
    }

  }

  cargarPuntosConImagenes(marcadoresImagen: MarcadorImagenOpenLayer[], mapa: any) {
    if (marcadoresImagen.length > 0) {
      const features = marcadoresImagen.map(
        (marcador: MarcadorImagenOpenLayer) => {
          const objetosDePropiedades = {
            ...marcador.objetoMarcadorImagen
          };
          console.log('Objeto de Propiedades', objetosDePropiedades);
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: ol.proj.transform([marcador.longitud, marcador.latitud], 'EPSG:4326', 'EPSG:3857')
            },
            properties: {
              objetoImagen: {
                ...objetosDePropiedades
              }
            }
          };
        }
      );
      const vectorSource = new ol.source.Vector({
        loader: (extent, resolution, projection) => {
          vectorSource.addFeatures(
            vectorSource.getFormat().readFeatures({
              type: 'FeatureCollection',
              features
            }));

        },
        projection: 'EPSG:3857',
        format: new ol.format.GeoJSON(),
        attributions: ['&copy; <a href=\'https://manticore-labs.com\'>manticore-labs.com</a>'],
        logo: 'https://ideas.manticore-labs.com/wp-content/uploads/2018/08/Logo-sitio.png'
      });

      const vector = new ol.layer.Vector(
        {
          name: 'imagenes',
          source: vectorSource,
          renderOrder: ol.ordering.yOrdering(),
          style: getFeatureStyle
        });
      mapa.addLayer(vector);
      return mapa;
    } else {
      console.error({
        error: 400,
        mensaje: 'Error, no tiene ningun marcador seleccionado'
      });
      return mapa;
    }

  }

  escucharCambios(mapa: any, callback): () => ObjetoEventoClickOpenLayer<any> {
    const select = new ol.interaction.Select(
      {
        condition: ol.events.condition.click,
        style: (feature, resolution) => {
          return getFeatureStyle(feature, resolution, true);
        }
      });
    mapa.addInteraction(select);
    select
      .getFeatures()
      .on(['add', 'remove'], (e) => {
        const elemento = e.element;
        const coordenadas = elemento.get('geometry').flatCoordinates;
        const latitudLongitud = ol.proj.transform(coordenadas, 'EPSG:3857', 'EPSG:4326');
        const objetoImagen = elemento.get('objetoImagen');
        if (e.type === 'add') {
          objetoImagen.focus = true;
          callback({
            objetoImagen,
            coordenadas: {
              latitud: latitudLongitud[1],
              longitud: latitudLongitud[0],
            },
            elemento,
          });
        } else {
          objetoImagen.focus = false;
          elemento.set('objetoImagen', objetoImagen);
          callback({
            objetoImagen,
            coordenadas: {
              latitud: latitudLongitud[1],
              longitud: latitudLongitud[0],
            },
            elemento,
            salioDeFoco: true
          });
        }
      });
    return mapa;
  }

  dibujarLineaConInicioFin(configuracionLineaInicioFin: LineaInicioFinConfiguracion, mapa: any) {

    const features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: ol.proj.transform([
            configuracionLineaInicioFin.coordenadaInicial.longitud,
            configuracionLineaInicioFin.coordenadaInicial.latitud
          ], 'EPSG:4326', 'EPSG:3857')
        },
        properties: {}
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: ol.proj.transform([
            configuracionLineaInicioFin.coordenadaFinal.longitud,
            configuracionLineaInicioFin.coordenadaFinal.latitud
          ], 'EPSG:4326', 'EPSG:3857')
        },
        properties: {}
      },


    ];
    const vectorSource = new ol.source.Vector({
      loader: (extent, resolution, projection) => {
        vectorSource.addFeatures(
          vectorSource.getFormat().readFeatures({
            type: 'FeatureCollection',
            features
          }));

      },
      projection: 'EPSG:3857',
      format: new ol.format.GeoJSON(),
      attributions: ['&copy; <a href=\'https://manticore-labs.com\'>manticore-labs.com</a>'],
      logo: 'https://ideas.manticore-labs.com/wp-content/uploads/2018/08/Logo-sitio.png'
    });
    const estiloPuntoInicialFinal = new ol.style.Style({
      image: new ol.style.Circle({
        radius: configuracionLineaInicioFin.configuracionPuntoInicioFin.radio,
        fill: new ol.style.Fill({
          color: configuracionLineaInicioFin.configuracionPuntoInicioFin.colorLlenado
        }),
        stroke: new ol.style.Stroke({
          color: configuracionLineaInicioFin.configuracionPuntoInicioFin.colorLinea,
          width: configuracionLineaInicioFin.configuracionPuntoInicioFin.anchoLinea
        })
      })
    });


    // creciendo el FlowLine con dos colores
    const estiloCreciendoDosColores = new ol.style.FlowLine({
      color: 'red',
      color2: 'green',
      width: 3,
      width2: 25
    });

    // Un solo color
    const estiloLinea = new ol.style.FlowLine({
      visible: false,
      lineCap: 'round',
      color: configuracionLineaInicioFin.configuracionLinea.colorLlenado,
      width: configuracionLineaInicioFin.configuracionLinea.anchoLinea,
      geometry: (f) => {
        if (f.getGeometry().getType() === 'MultiLineString') {
          return f.getGeometry().getLineString(0);
        } else {
          return f.getGeometry();
        }
      }
    });

    function obtenerEstiloPorPosicion(feature, res) {
      return [estiloPuntoInicialFinal, estiloLinea];
    }

    const vector = new ol.layer.Vector({
      renderMode: 'image',
      source: vectorSource,
      style: obtenerEstiloPorPosicion
    });


    mapa.addLayer(vector);
    const lineaString = configuracionLineaInicioFin
      .arregloCoordenadas
      .map(
        (coordenadas) => {
          return ol.proj.transform([coordenadas[1], coordenadas[0]], 'EPSG:4326', 'EPSG:3857');
        }
      );
    vector
      .getSource()
      .addFeature(
        new ol.Feature(
          new ol.geom.LineString(
            lineaString
            // ol.proj.transform([-78.493701, -0.172593], 'EPSG:4326', 'EPSG:3857'),
            // ol.proj.transform([-78.493601, -0.172510], 'EPSG:4326', 'EPSG:3857'),
            // ol.proj.transform([-78.493355, -0.174367,], 'EPSG:4326', 'EPSG:3857')
          )
        )
      );
    return mapa;
  }

  centrarEnLatitudLongitud(mapa, latitud, longitud, zoom?) {
    if (zoom) {
      mapa = this.setearZoom(mapa, zoom);
    }
    mapa
      .getView()
      .setCenter(ol.proj.transform([longitud, latitud], 'EPSG:4326', 'EPSG:3857'));

    this.mapa = mapa;
    return mapa;
  }

  setearZoom(mapa, zoom) {
    mapa
      .getView()
      .setZoom(zoom);
    this.mapa = mapa;
    return mapa;
  }

  craerPuntoUsuarioMapa(mapa, latitud, longitud, imagenPuntoUsuario: any) {

    // Geolocalizacion
    const opcionesGeolocalizacion = {
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: this.view.getProjection()
    };

    this.geolocation = new ol.Geolocation(opcionesGeolocalizacion);

    // Icono Posicion
    this.positionFeature = new ol.Feature();
    const estilo = {
      image: imagenPuntoUsuario ? imagenPuntoUsuario : new ol.style.Circle({
        radius: 9,
        fill: new ol.style.Fill({
          color: '#cc0061'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 2
        })
      })
    };

    this.positionFeature.setStyle(new ol.style.Style(estilo));


    // Setear la localizacion del punto
    this.moverPuntoUsuario(latitud, longitud);

    // Mostrar en el mapa
    this.vectorSource = new ol.layer.Vector({
      map: mapa,
      source: new ol.source.Vector({
        features: [this.positionFeature]
      })
    });

    // Empezar rastreo
    setTimeout(() => {
      this.geolocation.setTracking(true);
    }, 1);

    this.escucharCambiosEnGeolocalizacion();
  }

  moverPuntoUsuario(latitud, longitud) {
    const coordenadasTransformadas = ol.proj.transform([longitud, latitud], 'EPSG:4326', 'EPSG:3857');
    this.positionFeature.setGeometry(new ol.geom.Point(coordenadasTransformadas));
  }

  escucharCambiosEnGeolocalizacion() {
    this.geolocation.on('error', (error) => {
      console.error({error, mensaje: 'Error cargando geolocalización'});
    });

    this.geolocation.on('change:position', async () => {
      const coordenadas = await this.getPosition();
      const coordenadasEnLatitudLongitud = ol.proj.transform(
        [coordenadas.lng, coordenadas.lat],
        'EPSG:3857',
        'EPSG:4326'
      );
      console.log({
        mensaje: `Esta rastreando con la geolocalizacion del navegador:
        ${this.rastrearAutomaticamente}, cambio la posicion en el navegador.`,
        coordenadas: `Latitud: ${coordenadasEnLatitudLongitud[1]} Longitud: ${coordenadasEnLatitudLongitud[0]}`,
      });
      if (this.rastrearAutomaticamente) {

        // this.positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
      }
    });
  }

  dibujarPoligonos(mapa, arregloDePoligonos: number[][][]) {
    const featuresArreglo = arregloDePoligonos
      .map(
        (ar, i) =>
          this.transformarArregloLatitudLongitudAFeaturePoligono(ar, i + 1)
      );
    const objetofeatures = {
      type: 'FeatureCollection',
      features: featuresArreglo

    };
    const arregloFeatures: any[] = new ol.format
      .GeoJSON()
      .readFeatures(
        JSON.stringify(objetofeatures)
      );
    const vectorSource = new ol.source.Vector();
    arregloFeatures
      .forEach(
        (feature) => {
          vectorSource.addFeature(feature);
        }
      );
    this.vectorPoligonos = new ol.layer.Vector({
      source: vectorSource,
      style: generarEstiloRuta,
    });
    mapa.addLayer(this.vectorPoligonos);
    this.mapa = mapa;
    return mapa;
  }

  dibujarRuta(mapa, arregloDePoligonos: number[][]) {
    const coordenadasFormateadas = arregloDePoligonos.map(
      (coordenadas) => {
        return transformarACoordenadasEspeciales(coordenadas[1], coordenadas[0]);
      }
    );
    mapa.addLayer(this.vectorRuta);
    this.vectorRuta.getSource().addFeature(new ol.Feature(new ol.geom.LineString([...coordenadasFormateadas])));
    return mapa;
  }

  dibujarPuntos(mapa, arregloDePoligonos: number[][]) {
    const coordenadasFormateadas = arregloDePoligonos.map(
      (coordenadas) => {
        this.vectorRuta.getSource().addFeature(new ol.Feature(new ol.geom.Point(transformarACoordenadasEspeciales(coordenadas[1], coordenadas[0]))));
        return transformarACoordenadasEspeciales(coordenadas[1], coordenadas[0]);
      }
    );
    mapa.addLayer(this.vectorRuta);
    return mapa;
  }

  transformarArregloLatitudLongitudAFeaturePoligono(arreglo: number[][], id: number) {
    return {
      type: 'Feature',
      id: `${id}`,
      properties: {
        id
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          arreglo
            .map(
              (ar) => this.transformarLatitudLongitudAFormatoOpenLayers(ar)
            )
        ]
      }
    };
  }

  transformarArregloLatitudLongitudAFeatureRuta(arreglo: number[][], id: number) {
    return {
      type: 'Feature',
      id: `${id}`,
      properties: {
        id
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          arreglo
            .map(
              (ar) => this.transformarLatitudLongitudAFormatoOpenLayers(ar)
            )
        ]
      }
    };
  }

  transformarLatitudLongitudAFormatoOpenLayers(arreglo: number[]): number[] {
    const latitud = arreglo[0];
    const longitud = arreglo[1];
    return ol.proj.transform([longitud, latitud], 'EPSG:4326', 'EPSG:3857');
  }

  transformarFormatoOpenLayersALatitudLongitud(arreglo: [number, number]): [number, number] {
    const arregloLongitudLatitud = ol.proj.transform([arreglo[0], arreglo[1]], 'EPSG:3857', 'EPSG:4326');
    return [arregloLongitudLatitud[1], arregloLongitudLatitud[0]];
  }

  puntoEstaDentroDePoligono(arregloLatitudLongitud: number[], arregloPoligonoLatitudLongitud: number[][]) {
    const x = arregloLatitudLongitud[0], y = arregloLatitudLongitud[1];
    let inside = false;
    for (let i = 0, j = arregloPoligonoLatitudLongitud.length - 1; i < arregloPoligonoLatitudLongitud.length; j = i++) {
      const xi = arregloPoligonoLatitudLongitud[i][0], yi = arregloPoligonoLatitudLongitud[i][1];
      const xj = arregloPoligonoLatitudLongitud[j][0], yj = arregloPoligonoLatitudLongitud[j][1];

      const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  getStyle(f) {
    return [
      new ol.style.Style({
        stroke: new ol.style.Stroke({color: '#0a8c07', width: 8}),
        fill: new ol.style.Fill({color: [255, 255, 255, .5]})
      }),
      new ol.style.Style({
        image: new ol.style.RegularShape({radius: 4, points: 4, fill: new ol.style.Fill({color: '#f00'})})
      })
    ];
  }

  protected establecerConfiguracionEdicion(configuracion: InicializarMapa, map: any) {
    //  Vector layer
    // Main control bar
    const debeEscucharDibujarPoligono = configuracion.configuracionBarraEdicion.DrawPolygon;
    const debeEscuharDibujarLinea = configuracion.configuracionBarraEdicion.DrawLine;
    const debeEscucharDibjarPunto = configuracion.configuracionBarraEdicion.DrawPoint;
    map.addLayer(this.vectorRutas);
    const mainbar = new ol.control.Bar();
    map.addControl(mainbar);
    const interacionEdicion = new ol.interaction.ModifyFeature({
      sources: this.vectorRutas.getSource(),
    });

    // Editbar
    const editbar = new ol.control.EditBar({
      source: this.vectorRutas.getSource(),
      interactions: {...configuracion.configuracionBarraEdicion}
    });
    mainbar.addControl(editbar);
    // Undo redo interaction
    // map.addInteraction(interacionEdicion);
    map.addInteraction(this.undoInteraction);
    // Prevent selection of a deleted feature
    this.undoInteraction.on('undo', function (e) {
      if (e.action.type === 'addfeature') {
        editbar.getInteraction('Select').getFeatures().clear();
        editbar.getInteraction('Transform').select();
      }
    });
    if (debeEscucharDibujarPoligono) {
      editbar.getInteraction('DrawPolygon').on(['drawend'], (e) => {
        const caracteristicas = e.feature.values_.geometry.flatCoordinates;
        emitirInformacionGeografica(caracteristicas, this.poligonoEmmiter);
      });
    }
    if (debeEscuharDibujarLinea) {
      editbar.getInteraction('DrawLine').on(['drawend'], (e) => {
        const caracteristicas = e.feature.values_.geometry.flatCoordinates;
        emitirInformacionGeografica(caracteristicas, this.poligonoEmmiter, 'LineString');
      });
    }
    if (debeEscucharDibjarPunto) {
      editbar.getInteraction('DrawPoint').on(['drawend'], (e) => {
        const caracteristicas = e.feature.values_.geometry.flatCoordinates;
        emitirInformacionGeografica(caracteristicas, this.poligonoEmmiter, 'Point');
      });
    }
    editbar.getInteraction('ModifySelect').on(['modifyend'], (e) => {
      const coordenadas = e.features[0].values_.geometry.flatCoordinates;
      console.log(debeEscuharDibujarLinea);
      if (configuracion.tipo === 'LineString') {
        emitirInformacionGeografica(coordenadas, this.poligonoEmmiter, 'LineString');
      }
      if (configuracion.tipo === 'Point') {
        emitirInformacionGeografica(coordenadas, this.poligonoEmmiter, 'Point');
      }
      if (configuracion.tipo === 'Polygon') {
        emitirInformacionGeografica(coordenadas, this.poligonoEmmiter);
      }
    });
    editbar.getInteraction('Transform').on(['rotateend', 'scaleend', 'translateend'], (e) => {
      const coordenadas = e.feature.values_.geometry.flatCoordinates;
      if (configuracion.tipo === 'LineString') {
        emitirInformacionGeografica(coordenadas, this.poligonoEmmiter, 'LineString');
      }
      if (configuracion.tipo === 'Point') {
        emitirInformacionGeografica(coordenadas, this.poligonoEmmiter, 'Point');
      }
      if (configuracion.tipo === 'Polygon') {
        emitirInformacionGeografica(coordenadas, this.poligonoEmmiter);
      }
    });
    // Add buttons to the bar
    const bar = new ol.control.Bar({
      group: true,
      controls: [
        new ol.control.Button({
          html: '<i class="fa fa-undo" ></i>',
          title: 'Deshacer',
          handleClick: () => {
            this.undoInteraction.undo();
          }
        }),
        new ol.control.Button({
          html: '<i class="fa fa-redo" ></i>',
          title: 'Rehacer.',
          handleClick: () => {
            this.undoInteraction.redo();
          }
        })
      ]
    });
    mainbar.addControl(bar);

    // Add a snap
    map.addInteraction(new ol.interaction.Snap({
      source: this.vectorRutas.getSource()
    }));
  }

  borrar() {
    this.undoInteraction.undo();
    this.vectorRuta.getSource().clear();
    this.vectorRutas.getSource().clear();
  }

  emitirPosicion(longitud, latitud) {
    this.emitioPosicion.emit([longitud, latitud]);
  }
}
