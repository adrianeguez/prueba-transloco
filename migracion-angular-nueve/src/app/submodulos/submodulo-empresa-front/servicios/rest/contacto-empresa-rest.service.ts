import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { ContactoEmpresaInterface } from '../../interfaces/contacto-empresa.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactoEmpresaRestService extends PrincipalRestService<
  ContactoEmpresaInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'contacto-empresa';
  }

  obtenerContactosEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-contactos-empresa?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
}
