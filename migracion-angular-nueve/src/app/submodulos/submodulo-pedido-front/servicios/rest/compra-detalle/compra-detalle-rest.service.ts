import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {CompraDetalleInterface} from './interfaces/compra-detalle.interface';

@Injectable()
export class CompraDetalleRestService extends PrincipalRestService<CompraDetalleInterface> {
  constructor(
    private readonly _http: HttpClient,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'compra-detalle';
  }

  guardarDetalleCompra(detalleCompra: CompraDetalleInterface[]) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardar-detalle-compra`;
    return this._http.post(url, detalleCompra);
  }

  guardarDetallePedido(detallePedido: CompraDetalleInterface[]) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardar-detalle-pedido`;
    return this._http.post(url, detallePedido);
  }

  guardarPedido(idPedido: number) {
    const url = `${this.url}:${this.port}/${this.segmento}/actualizar-detalle`;
    return this._http.post(url, {idPedido});
  }
}
