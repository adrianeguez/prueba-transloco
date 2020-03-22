import { Injectable } from '@angular/core';
import { Automovil } from './automovil';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { environment } from '../../../../../../environments/environment.prod';
import { AutomovilCreateDto } from './automovil-create-dto';
import { AutomovilUpdateDto } from './automovil-update-dto';

@Injectable()
export class AutomovilRestSqljsService extends PrincipalRestSqljsService<
  Automovil,
  AutomovilCreateDto,
  AutomovilUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'automovil';
    this.entidad = Automovil;
  }

  automovilPorUserId(user_id: string): Observable<any[]> {
    return fromPromise(
      new Promise((resolve, reject) => {
        resolve([
          {
            modelo: 'Kia',
            placa: 'PCQ-1234',
            fechaUltimoChequeo: '2019-07-13T20:37:54.000Z',
            imagen: 'url',
            kilometraje: 300000,
            id: 1,
            kilometrajes: [
              {
                actual: 300000,
                siguiente: 302000,
                habilitado: 1,
                idEdificio: 1,
                id: 1,
              },
              {
                actual: 10000,
                siguiente: 15000,
                habilitado: 0,
                idEdificio: 2,
                id: 2,
              },
            ],
            edificio: {
              nombre: 'edificio 1',
              habilitado: 1,
              esMatriz: 1,
              id: 1,
              createdAt: new Date('2019-07-13T20:37:54.000Z'),
              updatedAt: new Date('2019-07-13T20:37:54.000Z'),
              empresa: 2,
              direccion: 5,
            },
            usuario: {
              nombres: 'Vicente Adrian',
              user_id: 'auth0|5d2bb368a6d2ce0e4497ebdb',
              apellidos: 'Eguez Sarzosa',
              direccion: 'Gregorio Bobadilla',
              celular: '0995770626',
              identificacionPais: '1',
              habilitadoAuth0: true,
              id: 1,
              createdAt: new Date('2019-07-18T15:20:56.000Z'),
              updatedAt: new Date('2019-07-18T15:20:56.000Z'),
            },
          },
          {
            modelo: 'Hyundai',
            placa: 'PCQ-4321',
            id: 2,
            fechaUltimoChequeo: '2019-06-13T20:37:54.000Z',
            kilometraje: 200000,
            kilometrajes: [
              {
                actual: 200000,
                siguiente: 220000,
                habilitado: 1,
                idEdificio: 3,
                id: 3,
              },
              {
                actual: 10000,
                siguiente: 15000,
                habilitado: 0,
                idEdificio: 4,
                id: 4,
              },
            ],
            imagen: 'url',
            edificio: {
              nombre: 'edificio 2',
              habilitado: 1,
              esMatriz: 1,
              id: 2,
              createdAt: new Date('2019-07-13T20:37:54.000Z'),
              updatedAt: new Date('2019-07-13T20:37:54.000Z'),
              empresa: 1,
              direccion: 3,
            },
            usuario: {
              nombres: 'Vicente Adrian',
              user_id: 'auth0|5d2bb368a6d2ce0e4497ebdb',
              apellidos: 'Eguez Sarzosa',
              direccion: 'Gregorio Bobadilla',
              celular: '0995770626',
              identificacionPais: '1',
              habilitadoAuth0: true,
              id: 1,
              createdAt: new Date('2019-07-18T15:20:56.000Z'),
              updatedAt: new Date('2019-07-18T15:20:56.000Z'),
            },
          },
        ]);
        return null;
      }),
    );
  }
}
