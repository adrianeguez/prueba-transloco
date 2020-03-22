import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';
import {OpcionInterface} from '../../interfaces/opcion.interface';

@Injectable()
export class OpcionRestService extends PrincipalRestService<OpcionInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'opcion';
  }
}
