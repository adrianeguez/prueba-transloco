import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { InformacionTributariaInterface } from '../../interfaces/informacion-tributaria.interface';
import { map } from 'rxjs/operators';
import { EmpresaInterface } from '../../interfaces/empresa.interface';

@Injectable({
  providedIn: 'root',
})
export class InformacionTributariaRestService extends PrincipalRestService<
  InformacionTributariaInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'informacion-tributaria';
  }

  // tslint:disable-next-line:max-line-length
  buscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte(
    cedulaRucPasaporte: string,
  ): Observable<
    RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte
  > {
    return this._http
      .get(
        this.url +
          ':' +
          this.port +
          `/${this.segmento}/buscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte?cedulaRucOPasaporte=${cedulaRucPasaporte}`,
      )
      .pipe(
        map(datos => {
          const respuesta = datos as RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte;
          return respuesta;
        }),
      );
  }
}

export interface RespuestaBuscarEmpresaOInformacionTributariaPorCedulaRucOPasaporte {
  empresa?: EmpresaInterface[];
  informacionTributaria?: InformacionTributariaInterface[];
}
