import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';
import {PreguntaPorPruebaInterface} from '../../interfaces/pregunta-por-prueba.interface';

@Injectable()
export class PreguntaPorPruebaRestService extends PrincipalRestService<PreguntaPorPruebaInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'pregunta-prueba';
  }

}
