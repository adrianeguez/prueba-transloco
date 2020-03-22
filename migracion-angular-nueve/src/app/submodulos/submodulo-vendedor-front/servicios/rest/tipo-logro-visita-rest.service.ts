import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { TipoLogroVisitaInterface } from '../../interfaces/tipo-logro-visita-interface';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TipoLogroVisitaRestService extends PrincipalRestService<
  TipoLogroVisitaInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-logro-visita';
  }
}
