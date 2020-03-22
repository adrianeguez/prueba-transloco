import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { AreaTrabajadorInterface } from '../../interfaces/area-trabajador.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaTrabajadorRestService extends PrincipalRestService<
  AreaTrabajadorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'area-trabajador';
  }

  obtenerTrabajadoresPoIdentificacionApellidosUbicacion(
    datos: any,
  ): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-trabajadores-identificacion-apellidos-ubicacion?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
}
