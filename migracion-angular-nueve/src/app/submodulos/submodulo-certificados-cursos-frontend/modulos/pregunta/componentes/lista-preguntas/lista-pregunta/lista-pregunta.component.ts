import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterPreguntaComponent} from '../../filter-preguntas/filter-pregunta/filter-pregunta.component';
import {PreguntaInterface} from '../../../interfaces/pregunta.interface';
import {PreguntaRestService} from '../../../servicios/rest/pregunta-rest.service';
import {TranslocoService} from '@ngneat/transloco';
import {traducirColumnas} from '../../../../../../../funciones/traducir-columnas';

@Component({
  selector: 'ml-lista-pregunta',
  templateUrl: './lista-pregunta.component.html',
  styleUrls: ['./lista-pregunta.component.scss']
})
export class ListaPreguntaComponent implements OnInit {

  @ViewChild(FilterPreguntaComponent, {static: true})
  filterPregunta: FilterPreguntaComponent;

  @Input() idModuloCurso: number;
  totalRegistros: number;

  preguntasEncontradas: PreguntaInterface[] = [];

  columnas = [
    {
      field: 'descripcion',
      header: 'Descripcion',
      llaveATraducir: 'descripcion',
      traduccion: ''
    },
    {
      field: 'valor',
      header: 'Valor',
      llaveATraducir: 'valor',
      traduccion: ''
    },
  ];
  @Output() preguntasSeleccionadas: EventEmitter<PreguntaInterface[]> = new EventEmitter();
  private rutaTraduccion: string;

  constructor(
    private readonly _preguntaRestService: PreguntaRestService,
    private readonly _translocoService: TranslocoService,
  ) {
    this.rutaTraduccion = 'submoduloCertificadosCuros.pregunta.rutas.rutaGestionPregunta';
  }

  ngOnInit() {
    traducirColumnas(this._translocoService, this.rutaTraduccion + '.tablas', this.columnas);
  }

  setearPreguntas(preguntas: [PreguntaInterface[], number]) {
    this.preguntasEncontradas = preguntas[0];
    this.totalRegistros = preguntas[1];
  }

  setearSkip(skip) {
    this.filterPregunta.skip = skip;
    this.filterPregunta.buscarPreguntaPorDescripcion('');
  }

  obtenerPreguntasSeleccionadas(evento: PreguntaInterface[]) {
    this.preguntasSeleccionadas.emit(evento);
  }

}
