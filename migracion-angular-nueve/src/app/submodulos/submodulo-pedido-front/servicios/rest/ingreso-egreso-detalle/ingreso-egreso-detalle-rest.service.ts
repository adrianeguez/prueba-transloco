import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {IngresoEgresoDetalleInterface} from './interfaces/ingreso-egreso-detalle.interface';

@Injectable()
export class IngresoEgresoDetalleRestService extends PrincipalRestService<IngresoEgresoDetalleInterface> {
  constructor(
    private readonly _http: HttpClient,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'ingreso-egreso-detalle';
  }

  guardarDetalle(detalle: IngresoEgresoDetalleInterface[]) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardar-detalle`;
    return this._http.post(url, detalle);
  }

  guardarPedido(idPedido: number) {
    const url = `${this.url}:${this.port}/${this.segmento}/actualizar-detalle`;
    return this._http.post(url, {idPedido});
  }
}
