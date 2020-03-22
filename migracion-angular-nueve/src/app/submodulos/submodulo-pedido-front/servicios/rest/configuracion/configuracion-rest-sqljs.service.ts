import { Injectable } from '@angular/core';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {ConfiguracionEntity} from './configuracio.entity';
import {ConfiguracionCreateDto} from './configuracio-creaate-dto';
import {ConfiguracionUpdateDto} from './configuracio-update-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {ArticuloEntity} from '../articulo/articulo.entity';
import {getRepository, Repository} from 'typeorm/browser';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:max-line-length
export class ConfiguracionRestSqljsService  extends PrincipalRestSqljsService<ConfiguracionEntity, ConfiguracionCreateDto, ConfiguracionUpdateDto> {
  constructor(
    private readonly _http: HttpClient,

  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'configuracion';
    this.entidad = ConfiguracionEntity;
  }
  async upsert(
    configuracion: ConfiguracionEntity
  ) {
    return this.repository().save(configuracion);
  }

  async getAll (consulta = {}) {
    return await this.repository().find(consulta);
  }

  async getOne (consulta = {}) {
    return await this.repository().findOne(consulta);
  }
}
