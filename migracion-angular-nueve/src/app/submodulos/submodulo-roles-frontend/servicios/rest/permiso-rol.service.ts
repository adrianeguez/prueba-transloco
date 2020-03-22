import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { PermisoRolInterface } from '../../interfaces/permiso-rol.interface';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class PermisoRolRestService extends PrincipalRestService<
  PermisoRolInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'permiso-rol';
  }
}
