import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DiapositivaFormateadaInterface} from '../../interfaces/diapositiva.formateada.interface';

@Component({
  selector: 'app-barra-diapositivas',
  templateUrl: './barra-diapositivas.component.html',
  styleUrls: ['./barra-diapositivas.component.scss']
})
export class BarraDiapositivasComponent implements OnInit {
  @Input()
  diapositivas: DiapositivaFormateadaInterface[] = [];
  @Output()
  diapositivaEmitter: EventEmitter<DiapositivaFormateadaInterface> = new EventEmitter<DiapositivaFormateadaInterface>();
  @Input()
  idDiapositivaActual: number;
  constructor() {
  }

  ngOnInit() {
  }

  emitirDiapositiva(diapostiva: DiapositivaFormateadaInterface) {
    this.idDiapositivaActual = diapostiva.id;
    this.diapositivaEmitter.emit(diapostiva);
  }

}
