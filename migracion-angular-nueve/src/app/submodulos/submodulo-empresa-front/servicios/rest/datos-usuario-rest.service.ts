import { Inject, Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { DatosUsuarioInterface } from '../../interfaces/datos-usuario.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosUsuarioRestService extends PrincipalRestService<
  DatosUsuarioInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'datos-usuario';
  }

  obtenerUsuariosSinContactosEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      ':' +
      this.port +
      `/${this.segmento}/buscar-usuarios-sin-contacto-empresa?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}
