import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {PeriodoVentaInterface} from '../../interfaces/periodo-venta-interface';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeriodoVentaRestService extends PrincipalRestService<PeriodoVentaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'periodo-venta';
  }

  cerrarPeriodoVentas(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      ':' +
      this.port +
      `/${this.segmento}/periodo-cierre-ventas-por-vendedor?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }

  cambioEstadoPeridoCierreMigrar(datos: any): Observable<any> {
    return this._http.put(
      this.url +
      ':' +
      this.port +
      `/${this.segmento}/cambiar-estado-periodo`, datos
    );
  }

}
