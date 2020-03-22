import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TipoSistemaInterface} from '../interfaces/tipo-sistema.interface';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../environments/environment';

@Injectable()
export class TipoSistemaRestService extends PrincipalRestService<TipoSistemaInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-sistema';
  }

}
