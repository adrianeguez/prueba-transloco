import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
import {ArticuloInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import {ArticulosEmpresaRestService} from '../../../../../submodulo-articulos-front/servicios/rest/articulo-empresa-rest.service';
import {ArticuloPorEmpresaRestSqljsService} from '../../../../servicios/rest/articulo-por-empresa/articulo-por-empresa-rest-sqljs.service';
import {ArticuloPorEmpresaRestService} from '../../../../servicios/rest/articulo-por-empresa/articulo-por-empresa-rest.service';
import {ArticuloBodegaRestService} from '../../../../../submodulo-inventario-front/servicios/rest/articulo-bodega-rest.service';

@Component({
  selector: 'ml-filter-articulo-empresa',
  templateUrl: './filter-articulo-empresa.component.html',
  styleUrls: ['./filter-articulo-empresa.component.scss']
})
export class FilterArticuloEmpresaComponent implements OnInit {
  @Input()
  idProveedor: number;

  @Input() idEmpresa;
  @Input() idBodegaDestino;
  @Input() idBodega;
  skip = 0;
  busqueda = '';
  @Output() articulosEncontrados: EventEmitter<[ArticuloInterface[], number]> = new EventEmitter();
  @Input() esVenta: boolean;

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _articuloBodegaRestService: ArticuloBodegaRestService,
    private readonly _articuloEmpresaRestServiceSqljs: ArticuloPorEmpresaRestSqljsService,
  ) {
  }

  ngOnInit() {
    console.log('Llego al que se esta usando');
    this.buscarArticuloPorNombreCodigo();
  }

  async buscarArticuloPorNombreCodigo() {
    const consulta = {
      busqueda: this.busqueda,
      skip: this.skip,
      take: NUMERO_FILAS_TABLAS,
      habilitado: 1,
      idEmpresa: this.idEmpresa,
      esVenta: this.esVenta,
      idBodega: this.idBodega,
      idBodegaDestino: this.idBodegaDestino,
      idProveedor: this.idProveedor,
    };
    console.log('consulta', consulta);
    this._cargandoService.habilitarCargando();
    if (this.esVenta) {
      const respuestaArticulosEmpresa = await this._articuloEmpresaRestServiceSqljs
        .obtenerArticuloEmpresaPorNombreCodigo(consulta);
      const arregloArticulosEmpresa = respuestaArticulosEmpresa[0].map(articuloEmpresa => {
        const valoresUnitarios = articuloEmpresa.precios.map(precio => {
          return {valorUnitario: precio.valor};
        });
        articuloEmpresa.valoresUnitarios = valoresUnitarios;
        return articuloEmpresa;
      });
      respuestaArticulosEmpresa[0] = arregloArticulosEmpresa;
      this.articulosEncontrados.emit(respuestaArticulosEmpresa);
      this._cargandoService.deshabilitarCargando();
    } else {
      let articuloEmpresa$;
      articuloEmpresa$ = this._articuloBodegaRestService
        .obtenerArticuloEmpresaBodegaPorNombreCodigo(consulta);
      articuloEmpresa$.subscribe(
        (resultado: [ArticuloInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          this.articulosEncontrados.emit(resultado);
        }, error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
        });
    }
  }
}
