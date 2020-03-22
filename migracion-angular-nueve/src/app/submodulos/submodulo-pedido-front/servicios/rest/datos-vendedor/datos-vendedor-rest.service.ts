import { Injectable } from '@angular/core';
import { DatosVendedorCreateDto } from './datos-vendedor-create-dto';
import { DatosVendedorUpdateDto } from './datos-vendedor-update-dto';
import { DatosVendedor } from './datos-vendedor';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable()
export class DatosVendedorRestService extends PrincipalRestSqljsService<
  DatosVendedor,
  DatosVendedorCreateDto,
  DatosVendedorUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'datos-vendedor';
    this.entidad = DatosVendedor;
  }

  lubricadorasPorVendedor(
    user_id: string,
  ): Observable<RespuestaLubricadoras[] | any[]> {
    return fromPromise(
      new Promise(async (res, rej) => {
        res([
          {
            ventasTotales: '1000.9900',
            comisionTotal: '175.9900',
            id: 3,
            createdAt: '2019-07-15T17:34:50.000Z',
            updatedAt: '2019-07-15T17:34:50.000Z',
            edificio: {
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
            datosVendedor: {
              nombreVendedor: 'Vicente Adrian Eguez Sarzosa',
              documento: '1718137159',
              fechaIngreso: '2016-01-20',
              fechaSalida: null,
              habilitado: 1,
              id: 1,
              createdAt: '2019-07-15T17:34:50.000Z',
              updatedAt: '2019-07-15T17:34:50.000Z',
            },
          },
          {
            ventasTotales: '1000.9900',
            comisionTotal: '175.9900',
            id: 3,
            createdAt: '2019-07-15T17:34:50.000Z',
            updatedAt: '2019-07-15T17:34:50.000Z',
            edificio: {
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
            datosVendedor: {
              nombreVendedor: 'Vicente Adrian Eguez Sarzosa',
              documento: '1718137159',
              fechaIngreso: '2016-01-20',
              fechaSalida: null,
              habilitado: 1,
              id: 1,
              createdAt: '2019-07-15T17:34:50.000Z',
              updatedAt: '2019-07-15T17:34:50.000Z',
            },
          },
        ]);
        return null;
      }),
    );
  }
}

export interface RespuestaLubricadoras {
  ventasTotales?: string;
  comisionTotal?: string;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  edificio?: {
    nombre: string;
    habilitado: number;
    esMatriz: number;
    id: number;
    createdAt: string;
    updatedAt: string;
    direccion: {
      numeroCalle: string;
      callePrincipal: string;
      calleSecundaria: string;
      nombreEdificio: string;
      piso: string;
      sector: string;
      referencia: string;
      id: number;
      createdAt: string;
      updatedAt: string;
      localizacion: {
        id: string;
        entidadId: string;
        entidadNombre: string;
        localizacion: {
          type: string;
          coordinates: [number, number];
        };
      };
    };
  };
  datosVendedor?: {
    nombreVendedor: string;
    documento: string;
    fechaIngreso: string;
    fechaSalida: string;
    habilitado: number;
    id: number;
    createdAt: string;
    updatedAt: string;
  };
}
