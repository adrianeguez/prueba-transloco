import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { CalificacionProveedorInterface } from '../../interfaces/calificacion-proveedor.interface';

@Injectable({
  providedIn: 'root',
})
export class CalificacionProveedorRestService extends PrincipalRestService<
  CalificacionProveedorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'calificacion-proveedor';
  }

  guardarCalificacionProveedor(datos) {
    return this._http.post(
      `${environment.url}:${environment.port}/calificacion-proveedor/guardar-calificacion-proveedor`,
      datos,
    );
  }
}
