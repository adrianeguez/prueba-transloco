import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { RolMenuInterface } from '../../interfaces/rol-menu.interface';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class RolMenuRestService extends PrincipalRestService<RolMenuInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'permiso-menu';
  }
}
