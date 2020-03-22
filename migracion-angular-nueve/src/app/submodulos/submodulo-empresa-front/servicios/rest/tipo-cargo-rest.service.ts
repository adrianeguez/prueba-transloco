import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { TipoCargoInterface } from '../../interfaces/tipo-cargo.interface';

@Injectable({
  providedIn: 'root',
})
export class TipoCargoRestService extends PrincipalRestService<
  TipoCargoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-cargo';
  }
}
