import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {KardexCaja} from '../../interfaces/cajas/kardex-caja';
import {IngresarKardexCaja} from '../../componentes/formularios/formulario-ingresar-kardex-caja/ingresar-kardex-caja';

@Injectable()
export class KardexCajaRestService extends PrincipalRestService<KardexCaja> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'kardex-caja';
  }

  ingresarKardexCaja(registro: { registro: IngresarKardexCaja }) {
    const url = `${this.url}:${this.port}/${this.segmento}/crearKardexCaja`;
    return this._http
      .post(url, registro);
  }
}
