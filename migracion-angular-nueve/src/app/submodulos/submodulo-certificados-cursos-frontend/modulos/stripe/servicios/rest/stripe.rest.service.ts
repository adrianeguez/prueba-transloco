import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {StripeInterface} from '../../interfaces/stripe.interface';

@Injectable()
export class StripeRestService extends PrincipalRestService<StripeInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'stripe';
  }

  recibirCliente(datos) {
    // const formData: FormData = new FormData();
    return this._http.post(`${this.url}:${this.port}/${this.segmento}/cliente`, datos);
  }

  reversarTarjeta(idIntento: string, cantidad?) {
    const enviarDatos = {
      intento: idIntento,
      cantidad,
    };
    return this._http.post(`${this.url}:${this.port}/${this.segmento}/reverso`, enviarDatos);
  }

}
