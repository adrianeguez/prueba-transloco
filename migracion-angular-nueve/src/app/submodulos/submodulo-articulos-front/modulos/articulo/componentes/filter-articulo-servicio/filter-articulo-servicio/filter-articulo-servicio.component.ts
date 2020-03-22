import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticuloInterface} from '../../../../../interfaces/articulo.interface';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {ArticulosRestService} from '../../../../../servicios/rest/articulos-rest.service';
import {NUMERO_FILAS_ARTICULO_EMPRESA} from '../../../../../constantes/numero-filas-articulos-empresa';
import {toastErrorConexionServidor} from '../../../../../../../constantes/mensajes-toaster';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'ml-filter-articulo-servicio',
  templateUrl: './filter-articulo-servicio.component.html',
  styleUrls: ['./filter-articulo-servicio.component.scss']
})
export class FilterArticuloServicioComponent implements OnInit {

  skip = 0;
  busqueda = '';
  @Input() idEmpresa;
  @Output() articulosEncontrados: EventEmitter<[ArticuloInterface[], number]> = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
    protected readonly _translocoService: TranslocoService,
  ) {}

  ngOnInit() {
    this.buscar(this.busqueda);
  }

  buscar(busqueda: string) {
    this._cargandoService.habilitarCargando();
    const consulta = {
      skip: this.skip,
      take: NUMERO_FILAS_ARTICULO_EMPRESA,
      where: {
        habilitado: 1,
        esServicio: 1,
        articuloPorEmpresa: {
          empresa: {id: +this.idEmpresa}
        },
        nombre: `LIKE(\"%25${busqueda}%25\")`
      }
    };
    this._articulosRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`)
      .subscribe(
        (resultado: [ArticuloInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          this.articulosEncontrados.emit(resultado);
        },
        error => {
          console.log(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }

}
