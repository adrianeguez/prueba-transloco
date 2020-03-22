import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { Observable } from 'rxjs';
import { ArticuloProveedorInterface } from '../../interfaces/articulo-proveedor.interface';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticulosProveedorRestService extends PrincipalRestService<
  ArticuloProveedorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'articulo-proveedor';
  }

  obtenerArticuloProveedorPorNombreCodigo(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-articulo-proveedor-nombre-codigo?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  obtenerArticuloProveedorPorEmpresaProveedorFecha(
    datos: any,
  ): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-articulo-proveedor-empresa-fecha?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  filtartArticulosProveedor (idEmpresaProveedor: number, busqueda?) {
    let path = '';
    if (busqueda) {
      path = `filtrar-articulo-proveedor/${idEmpresaProveedor}?codigo=${busqueda}`;
    } else {
      path = `filtrar-articulo-proveedor/${idEmpresaProveedor}`;
    }
    const url = `${environment.url}:${environment.port}/${this.segmento}/${path}`;
    return this._http.get(url);
  }
}
