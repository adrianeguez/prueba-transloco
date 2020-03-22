import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { EmpresaClientesInterface } from '../../interfaces/empresa-clientes.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaClientesRestService extends PrincipalRestService<
  EmpresaClientesInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'empresa-clientes';
  }

  obtenerEmpresasClientePorRazonSocialRUC(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-empresas-cliente-razon-social-ruc?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  // obtenerEdificiosClientesPorIdEmpresa(datos: any): Observable<any> {
  //   return this._http.get(
  //     this.url +
  //     ':' +
  //     this.port +
  //     `/${
  //       this.segmento
  //     }/obtener-edificios-clientes?datos=${JSON.stringify(
  //       datos,
  //     )}`,
  //   );
  // }
}
