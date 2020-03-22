import {EventEmitter} from '@angular/core';
import {transformarArreglo} from '../../../funciones/operaciones-arreglos';

const GJV = require('geojson-validation');
declare var ol;

export function validarInformacionGeografica(
  coordenadasAgrupadas: number[][] | number[],
  tipo: 'LineString' | 'Point' | 'Polygon' = 'Polygon'
): boolean {
  let datos = [];
  if (tipo === 'Polygon') {
    datos = [coordenadasAgrupadas];
  }
  if (tipo === 'LineString') {
    datos = coordenadasAgrupadas;
  }
  if (tipo === 'Point') {
    datos = coordenadasAgrupadas;
  }
  const validFeatureCollection = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {'type': `${tipo}`, 'coordinates': datos},
        'properties': {
          'prop0': 'value0',
          'prop1': {'this': 'that'}
        }
      },
    ]
  };
  return !!GJV.valid(validFeatureCollection);
}

export function obtenerCoordenadasAgrupadas(coordenadasAgrupadas: number[][]) {
  return coordenadasAgrupadas.map(
    (cooordenada) => {
      return transformarACoordenadasSimples(cooordenada[0], cooordenada[1]).reverse();
    }
  );
}

export function emitirInformacionGeografica(
  coordenadas: any[],
  emmiter: EventEmitter<any>,
  tipo: 'LineString' | 'Point' | 'Polygon' = 'Polygon'
) {
  const coordenadasAgrupadas = transformarArreglo(coordenadas, 2);
  const coordenadasFormateadas = obtenerCoordenadasAgrupadas(coordenadasAgrupadas);
  const informacionValida = validarInformacionGeografica(coordenadasFormateadas, tipo);
  if (informacionValida) {
    let datos;
    if (tipo === 'Polygon') {
      datos = [coordenadasFormateadas];
    }
    if (tipo === 'LineString') {
      datos = coordenadasFormateadas;
    }
    if (tipo === 'Point') {
      datos = coordenadasFormateadas;
    }
    emmiter.emit(datos);
  } else {
    emmiter.emit(false);
  }
}

export function transformarACoordenadasSimples(longitud: number, latitud: number) {
  return ol.proj
    .transform(
      [
        longitud,
        latitud,
      ],
      'EPSG:3857',
      'EPSG:4326',
    );
}

export function transformarACoordenadasEspeciales(longitud: number, latitud: number) {
  return ol.proj
    .transform(
      [
        longitud,
        latitud,
      ],
      'EPSG:4326',
      'EPSG:3857',
    );
}

export function validarSIHayInterseccion(coordenadas: number[]) {
  const totalLados = coordenadas.length - 1;
  const totalPuntos = coordenadas.length;
}

