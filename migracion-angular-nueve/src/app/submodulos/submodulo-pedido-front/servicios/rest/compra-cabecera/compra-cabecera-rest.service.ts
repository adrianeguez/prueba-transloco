import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { CompraCabeceraInterface } from './interfaces/compra-cabecera-interface';
import { MovimientoCabeceraInterface } from '../../../interfaces/movimientos/pedido-compra-interface';

@Injectable()
export class CompraCabeceraRestService extends PrincipalRestService<
  CompraCabeceraInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'compra-cabecera';
  }

  guardarCabeceraCompra(cabecera: MovimientoCabeceraInterface) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardar-cabecera`;
    return this._http.post(url, cabecera);
  }

  guardarCabeceraPedidoCompra(cabecera: MovimientoCabeceraInterface) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardar-cabecera-pedido`;
    return this._http.post(url, cabecera);
  }
}
