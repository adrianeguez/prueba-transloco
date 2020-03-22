import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {PuntoEmisionOperarioInterface} from '../../interfaces/cajas/punto-emision-operario.interface';
import {Auth0Service} from '../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {map} from 'rxjs/operators';
import {IngresarKardexCaja} from '../../componentes/formularios/formulario-ingresar-kardex-caja/ingresar-kardex-caja';
import {CuadrarCaja} from '../../componentes/formularios/formulario-cuadrar-caja/cuadrar-caja';
import {BodegaInterface} from '../../../submodulo-empresa-front/interfaces/bodega.interface';

@Injectable()
export class PuntoEmisionOperarioRestService extends PrincipalRestService<PuntoEmisionOperarioInterface> {
  constructor(private readonly _http: HttpClient,
              private readonly _auth0Service: Auth0Service) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'punto-emision-operario';
  }

  tengoCajaActiva() {
    const consulta = `${this.url}:${this.port}/${this.segmento}/tengoCajaActiva/${this._auth0Service.datosUsuario.user_id}`;
    return this._http
      .get(consulta)
      .pipe(
        map(r => r as RespuestaTengoCajaActiva)
      );
  }

  cerrarPuntoEmision(id, registro: CuadrarCaja) {
    const url = `${this.url}:${this.port}/${this.segmento}/cerrarPuntoEmision/${id}`;
    return this._http
      .put(url, registro);
  }

}

export interface RespuestaTengoCajaActiva {
  id: number;
  fechaHoraInicio: string;
  valorInicia: string;
  habilitado: number;
  estado: string;
  createdAt: string;
  updatedAt: string;
  operario: {
    id: number;
    contactoEmpresa: {
      id: number;
      datosUsuario: {
        user_id: string;
      }
    }
  };
  puntoEmision: {
    id: number,
    bodega: BodegaInterface,
  };
}
