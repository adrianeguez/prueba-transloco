import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { environment } from '../../../../../../../environments/environment';
import { HorarioInterface } from '../../interfaces/horario.interface';

@Injectable()
export class HorarioRestService extends PrincipalRestService<HorarioInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'horario';
  }
}
