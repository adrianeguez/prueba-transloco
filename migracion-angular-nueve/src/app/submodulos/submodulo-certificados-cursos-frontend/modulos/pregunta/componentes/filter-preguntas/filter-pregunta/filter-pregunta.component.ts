import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {ToasterService} from 'angular2-toaster';
import {PreguntaRestService} from '../../../servicios/rest/pregunta-rest.service';
import {PreguntaInterface} from '../../../interfaces/pregunta.interface';

@Component({
  selector: 'ml-filter-pregunta',
  templateUrl: './filter-pregunta.component.html',
  styleUrls: ['./filter-pregunta.component.scss']
})
export class FilterPreguntaComponent implements OnInit {
  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;
  @Input() idModuloCurso: number;
  @Output() preguntasEncontradas: EventEmitter<[PreguntaInterface[], number]> = new EventEmitter();
  skip = 0;

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
    private _preguntaRestService: PreguntaRestService,
  ) {
    this.skip = 0;
  }

  ngOnInit() {
  }

  buscarPreguntaPorDescripcion(busqueda: string) {
    busqueda = busqueda.trim();
    this._cargandoService.habilitarCargando();
    let consulta;
    if (busqueda !== '') {
      // {"where":{"diapositiva":{"tema":{"moduloCurso":{"id":1}}}}}
      consulta = {
        skip: this.skip,
        take: 5,
        where: {
          diapositiva: {
            habilitado: 1,
            tema: {
              moduloCurso: {id: +this.idModuloCurso}
            }
          },
          descripcion: `Like(\"%25${busqueda}%25\")`
        }
      };
    } else {
      consulta = {
        skip: this.skip,
        take: 5,
        where: {
          habilitado: 1,
          diapositiva: {
            tema: {
              moduloCurso: {id: +this.idModuloCurso}
            }
          },
        }
      };
    }
    const siguientePregunta$ = this._preguntaRestService.findAll(
      'criterioBusqueda=' + JSON.stringify(consulta));
    siguientePregunta$
      .subscribe(
        (listaPreguntas: [PreguntaInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          this.preguntasEncontradas.emit(listaPreguntas);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(
            'error',
            this._translocoService
              .translate('errores.errorTitulo'),
            this._translocoService
              .translate('errores.errorServidor'),
          );
          // Manejar errores
        }
      );
  }

}
