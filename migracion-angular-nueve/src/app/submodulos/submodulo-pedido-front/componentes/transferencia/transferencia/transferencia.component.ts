import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BodegaInterface} from '../../../../submodulo-empresa-front/interfaces/bodega.interface';
import {
  ModalListaBodegasComponent
} from '../../../../submodulo-empresa-front/componentes/modales/modal-lista-bodegas/modal-lista-bodegas/modal-lista-bodegas.component';

import {MatDialog} from '@angular/material';
import {NgForm} from '@angular/forms';
import {NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ml-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {

  @Input()
  idEmpresa: number;

  @Input()
  bodegaOrigen: BodegaInterface;

  @Output()
  seleccionoDatosTransferencia: EventEmitter<
    DatosTransferenciaInterface
  > = new EventEmitter();

  formulario: DatosTransferenciaInterface = {
    fechaLlegada: null,
    /* observacion: null,
    numeroDocumentoGuiaRemision: null,*/
    idBodegaDestino: null,
  };

  constructor(
    public matDialog: MatDialog,
    protected configuracionesFecha: NgbDatepickerConfig
  ) {
    const anio = new Date().getFullYear();
    const mes = new Date().getMonth() + 1;
    const dia = new Date().getDate();
    configuracionesFecha.minDate = { year: anio, month: mes, day: dia};
  }

  ngOnInit() {}

  abrirModalSeleccionarBodega() {
    const dialogRef = this.matDialog.open(ModalListaBodegasComponent, {
      width: '600px',
      data: {
        idEmpresa: this.idEmpresa,
        idBodegaOrigen: this.bodegaOrigen.id,
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe(
      (bodegaSeleccionado: BodegaInterface) => {
        if (bodegaSeleccionado) {
          this.formulario.idBodegaDestino = bodegaSeleccionado;
        }
      },
      error => {
        console.log(error);
      },
    );
  }

  emitirDatosTransferencia(formularioDatosTransferencia: NgForm) {
    this.seleccionoDatosTransferencia.emit(this.formulario);
  }

  setearFechaLlegada(evento: NgbDate) {
    /* this.formulario
      .fechaLlegada = new Date(evento.year, evento.month - 1, evento.day);*/
    const mes = evento.month < 10 ? `0${evento.month}` : evento.month;
    const dia = evento.day < 10 ? `0${evento.day}` : evento.day;
    this.formulario.fechaLlegada = `${evento.year}/${mes}/${dia}`;
  }
}

export interface DatosTransferenciaInterface {
  fechaLlegada: string;
  /* observacion: string;
  numeroDocumentoGuiaRemision: string;*/
  idBodegaDestino: BodegaInterface | any;
}
