import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {Toast, ToasterService} from 'angular2-toaster';
import {PreguntaRestService} from '../../../../../../submodulo-certificados-cursos-frontend/modulos/pregunta/servicios/rest/pregunta-rest.service';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';
import {PreciosInterface} from '../../../../../interfaces/precios.interface';
import {PreciosRestService} from '../../../../../servicios/rest/precios-rest.service';
import {MensajesToasterInterface} from '../../../../../../../interfaces/mensajesToaster.Interface';

@Component({
  selector: 'ml-filter-precio',
  templateUrl: './filter-precio.component.html',
  styleUrls: ['./filter-precio.component.scss']
})
export class FilterPrecioComponent implements OnInit {

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;
  @Input() idArticuloEmpresa: number;
  @Output() preciosEncontrados: EventEmitter<[PreciosInterface[], number]> = new EventEmitter();
  skip = 0;
  traduccionesToaster: MensajesToasterInterface;

  constructor(
    private readonly _cargandoService: CargandoService,
    protected readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
    private _precioRestService: PreciosRestService,
  ) {
  }

  ngOnInit() {
    this._translocoService.selectTranslateObject('generales.toasters').subscribe(
      (traduccion) => {
        this.traduccionesToaster = traduccion;
      }
    );
  }

  buscarPrecio() {
    this._cargandoService.habilitarCargando();
    const consulta = {
      skip: this.skip,
      take: 5,
      where: {
        habilitado: 1,
        articuloPorEmpresa: {id: +this.idArticuloEmpresa}
      }
    };

    const siguientePrecio$ = this._precioRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        (listaPrecios: [PreciosInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          this.preciosEncontrados.emit(listaPrecios);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({error, mensaje: 'Error trayendo datos', data: consulta});
          this._toasterService.pop(
            this.traduccionesToaster.toastErrorCargarDatos as Toast
          );
        }
      );
  }

}
