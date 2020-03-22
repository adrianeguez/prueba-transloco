import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {DatosVendedorInterface} from '../../interfaces/datos-vendedor-interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {EdiCliRutaInterface} from '../../interfaces/edi-cli-ruta.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EdiCliRutaRestService extends PrincipalRestService<
  EdiCliRutaInterface
  > {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'edi-cli-ruta';
  }

  obtenerEdificiosClientesPorIdEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      ':' +
      this.port +
      `/${
        this.segmento
      }/obtener-edificios-clientes?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}
