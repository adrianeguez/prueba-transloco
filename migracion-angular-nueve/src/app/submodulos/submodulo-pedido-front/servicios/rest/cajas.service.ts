import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {flatMap} from 'rxjs/operators';

@Injectable()
export class CajasService {
  dominio = `${environment.url}:${environment.port}`;

  constructor(private readonly _httpClient: HttpClient) {
  }

  obtenerEstablecimientosPorAdministrador(
    administradorEstablecimientoIds: string[] | number[],
  ) {
    const dominio = this.dominio;
    const queryAdministradorEstablecimiento = {
      where: {
        id: `In([${administradorEstablecimientoIds}])`,
      },
      relations: ['establecimiento', 'establecimiento.edificio'],
    };
    const administradorEstablecimiento =
      dominio +
      `/administrador-establecimiento?criterioBusqueda=${JSON.stringify(
        queryAdministradorEstablecimiento,
      )}`;
    return this._httpClient.get(administradorEstablecimiento);
  }

  obtenerOperariosParaAsignar(idEstablecimiento: string | number) {
    const dominio = this.dominio;
    const queryEstablecimiento = {
      where: {
        id: idEstablecimiento,
      },
      relations: ['puntosEmision'],
    };
    const establecimiento =
      dominio +
      `/establecimiento?criterioBusqueda=${JSON.stringify(
        queryEstablecimiento,
      )}`;
    return this._httpClient
      .get(establecimiento)
      .pipe(
        flatMap(respuestaEstablecimiento => {
          console.log('respuestaEstablecimiento', respuestaEstablecimiento);
          const puntosEmisionIds = respuestaEstablecimiento[0][0].puntosEmision.map(
            e => e.id,
          );

          if (puntosEmisionIds.length === 0) {
            puntosEmisionIds.push(0);
          }

          const queryPuntoEmisionOperario = {
            order: {id: 'DESC'},
            relations: ['operario', 'operario.contactoEmpresa'],
            where: {
              estado: 'In(["ABI","CRE","CUA"])',
              puntoEmision: `In([${puntosEmisionIds}])`,
            },
          };

          const puntoEmisionOperario =
            dominio +
            `/punto-emision-operario?criterioBusqueda=${JSON.stringify(
              queryPuntoEmisionOperario,
            )}`;
          return this._httpClient.get(puntoEmisionOperario);
        }),
        flatMap(respuestaPuntoEmisionOperario => {
          const operariosOcupados = respuestaPuntoEmisionOperario[0].map(
            e => e.operario.id,
          );
          const contactosEmpresa = respuestaPuntoEmisionOperario[0].map(
            e => e.operario.contactoEmpresa.id,
          );

          if (operariosOcupados.length === 0) {
            operariosOcupados.push(0);
          }
          if (contactosEmpresa.length === 0) {
            contactosEmpresa.push(0);
          }
          const queryOperario = {
            order: {id: 'DESC'},
            relations: ['puntoEmision'],
            where: {
              habilitado: true,
              puntoEmision: `Not(\"In([${operariosOcupados}])\")`,
              contactoEmpresa: `Not(\"In([${contactosEmpresa}])\")`,
            },
          };
          const operario =
            dominio +
            `/operario?criterioBusqueda=${JSON.stringify(queryOperario)}`;
          return this._httpClient.get(operario);
        }),
      );
  }

  asignarOperario(
    operario: number,
    administradorEstablecimiento: number,
    valorInicia: number,
  ) {
    const dominio = this.dominio;
    const segmento = '/punto-emision-operario/asignarOperario';
    return this._httpClient.post(dominio + segmento, {
      operario,
      administradorEstablecimiento,
      valorInicia,
    });
  }
}
