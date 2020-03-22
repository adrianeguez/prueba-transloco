import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ArticuloBodegaInterface} from '../../interfaces/articulo-bodega.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticuloBodegaRestService extends PrincipalRestService<ArticuloBodegaInterface> {
  constructor(
    private readonly _http: HttpClient,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'articulo-bodega';
  }

  recalculoPorArticulo(datos) {
    return this._http.post(`${environment.url}:${environment.port}/articulo-bodega/recalculo-articulo`, datos);
  }

  recalculoPorBodega(datos) {
    return this._http.post(`${environment.url}:${environment.port}/articulo-bodega/recalculo-bodega?bodega=${datos.bodega}`, datos);
  }

  obtenerPeriodo(datos): Observable<any> {
    return this._http.get(`${environment.url}:${environment.port}/articulo-bodega/periodo-venta-articulo-bodega?idEmpresa=${datos.idEmpresa}`, datos);
  }

  filtarArticuloBodegaEmpresa(consulta) {
    let path: string;
    if (consulta.articuloCodigoNombre) {
      path = `filter/articulo-bodega/${consulta.idEmpresa}/${consulta.idBodega}?articuloCodigoNombre=${consulta.articuloCodigoNombre}`;
    } else {
      path = `filter/articulo-bodega/${consulta.idEmpresa}/${consulta.idBodega}`;
    }
    const url = `${environment.url}:${environment.port}/${this.segmento}/${path}`;
    return this._http.get(url);
  }

  obtenerArticuloEmpresaBodegaPorNombreCodigo(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      ':' +
      this.port +
      `/${
        this.segmento
      }/buscar-articulo-empresa-nombre-codigo?datos=${JSON.stringify(datos)}`,
    );
  }
}


