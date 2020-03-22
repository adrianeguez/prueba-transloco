import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../environments/environment';
import {ModulosSistemaInterface} from '../../interfaces/modulos-sistema.interface';

@Injectable()
export class ModulosSistemaRestService extends PrincipalRestService<ModulosSistemaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'modulos';
  }
}
