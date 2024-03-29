import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {ArticuloPorBodegaInterface} from './interfaces/articulo-por-bodega.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticuloPorBodegaRestService extends PrincipalRestService<ArticuloPorBodegaInterface> {
  constructor(
    private readonly _http: HttpClient,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'articulo-bodega';
  }
}
