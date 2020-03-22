import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { DepartamentoEmpresaInterface } from '../../interfaces/departamento-empresa.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoEmpresaRestService extends PrincipalRestService<
  DepartamentoEmpresaInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'departamento-empresa';
  }

  obtenerDepartamentoPadre(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-departamentos-padre?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
}
