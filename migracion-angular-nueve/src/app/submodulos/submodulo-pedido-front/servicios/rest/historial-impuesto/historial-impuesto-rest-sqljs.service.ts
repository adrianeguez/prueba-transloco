import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {HistorialImpuestoEntity} from './historial-impuesto.entity';
import {HistorialImpuestoCreateDto} from './historial-impuesto-create-dto';
import {HistorialImpuestoUpdateDto} from './historial-impuesto-update-dto';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {getRepository, Repository} from 'typeorm/browser';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root',
})
export class HistorialImpuestoRestSqljsService extends PrincipalRestSqljsService<
  HistorialImpuestoEntity,
  HistorialImpuestoCreateDto,
  HistorialImpuestoUpdateDto
> {
  constructor
  (private readonly _http: HttpClient,
   private readonly _toasterService: ToasterService) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'historial-impuesto';
    this.entidad = HistorialImpuestoEntity;
  }

  async upsert(
    historialImpuestoSinRepetidos: HistorialImpuestoEntity[]
  ) {
    try {
      return await this.repository().save(historialImpuestoSinRepetidos);
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
    }  }
}
