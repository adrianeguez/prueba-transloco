import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {GoogleClooudInterface} from '../../interfaces/google-clooud.interface';

@Injectable()
export class GoogleCloudRestService extends PrincipalRestService<GoogleClooudInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'google-cloud';
  }
}
