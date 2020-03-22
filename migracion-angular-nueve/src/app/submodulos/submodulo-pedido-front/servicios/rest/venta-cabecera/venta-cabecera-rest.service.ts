import {Injectable} from '@angular/core';
import {VentaCabeceraCreateDto} from './venta-cabecera-create-dto';
import {VentaCabeceraUpdateDto} from './venta-cabecera-update-dto';
import {VentaCabecera} from './venta-cabecera';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../environments/environment';
import {MovimientoCabeceraInterface} from '../../../interfaces/movimientos/pedido-compra-interface';

@Injectable()
export class VentaCabeceraRestService extends PrincipalRestSqljsService<
  VentaCabecera,
  VentaCabeceraCreateDto,
  VentaCabeceraUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'venta-cabecera';
  }

  inicializarCabecera() {
    // this.entidad = VentaCabecera;
  }

  guardarCabecera(cabecera: MovimientoCabeceraInterface) {
    const url = `${this.url}:${this.port}/${this.segmento}/guardarCabecera`;
    return this._http.post(url, cabecera);
  }
}

// {
//   "tipoMovimiento": "01",
//   "serie": "0001001",
//   "cliente": 1,
//   "fechaPedido": "2019/08/05",
//   "fechaBodega": "2019/08/05",
//   "fechaVencimiento": "2019/08/25",
//   "tipoCliente": "NATURAL",
//   "observacion1": "lore ipsum",
//   "observacion2": "Abcd efghijklmnñopq",
//   "userId": "auth0|5d2bb368a6d2ce0e4497ebdb",
//   "hhmmss": "015040",
//   "hora": "13:50",
//   "aaaammdd": "20190805",
//   "prioridad": 1,
//   "numeroBodega": 1,
//   "idEmpresa": 1,
//   "establecimiento": 1,
//   "puntoEmision": 10
// }
