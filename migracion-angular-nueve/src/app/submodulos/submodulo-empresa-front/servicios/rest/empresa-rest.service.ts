import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { EmpresaInterface } from '../../interfaces/empresa.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaRestService extends PrincipalRestService<EmpresaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'empresa';
  }

  buscarEmpresasSinPadres(datos): Observable<any> {
    console.log('Lo estoy llamando');
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-empresas-sin-padres?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
}
