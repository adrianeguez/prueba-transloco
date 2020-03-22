import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment.prod';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {Injectable} from '@angular/core';
import {TarifaImpuestoEntity} from './tarifa-impuesto.entity';
import {TarifaImpuestoCreateDto} from './tarifa-impuesto-create-dto';
import {TarifaImpuestoUpdateDto} from './tarifa-impuesto-update-dto';
import {getRepository, Repository} from 'typeorm/browser';
import {ArticuloEntity} from '../articulo/articulo.entity';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root',
})
export class TarifaImpuestoRestSqljsService extends PrincipalRestSqljsService<
  TarifaImpuestoEntity,
  TarifaImpuestoCreateDto,
  TarifaImpuestoUpdateDto
> {
  constructor
  (private readonly _http: HttpClient,
   private readonly _toasterService: ToasterService) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tarifa-impuesto';
    this.entidad = TarifaImpuestoEntity;
  }

  async upsert(
    tarifasImpuestosSinRepetidos: TarifaImpuestoEntity[]
  ) {
    try {
      return await this.repository().save(tarifasImpuestosSinRepetidos);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al crear registros');
      console.error({
        error: e,
        mensaje: 'Error creando registros'
      });
    }
  }

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
  }}
