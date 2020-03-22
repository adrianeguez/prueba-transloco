import { Injectable } from '@angular/core';
import { EdificioCreateDto } from './edificio-create-dto';
import { EdificioUpdateDto } from './edificio-update-dto';
import { Edificio } from './edificio';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable()
export class EdificioRestService extends PrincipalRestSqljsService<
  Edificio,
  EdificioCreateDto,
  EdificioUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'edificio';
    this.entidad = Edificio;
  }

  obtenerInformacionEdificio(idEdificio: number | string): Observable<any> {
    return fromPromise(
      new Promise(async (res, rej) => {
        res({
          nombre: 'edificio 1',
          telefono: '0995770626',
          whatsapp: '0995770626',
          nombreResponsable: 'Juan Carlos Andrade',
          habilitado: 1,
          esMatriz: 1,
          id: 1,
          createdAt: '2019-07-13T20:37:54.000Z',
          updatedAt: '2019-07-13T20:37:54.000Z',
          empresa: {
            nombreComercial: 'empresa 1',
            razonSocial: 'manticore 1 sa',
            ruc: '1724155914001',
            direccionMatriz: 'la prensa',
            habilitado: 1,
            contribuyenteEspecial: null,
            obligadoContabilidad: null,
            id: 1,
            createdAt: '2019-07-13T20:37:54.000Z',
            updatedAt: '2019-07-13T20:37:54.000Z',
          },
          direccion: {
            numeroCelular: '0998854711',
            numeroWhatsApp: '0993255109',
            numeroCalle: '34',
            callePrincipal: 'Av la prensa',
            calleSecundaria: '',
            nombreEdificio: '',
            piso: '3',
            sector: 'Cotocollao',
            referencia: '',
            id: 1,
            createdAt: '2019-07-13T20:37:54.000Z',
            updatedAt: '2019-07-13T20:37:54.000Z',
          },
        });
        return null;
      }),
    );
  }

  obtenerLubricadoras(): Observable<any> {
    return fromPromise(
      new Promise((resolve, reject) => {
        resolve([
          {
            nombre: 'Granda Centeno',
            habilitado: 1,
            esMatriz: 1,
            id: 1,
            createdAt: '2019-07-15T17:34:49.000Z',
            updatedAt: '2019-07-15T17:34:49.000Z',
            direccion: {
              numeroCalle: 'N 36-94',
              callePrincipal: 'Granda Centeno',
              calleSecundaria: 'Domingo de Briava',
              nombreEdificio: 'N/A',
              piso: 'N/A',
              sector: 'Naciones Unidas',
              referencia: 'Casa color tomate',
              id: 1,
              createdAt: '2019-07-15T17:34:49.000Z',
              updatedAt: '2019-07-15T17:34:49.000Z',
              localizacion: {
                id: '5d2cb41251bd0517e0764d9b',
                entidadId: '2',
                entidadNombre: 'cronograma.ts',
                localizacion: {
                  type: 'Point',
                  coordinates: [-0.170096, -78.49422],
                },
              },
            },
          },
          {
            nombre: 'America',
            habilitado: 1,
            esMatriz: 1,
            id: 2,
            createdAt: '2019-07-15T17:34:49.000Z',
            updatedAt: '2019-07-15T17:34:49.000Z',
            direccion: {
              numeroCalle: 'N 36-30',
              callePrincipal: 'America',
              calleSecundaria: 'Granda Centeno',
              nombreEdificio: 'N/A',
              piso: 'N/A',
              sector: 'Canal 4',
              referencia: 'Esquinero alado del semaforo',
              id: 2,
              createdAt: '2019-07-15T17:34:49.000Z',
              updatedAt: '2019-07-15T17:34:49.000Z',
              localizacion: {
                id: '4gtcb41251bd0517e0764d93',
                entidadId: '2',
                entidadNombre: 'cronograma.ts',
                localizacion: {
                  type: 'Point',
                  coordinates: [-0.172455, -78.491817],
                },
              },
            },
          },
        ]);
        return null;
      }),
    );
  }
}
