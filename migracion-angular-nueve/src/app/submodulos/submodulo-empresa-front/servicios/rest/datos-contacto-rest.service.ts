import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { DatosContactoInterface } from '../../interfaces/datos-contacto.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatosContactoRestService extends PrincipalRestService<
  DatosContactoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'datos-contacto';
  }
}
