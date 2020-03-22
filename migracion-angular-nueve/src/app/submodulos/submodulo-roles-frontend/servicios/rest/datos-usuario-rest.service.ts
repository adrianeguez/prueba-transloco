import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalAuth0RestService } from '@manticore-labs/ng-api/build/main/lib/clases/principal-auth0-rest-service';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { environment } from '../../../../../environments/environment';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {DatosUsuarioInterface} from '../../../submodulo-empresa-front/interfaces/datos-usuario.interface';

@Injectable()
export class DatosUsuarioRestService extends PrincipalRestService<DatosUsuarioInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'datos-usuario';
  }

  findAllDatosUsuario(query) {
    const ruta = `${this.url}:${this.port}/${
      this.segmento
    }/findAllDatosUsuario?criterioBusqueda=${JSON.stringify(query)}`;
    return this._http.get(ruta);
  }
  findWhereOrDatosUsuario(query) {
    const ruta = `${this.url}:${this.port}/${
      this.segmento
    }/findWhereOrDatosUsuario?criterioBusqueda=${JSON.stringify(query)}`;
    return this._http.get(ruta);
  }

  crearUsuario(usuario: UsuarioAuth0Crear) {
    const ruta = `${this.url}:${this.port}/${this.segmento}/`;
    return this._http.post(ruta, usuario);
  }
}

export interface UsuarioAuth0Crear {
  datosAuth0: {
    name: string;
    username: string;
    email: string;
  };
  datosUsuario: UsuarioInterface;
}
