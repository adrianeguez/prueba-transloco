import { Injectable } from '@angular/core';
import { BodegaCreateDto } from './bodega-create-dto';
import { BodegaUpdateDto } from './bodega-update-dto';
import { Bodega } from './bodega';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable()
export class BodegaRestSqljsService extends PrincipalRestSqljsService<
  Bodega,
  BodegaCreateDto,
  BodegaUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'bodega';
    this.entidad = Bodega;
  }

  obtenerStockPorIdEdificio(idEdicio: number): Observable<any[]> {
    return fromPromise(
      new Promise((resolve, reject) => {
        resolve([
          {
            idBodega: 1,
            nombreBodega: 'veniam ex',
            articulos: [
              {
                codigoArticulo: 0,
                nombreArticulo: 'ipsum incididunt culpa',
                unidadMedida: 'Unidad',
                empresaProductora: 'Pdvsa',
                stockActual: 27,
                stockMinimo: 28,
                stockMaximo: 76,
                stockAlerta: 40,
              },
              {
                codigoArticulo: 1,
                nombreArticulo: 'cillum aliqua magna',
                unidadMedida: 'Unidad',
                empresaProductora: 'Pdvsa',
                stockActual: 34,
                stockMinimo: 19,
                stockMaximo: 93,
                stockAlerta: 44,
              },
            ],
          },
          {
            idBodega: 2,
            nombreBodega: 'officia officia',
            articulos: [
              {
                codigoArticulo: 0,
                nombreArticulo: 'officia aute magna',
                unidadMedida: 'Unidad',
                empresaProductora: 'Pdvsa',
                stockActual: 28,
                stockMinimo: 14,
                stockMaximo: 91,
                stockAlerta: 37,
              },
              {
                codigoArticulo: 1,
                nombreArticulo: 'duis nulla consequat',
                unidadMedida: 'Unidad',
                empresaProductora: 'Pdvsa',
                stockActual: 29,
                stockMinimo: 17,
                stockMaximo: 70,
                stockAlerta: 38,
              },
            ],
          },
        ]);
        return null;
      }),
    );
  }
}
