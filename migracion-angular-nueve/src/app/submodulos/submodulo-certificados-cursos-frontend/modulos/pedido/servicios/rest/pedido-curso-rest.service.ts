import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {Injectable} from '@angular/core';
import {PedidoCursoInterface} from '../../interfaces/pedido-curso.interface';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class PedidoCursoRestService extends PrincipalRestService<PedidoCursoInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'pedido-curso';
  }

}
