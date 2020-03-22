import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {CursoInterface} from '../../interfaces/curso.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class CursoRestService extends PrincipalRestService<CursoInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'curso';
  }

}
