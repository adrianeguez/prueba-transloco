import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { CargaMasivaInterface } from '../../interfaces/carga-masiva.interface';
import { environment } from '../../../../../environments/environment';
import { CargandoService } from 'man-lab-ng';

@Injectable({
  providedIn: 'root',
})
export class CargaMasivaRestService extends PrincipalRestService<
  CargaMasivaInterface
> {
  constructor(
    private readonly _http: HttpClient,
    private readonly _cargandoService: CargandoService,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'carga-masiva';
  }
}
