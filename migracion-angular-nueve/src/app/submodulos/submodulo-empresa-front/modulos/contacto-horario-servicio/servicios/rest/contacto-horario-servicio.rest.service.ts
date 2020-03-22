import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {ContactoHorarioServicioInterface} from '../../interfaces/contacto-horario-servicio.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class ContactoHorarioServicioRestService extends PrincipalRestService<ContactoHorarioServicioInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'contacto-horario-servicio';
  }

}
