import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { DepartamentoTrabajadorInterface } from '../../interfaces/departamento-trabajador.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoTrabajadorRestService extends PrincipalRestService<
  DepartamentoTrabajadorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'departamento-trabajador';
  }

  obtenerTrabajadoresPorCargoOApellidos(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-trabajadores-cargo-apellidos?datos=${JSON.stringify(datos)}`,
    );
  }
}
