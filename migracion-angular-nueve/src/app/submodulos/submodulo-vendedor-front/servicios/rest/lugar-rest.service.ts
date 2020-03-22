import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { LugarInterface } from '../../interfaces/lugar-interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LugarRestService extends PrincipalRestService<LugarInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'lugar';
  }

  obtenerCiudadZona() {
    const obtenerSectores = this._http.get(
      this.url + ':' + this.port + '/' + this.segmento + '/buscar-ciudad-zona',
    );
    return obtenerSectores;
  }
  obtenerNodosFinales(nombre) {
    const path = `busqueda/por-nodo-origen/${nombre}`;
    const urlCompleta = `${this.url}:${this.port}/${this.segmento}/${path}`;
    return this._http.get(urlCompleta);
  }
  obtenerArbolNodos(nodoId) {
    const path = `busqueda/arbol/${nodoId}`;
    const urlCompleta = `${this.url}:${this.port}/${this.segmento}/${path}`;
    return this._http.get(urlCompleta);
  }
}
