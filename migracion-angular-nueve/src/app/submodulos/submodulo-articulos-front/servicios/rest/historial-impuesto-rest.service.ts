import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { environment } from './../../../../../environments/environment';
import { HistorialImpuestoInterface } from './../../interfaces/historial-impuesto.interface';

@Injectable({
  providedIn: 'root',
})
export class HistorialImpuestoRestService extends PrincipalRestService<
  HistorialImpuestoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'historial-impuesto';
  }

  crearHistorialImpuesto(parametros) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-actualizar-crear-historial-impuesto';
    const respuesta = this._http.post(url, parametros);
    return respuesta;
  }
  buscarHistorialImpuestosPorTipoSiglasTarifaSiglasNombreEstado(datos: any) {
    // tslint:disable-next-line: max-line-length
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-historial-tipo-impuesto?datos=' +
      JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }
}
