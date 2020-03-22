import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { environment } from './../../../../../environments/environment';
import { GrupoInterface } from './../../interfaces/grupo.interface';

@Injectable({
  providedIn: 'root',
})
export class GrupoRestService extends PrincipalRestService<GrupoInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'grupo';
  }
}
