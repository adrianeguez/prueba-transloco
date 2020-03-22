import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SeccionMenuInterface } from '../../interfaces/seccion-menu.interface';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { Injectable } from '@angular/core';

@Injectable()
export class SeccionMenuRestService extends PrincipalRestService<
  SeccionMenuInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'seccion-menu';
  }
}
