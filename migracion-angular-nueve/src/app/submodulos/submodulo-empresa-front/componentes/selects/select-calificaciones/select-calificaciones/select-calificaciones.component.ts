import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OPCIONES_CALIFICACIONES} from '../../../../constantes/opciones-calificaciones';

@Component({
  selector: 'ml-select-calificaciones',
  templateUrl: './select-calificaciones.component.html',
  styleUrls: ['./select-calificaciones.component.scss']
})
export class SelectCalificacionesComponent implements OnInit {

  opcionesCalificaciones = OPCIONES_CALIFICACIONES;

  @Output() calificacionSeleccionada: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  enviarOpcionSeleccionada(evento: any) {
    this.calificacionSeleccionada.emit(
      evento.value !== null ? evento.value : undefined
    );
  }
}
