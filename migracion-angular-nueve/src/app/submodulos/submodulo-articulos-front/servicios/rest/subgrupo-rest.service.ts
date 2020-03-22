import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { SubgrupoInterface } from '../../interfaces/subgrupo.interface';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubgrupoRestService extends PrincipalRestService<
  SubgrupoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'subgrupo';
  }
}
