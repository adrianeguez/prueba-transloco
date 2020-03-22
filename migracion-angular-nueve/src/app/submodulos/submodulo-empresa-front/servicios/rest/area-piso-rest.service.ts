import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AreaPisoInterface } from '../../interfaces/area-piso.interface';

@Injectable({
  providedIn: 'root',
})
export class AreaPisoRestService extends PrincipalRestService<
  AreaPisoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'area-piso';
  }

  obtenerAreasPadre(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-areas-padre?datos=${JSON.stringify(datos)}`,
    );
  }
}
