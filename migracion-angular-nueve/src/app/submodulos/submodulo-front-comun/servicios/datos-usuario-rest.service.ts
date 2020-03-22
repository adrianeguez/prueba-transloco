import { Inject, Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { DatosUsuarioInterface } from '../../submodulo-empresa-front/interfaces/datos-usuario.interface';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionModuloInterface } from '../interfaces/configuracion-modulo.interface';

@Injectable({
  providedIn: 'root',
})
export class DatosUsuarioRestService extends PrincipalRestService<
  DatosUsuarioInterface
> {
  constructor(
    private readonly _http: HttpClient,
    @Inject('configuracion') configuracion: ConfiguracionModuloInterface,
  ) {
    super(_http);
    this.url = configuracion.url;
    this.port = configuracion.port;
    this.segmento = 'datos-usuario';
  }
}
