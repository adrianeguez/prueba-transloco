import { Injectable } from '@angular/core';
import { DatosUsuarioCreateDto } from './datos-usuario-create-dto';
import { DatosUsuarioUpdateDto } from './datos-usuario-update-dto';
import { DatosUsuario } from './datos-usuario';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable()
export class DatosUsuarioRestService extends PrincipalRestSqljsService<
  DatosUsuario,
  DatosUsuarioCreateDto,
  DatosUsuarioUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'datos-usuario';
    this.entidad = DatosUsuario;
  }
}
