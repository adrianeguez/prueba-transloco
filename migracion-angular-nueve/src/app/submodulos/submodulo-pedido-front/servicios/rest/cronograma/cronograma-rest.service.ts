import { Injectable } from '@angular/core';
import { CronogramaCreateDto } from './cronograma-create-dto';
import { CronogramaUpdateDto } from './cronograma-update-dto';
import { Cronograma } from './cronograma';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { environment } from '../../../../../../environments/environment.prod';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable()
export class CronogramaRestService extends PrincipalRestSqljsService<
  Cronograma,
  CronogramaCreateDto,
  CronogramaUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'cronograma';
    this.entidad = Cronograma;
  }

  obtenerCronogramasPorIdVendedorPeriodoVenta(
    idVendedor: string,
  ): Observable<any[]> {
    return fromPromise(
      new Promise((resolve, reject) => {
        resolve([
          {
            nombreCronograma: 'Feriado',
            habilitado: 1,
            descripcion: 'Cronograma para feriado',
            id: 1,
            createdAt: '2019-07-13T20:37:54.000Z',
            updatedAt: '2019-07-13T20:37:54.000Z',
            cronogramasVendedor: [
              {
                orden: 1,
                fecha: '2019-05-24T22:47:11.147Z',
                lunes: 1,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null,
                horaVisita: '15:30',
                visitado: 0,
                id: 1,
                createdAt: '2019-07-13T20:37:54.000Z',
                updatedAt: '2019-07-13T20:37:54.000Z',
                idEdificio: 1,
              },
              {
                orden: 2,
                fecha: '2019-08-10T22:47:11.147Z',
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: 1,
                sabado: null,
                domingo: null,
                horaVisita: '12:00',
                visitado: 0,
                id: 2,
                createdAt: '2019-07-13T20:37:54.000Z',
                updatedAt: '2019-07-13T20:37:54.000Z',
                idEdificio: 2,
              },
            ],
          },
          {
            nombreCronograma: 'Otro',
            habilitado: 1,
            descripcion: 'Cronograma para feriado',
            id: 2,
            createdAt: '2019-07-13T20:37:54.000Z',
            updatedAt: '2019-07-13T20:37:54.000Z',
            cronogramasVendedor: [
              {
                orden: 1,
                fecha: '2019-05-24T22:47:11.147Z',
                lunes: 1,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null,
                horaVisita: '15:30',
                visitado: 0,
                id: 3,
                createdAt: '2019-07-13T20:37:54.000Z',
                updatedAt: '2019-07-13T20:37:54.000Z',
                idEdificio: 3,
              },
              {
                orden: 1,
                fecha: '2019-08-10T22:47:11.147Z',
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: 1,
                sabado: null,
                domingo: null,
                horaVisita: '12:00',
                visitado: 0,
                id: 4,
                createdAt: '2019-07-13T20:37:54.000Z',
                updatedAt: '2019-07-13T20:37:54.000Z',
                idEdificio: 4,
              },
            ],
          },
        ]);
        return null;
      }),
    );
  }
}
