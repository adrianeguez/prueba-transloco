import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DireccionRestService extends PrincipalRestService<
  DireccionRestService
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'direccion';
  }
}
