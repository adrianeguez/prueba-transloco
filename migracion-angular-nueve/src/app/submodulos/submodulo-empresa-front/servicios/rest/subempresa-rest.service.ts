import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { Observable } from 'rxjs';
import { SubempresaInterface } from '../../interfaces/subempresa.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubempresaRestService extends PrincipalRestService<
  SubempresaInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'subempresa';
  }

  buscarEmpresas(datos): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-empresas?datos=${JSON.stringify(datos)}`,
    );
  }

  guardarEmpresaSubemrpesa(datos) {
    return this._http.post(
      `${environment.url}:${environment.port}/${this.segmento}/guardar-empresa-subempresa`,
      datos,
    );
  }

  editarEmpresaInformacionTributaria(datos) {
    return this._http.post(
      `${environment.url}:${environment.port}/${this.segmento}/editar-empresa-informacion-tributaria`,
      datos,
    );
  }
}
