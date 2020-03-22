import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DatosVendedorInterface } from '../../interfaces/datos-vendedor-interface';

@Injectable({
  providedIn: 'root',
})
export class DatosVendedorRestService extends PrincipalRestService<
  DatosVendedorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'datos-vendedor';
  }

  buscarVendedorRutaLugar(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-vendedor-ruta-lugar?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  buscarVendedorAsignadoEdificioEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-vendedor-asignado-edifico-empresa?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  buscarVendedor(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-vendedor?datos=${JSON.stringify(datos)}`,
    );
  }
}
