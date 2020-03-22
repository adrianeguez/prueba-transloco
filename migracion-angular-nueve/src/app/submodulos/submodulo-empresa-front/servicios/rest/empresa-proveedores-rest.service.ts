import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { EmpresaProveedoresInterface } from '../../interfaces/empresa-proveedores.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaProveedoresRestService extends PrincipalRestService<
  EmpresaProveedoresInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'empresa-proveedores';
  }

  obtenerEmpresasProveedoresPorRazonSocialRuc(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-empresas-proveedor-razon-social-ruc?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
}
