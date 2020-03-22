import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { CalificacionClienteInterface } from '../../interfaces/calificacion-cliente.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalificacionClienteRestService extends PrincipalRestService<
  CalificacionClienteInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'calificacion-cliente';
  }

  guardarCalificacionCliente(datos) {
    return this._http.post(
      `${environment.url}:${environment.port}/calificacion-cliente/guardar-calificacion-cliente`,
      datos,
    );
  }
}
