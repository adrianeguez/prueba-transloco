import { Injectable } from '@angular/core';
import { RolPorUsuarioCreateDto } from './rol-por-usuario-create-dto';
import { RolPorUsuarioUpdateDto } from './rol-por-usuario-update-dto';
import { RolPorUsuario } from './rol-por-usuario';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable()
export class RolPorUsuarioRestService extends PrincipalRestSqljsService<
  RolPorUsuario,
  RolPorUsuarioCreateDto,
  RolPorUsuarioUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'rol-por-usuario';
    this.entidad = RolPorUsuario;
  }
}
