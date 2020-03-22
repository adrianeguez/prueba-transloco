import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargaMasivaInterface } from '../../interfaces/carga-masiva.interface';
import { environment } from '../../../../../environments/environment';
import { CargandoService } from 'man-lab-ng';

@Injectable({
  providedIn: 'root',
})
export class GuardarArchivoRestService extends PrincipalRestService<
  CargaMasivaInterface
> {
  constructor(
    private readonly _http: HttpClient,
    private readonly _cargandoService: CargandoService,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'guardar-archivo';
  }

  subirArchivo(archivo: File, idAEnviar?: any) {
    const formData: FormData = new FormData();
    const nombreAMandar = archivo.name.split('.')[0];
    formData.append(`${nombreAMandar}`, archivo);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = { headers };

    if (idAEnviar) {
      if (idAEnviar.idBodega) {
        return this._http.post(
          // tslint:disable-next-line:max-line-length
          `${this.url}:${this.port}/${this.segmento}/subir-archivo/?idBodega=${idAEnviar.idBodega}&idEmpresa=${idAEnviar.idEmpresa}&idEdificio=${idAEnviar.idEdificio}`,
          formData,
          options,
        );
      } else {
        return this._http.post(
          `${this.url}:${this.port}/${this.segmento}/subir-archivo/?id=${idAEnviar}`,
          formData,
          options,
        );
      }
    } else {
      return this._http.post(
        `${this.url}:${this.port}/${this.segmento}/subir-archivo`,
        formData,
        options,
      );
    }
  }

  subirArchivoConId(archivo: File, idAEnviar: number) {
    const formData: FormData = new FormData();
    const nombreAMandar = archivo.name.split('.')[0];
    formData.append(`${nombreAMandar}`, archivo);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = { headers };

    return this._http.post(
      `${this.url}:${this.port}/${this.segmento}/subir-archivo/?id=${idAEnviar}`,
      formData,
      options,
    );
  }
}
