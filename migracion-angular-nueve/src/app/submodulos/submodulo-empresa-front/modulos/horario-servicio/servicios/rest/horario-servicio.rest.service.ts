import {Injectable} from '@angular/core';
import {HorarioServicioInterface} from '../../interfaces/horario-servicio.interface';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class HorarioServicioRestService extends PrincipalRestService<HorarioServicioInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'horario-servicio';
  }

}
