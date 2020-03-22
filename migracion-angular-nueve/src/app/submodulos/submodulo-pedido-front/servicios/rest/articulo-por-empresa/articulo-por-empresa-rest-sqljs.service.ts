import { ArticuloPorEmpresaCreateDto } from './articulo-por-empresa-create-dto';
import { ArticuloPorEmpresaUpdateDto } from './articulo-por-empresa-update-dto';
import { ArticuloPorEmpresaEntity } from './articulo-por-empresa.entity';
import {Injectable} from '@angular/core';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {getRepository, Repository} from 'typeorm/browser';
import {ToasterService} from 'angular2-toaster';
import {ArticuloRestSqljsService} from '../articulo/articulo-rest-sqljs.service';

@Injectable({
  providedIn: 'root',
})
export class ArticuloPorEmpresaRestSqljsService extends PrincipalRestSqljsService<
  ArticuloPorEmpresaEntity,
  ArticuloPorEmpresaCreateDto,
  ArticuloPorEmpresaUpdateDto
> {
  constructor(
    private readonly _http: HttpClient,
    private readonly _toasterService: ToasterService,
    private readonly _articuloRestSqljsService: ArticuloRestSqljsService) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'articulo-por-empresa';
    this.entidad = ArticuloPorEmpresaEntity;
  }

  obtenerArticuloPrecioImpuestoPorIdEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/obtener-articulo-precio-impuesto-por-empresa?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  async upsert(
    articulosPorEmpresaSinRepetidos: ArticuloPorEmpresaEntity[]
  ) {
    try {
      return await this.repository().save(articulosPorEmpresaSinRepetidos);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al crear registros');
      console.error({
        error: e,
        mensaje: 'Error creando registros'
      });
    }
  }

  async getAll (consulta = {}) {
    try {
      return await this.repository().findAndCount(consulta);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al traer registros');
      console.error({
        error: e,
        mensaje: 'Error al traer registros'
      });
    }
  }

  async obtenerArticuloEmpresaPorNombreCodigo(datos) {
    try {
      const values = await this.repository()
        .createQueryBuilder('articuloEmpresa')
        .innerJoinAndSelect('articuloEmpresa.precios', 'precios')
        .innerJoinAndSelect('articuloEmpresa.articulo', 'articulo')
        .innerJoinAndSelect('articulo.tarifaImpuesto', 'tarifaImpuesto')

        .innerJoinAndSelect(
          'tarifaImpuesto.historialImpuesto',
          'historialImpuesto',
          '(articulo.nombre LIKE :busqueda or articulo.codigo LIKE :busqueda)',
          {
            busqueda: `%${datos.busqueda}%`,
            idEmpresa: +datos.idEmpresa,
            habilitado: datos.habilitado,
          },
        )
        .getManyAndCount();
      return values;
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al traer registros');
      console.error({
        error: e,
        mensaje: 'Error al traer registros'
      });    }
  }
}
