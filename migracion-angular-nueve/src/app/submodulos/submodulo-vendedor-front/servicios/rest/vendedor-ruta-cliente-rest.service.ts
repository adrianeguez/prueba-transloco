import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {VendedoresRutaClienteInterface} from '../../interfaces/vendedores-ruta-cliente.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendedorRutaClienteRestService extends PrincipalRestService<
  VendedoresRutaClienteInterface
  > {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'vende-ruta-cli';
  }

  buscarVendedorPorNombre(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      ':' +
      this.port +
      `/${
        this.segmento
      }/buscar-vendedor-asignado?datos=${JSON.stringify(datos)}`,
    );
  }
}
