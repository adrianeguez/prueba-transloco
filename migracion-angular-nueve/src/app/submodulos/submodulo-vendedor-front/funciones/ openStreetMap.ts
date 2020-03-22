declare var ol: any;
export function inicializarMapaOpenStreet(configuracion: InicializarMapa): any {
  if (!configuracion.zoom) {
    configuracion.zoom = 17;
  }
  return new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([
        configuracion.latitud,
        configuracion.longitud,
      ]),
      zoom: configuracion.zoom,
    }),
  });
}

export interface InicializarMapa {
  latitud: number;
  longitud: number;
  zoom?: number;
}
