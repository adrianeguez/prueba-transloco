import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { TransferenciaCabeceraInterface } from './interfaces/transferencia-cabecera.interface';
import { MovimientoCabeceraInterface } from '../../../interfaces/movimientos/pedido-compra-interface';

@Injectable()
export class TransferenciaCabeceraRestService extends PrincipalRestService<
  TransferenciaCabeceraInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'transferencia-cabecera';
  }

  guardarCabecera(cabecera: MovimientoCabeceraInterface) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardar-cabecera`;
    return this._http.post(url, cabecera);
  }
}
