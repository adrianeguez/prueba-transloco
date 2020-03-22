import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { OperarioInterface } from '../../interfaces/operario.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperarioRestService extends PrincipalRestService<
  OperarioInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'operario';
  }

  obtenerOperarios(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-operarios?datos=${JSON.stringify(datos)}`,
    );
  }
}
