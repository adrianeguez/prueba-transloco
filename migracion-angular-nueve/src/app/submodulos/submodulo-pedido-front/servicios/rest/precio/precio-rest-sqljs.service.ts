import {Injectable} from '@angular/core';
import {PrecioCreateDto} from './precio-create-dto';
import {PrecioUpdateDto} from './precio-update-dto';
import {PrecioEntity} from './precio.entity';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment.prod';
import {getRepository, Repository} from 'typeorm/browser';
import {TarifaImpuestoEntity} from '../tarifa-impuesto/tarifa-impuesto.entity';
import {ToasterService} from 'angular2-toaster';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PrecioRestSqljsService extends PrincipalRestSqljsService<PrecioEntity, PrecioCreateDto, PrecioUpdateDto> {
  constructor(
    private readonly _http: HttpClient,
    private readonly _toasterService: ToasterService) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'precio';
    this.entidad = PrecioEntity;
  }

  async upsert(
    preciosSinRepetidos: PrecioEntity[]
  ) {
    try {
      return await this.repository().save(preciosSinRepetidos);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al crear registros');
      console.error({
        error: e,
        mensaje: 'Error creando registros'
      });
    }  }

  async getAll (consulta = {}) {
    try {
      return await this.repository().findAndCount(consulta);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al traer registros');
      console.error({
        error: e,
        mensaje: 'Error al traer registros'
      });
    }
  }
}
