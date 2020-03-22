import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { RutaClienteInterface } from '../../interfaces/ruta-cliente-interface';

@Injectable({
  providedIn: 'root',
})
export class RutaClienteRestService extends PrincipalRestService<
  RutaClienteInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'ruta-cliente';
  }

  obtenerRutaEmpresaDireccion(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-ruta-edificio-direccion?datos=${JSON.stringify(datos)}`,
    );
  }

  obtenerRutaVendedorEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/obtener-ruta-cliente-edificio?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  crearVendedoresAsignados(datos: any): Observable<any> {
    return this._http.post(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/crear-asignacion-vendedor`,
      datos,
    );
  }

  buscarRutaClienteRutaLugar(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-ruta-cliente-lugar?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
  obtenerEdificioPorRutaOLugar(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/obtener-edificios-por-lugar-ruta?datos=${JSON.stringify(datos)}`,
    );
  }
}
