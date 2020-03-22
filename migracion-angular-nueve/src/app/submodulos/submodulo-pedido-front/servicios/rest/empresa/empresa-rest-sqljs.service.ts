import { Injectable } from '@angular/core';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {getRepository, Repository} from 'typeorm/browser';
import {ToasterService} from 'angular2-toaster';
import {EmpresaEntity} from './empresa.entity';
import {EmpresaCreateDto} from './empresa-create-dto';
import {EmpresaUpdateDto} from './empresa-update-dto';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class EmpresaRestSqljsService extends PrincipalRestSqljsService<EmpresaEntity, EmpresaCreateDto, EmpresaUpdateDto> {
  constructor(
    private readonly _http: HttpClient,
    private _toasterService: ToasterService,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'empresa';
    this.entidad = EmpresaEntity;
  }

  async upsert(
    empresa: EmpresaEntity[]
  ) {
    try {
      return await this.repository().save(empresa);

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
