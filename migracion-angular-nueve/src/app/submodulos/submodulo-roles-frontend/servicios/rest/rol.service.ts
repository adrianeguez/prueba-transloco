import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { RolInterface } from '../../interfaces/rol-interface';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class RolRestService extends PrincipalRestService<RolInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'rol';
  }
}
