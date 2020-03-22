import { Injectable } from '@angular/core';
import { PromocionCreateDto } from './promocion-create-dto';
import { PromocionUpdateDto } from './promocion-update-dto';
import { Promocion } from './promocion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable()
export class PromocionRestService extends PrincipalRestSqljsService<
  Promocion,
  PromocionCreateDto,
  PromocionUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'promocion';
    this.entidad = Promocion;
  }

  promocionesPorUsuario(idUsuario?: number): Observable<any> {
    return fromPromise(
      new Promise(async (res, rej) => {
        if (idUsuario) {
          res([
            {
              nombrePromocion: 'Descuento aceite',
              descripcion: '20 % de descuento en aceites XXX',
              fechaInicio: '2019-08-10T22:47:11.147Z',
              fechaFin: '2019-08-10T22:47:11.147Z',
              imagen: 'link_imagen',
              habilitado: 1,
              nombre: 'Pepito',
              esMatriz: 1,
              id: 1,
              createdAt: '2019-07-13T20:37:54.000Z',
              updatedAt: '2019-07-13T20:37:54.000Z',
              edificio: {
                nombre: 'edificio 1',
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
              },
              usuario: {
                nombres: 'Luis',
                apellidos: 'Perez',
              },
            },
            {
              nombrePromocion: 'Descuento llantas',
              descripcion: '20 % de descuento en aceites XXX',
              fechaInicio: '2019-08-10T22:47:11.147Z',
              fechaFin: '2019-08-10T22:47:11.147Z',
              imagen: 'link_imagen',
              habilitado: 1,
              nombre: 'Sultanito',
              esMatriz: 1,
              id: 2,
              createdAt: '2019-07-13T20:37:54.000Z',
              updatedAt: '2019-07-13T20:37:54.000Z',
              edificio: {
                nombre: 'edificio 1',
                habilitado: 1,
                esMatriz: 1,
                id: 2,
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
                  id: 2,
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
                  id: 2,
                  createdAt: '2019-07-13T20:37:54.000Z',
                  updatedAt: '2019-07-13T20:37:54.000Z',
                },
              },
              usuario: {
                nombres: 'Luis',
                apellidos: 'Perez',
              },
            },
          ]);
        } else {
          res([
            {
              nombrePromocion: 'Descuento aceite',
              descripcion: '20 % de descuento en aceites XXX',
              fechaInicio: '2019-08-10T22:47:11.147Z',
              fechaFin: '2019-08-10T22:47:11.147Z',
              imagen: 'link_imagen',
              habilitado: 1,
              nombre: 'edificio 1',
              esMatriz: 1,
              id: 3,
              createdAt: '2019-07-13T20:37:54.000Z',
              updatedAt: '2019-07-13T20:37:54.000Z',
              edificio: {
                nombre: 'edificio 1',
                habilitado: 1,
                esMatriz: 1,
                id: 3,
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
                  id: 3,
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
                  localizacion: {
                    id: '4gtcb41251bd0517e0764d93',
                    entidadId: '2',
                    entidadNombre: 'cronograma.ts',
                    localizacion: {
                      type: 'Point',
                      coordinates: [-0.170096, -78.49422],
                    },
                  },
                  id: 3,
                  createdAt: '2019-07-13T20:37:54.000Z',
                  updatedAt: '2019-07-13T20:37:54.000Z',
                },
              },
              usuario: {
                nombres: 'Luis',
                apellidos: 'Perez',
              },
            },
            {
              nombrePromocion: 'Descuento aceite',
              descripcion: '20 % de descuento en aceites XXX',
              fechaInicio: '2019-08-10T22:47:11.147Z',
              fechaFin: '2019-08-10T22:47:11.147Z',
              imagen: 'link_imagen',
              habilitado: 1,
              nombre: 'edificio 1',
              esMatriz: 1,
              id: 4,
              createdAt: '2019-07-13T20:37:54.000Z',
              updatedAt: '2019-07-13T20:37:54.000Z',
              edificio: {
                nombre: 'edificio 1',
                habilitado: 1,
                esMatriz: 1,
                id: 4,
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
                  id: 4,
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
                  localizacion: {
                    id: '4gtcb41251bd0517e0764d93',
                    entidadId: '2',
                    entidadNombre: 'cronograma.ts',
                    localizacion: {
                      type: 'Point',
                      coordinates: [-0.172455, -78.491817],
                    },
                  },
                  id: 4,
                  createdAt: '2019-07-13T20:37:54.000Z',
                  updatedAt: '2019-07-13T20:37:54.000Z',
                },
              },
              usuario: {
                nombres: 'Luis',
                apellidos: 'Perez',
              },
            },
          ]);
        }
        return null;
      }),
    );
  }
}
