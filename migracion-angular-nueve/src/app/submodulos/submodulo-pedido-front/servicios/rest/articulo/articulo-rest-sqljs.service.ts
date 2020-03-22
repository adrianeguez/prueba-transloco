import { Injectable } from '@angular/core';

import {ArticuloCreateDto} from './articulo-create-dto';
import {ArticuloUpdateDto} from './articulo-update-dto';
import {ArticuloEntity} from './articulo.entity';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {getRepository, Repository} from 'typeorm/browser';
import {ToasterService} from 'angular2-toaster';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticuloRestSqljsService extends PrincipalRestSqljsService<ArticuloEntity, ArticuloCreateDto, ArticuloUpdateDto> {
  constructor(
    private readonly _http: HttpClient,
    private _toasterService: ToasterService,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'articulo';
    this.entidad = ArticuloEntity;
  }

  async upsert(
    articulosSinRepetidos: ArticuloEntity[]
  ) {
    try {
      return await this.repository().save(articulosSinRepetidos);

    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al crear registros');
      console.error({
        error: e,
        mensaje: 'Error al crear registros'
      });
    }
  }

  async getAll (consulta = {}) {
    try {
      return await this.repository().findAndCount(consulta);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error traer registros');
      console.error({
        error: e,
        mensaje: 'Error al obtener regitros'
      });
    }
  }
}
