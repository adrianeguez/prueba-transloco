import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { EscalaVendedorPorPeriodoInterface } from '../../interfaces/escala-vendedor-por-periodo-interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EscalaVendedorPorPeriodoRestService extends PrincipalRestService<
  EscalaVendedorPorPeriodoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'escala-vendedor-por-periodo';
  }

  obtenerEscalaVendedorPorPeriodoPorNombre(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-escala-vendedor-por-nombre-escala?datos=
      ${JSON.stringify(datos)}`,
    );
  }

  buscarYCrearEscalaPeriodoVendedor(datos) {
    const url = `${this.url}:${this.port}/${this.segmento}/buscar-crear-escala-periodo-vendedor`;
    const respuesta = this._http.post(url, datos);
    return respuesta;
  }
}
