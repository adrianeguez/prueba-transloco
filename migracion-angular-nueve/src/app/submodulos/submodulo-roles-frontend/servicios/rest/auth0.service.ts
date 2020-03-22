import {PrincipalAuth0RestService} from '@manticore-labs/ng-api/build/main/lib/clases/principal-auth0-rest-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {DatosUsuarioInterface} from '../../../submodulo-empresa-front/interfaces/datos-usuario.interface';

export class Auth0Service extends PrincipalAuth0RestService {

  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'auth0';
  }
  guardarUsuario(usuario: DatosUsuarioInterface) {
    const path = `${this.url}:${this.port}/${this.segmento}/guardar-usuario`;
   return this._http.post(path, usuario);
  }

  obtenerFechaServidor() {
    const path = `${this.url}:${this.port}/${this.segmento}/obtenerFecha`;
    return this._http.get(path);
  }
}
