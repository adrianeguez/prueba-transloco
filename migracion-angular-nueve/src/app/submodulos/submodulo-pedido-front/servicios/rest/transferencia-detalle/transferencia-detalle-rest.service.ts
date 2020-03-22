import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {TransferenciaDetalleInterface} from './interfaces/transferencia-detalle.interface';

@Injectable()
export class TransferenciaDetalleRestService extends PrincipalRestService<TransferenciaDetalleInterface> {
  constructor(
    private readonly _http: HttpClient,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'transferencia-detalle';
  }

  guardarDetalle(detalle: TransferenciaDetalleInterface[]) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardar-detalle`;
    return this._http.post(url, detalle);
  }

  guardarPedido(idPedido: number) {
    const url = `${this.url}:${this.port}/${this.segmento}/actualizar-detalle`;
    return this._http.post(url, {idPedido});
  }
}
