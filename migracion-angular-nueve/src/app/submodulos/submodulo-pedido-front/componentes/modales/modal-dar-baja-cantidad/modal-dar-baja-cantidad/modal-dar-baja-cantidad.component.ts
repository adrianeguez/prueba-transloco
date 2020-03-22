import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MASK_NUMEROS_DECIMALES} from '../../../../constantes/mascaras';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ml-modal-dar-baja-cantidad',
  templateUrl: './modal-dar-baja-cantidad.component.html',
  styleUrls: ['./modal-dar-baja-cantidad.component.scss']
})
export class ModalDarBajaCantidadComponent implements OnInit {
  mascaraNumericaDecimales = MASK_NUMEROS_DECIMALES;
  cantidadIngresada: number;
  @Output() enviarCantidadIngresada: EventEmitter<number> = new EventEmitter();

  constructor(
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialogRef<ModalDarBajaCantidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cantidadADarDeBaja }
  ) { }

  ngOnInit() {
    (<HTMLInputElement> document.getElementById('boton-aceptar')).disabled = true;
  }

  escucharCambioInput() {
    if (this.cantidadIngresada > this.data.cantidadADarDeBaja) {
      (<HTMLInputElement> document.getElementById('boton-aceptar')).disabled = true;
      this._toasterService.pop({
        type: 'warning',
        title: 'CUIDADO',
        body: `El número ingresado no puede ser mayor a ${this.data.cantidadADarDeBaja}`,
        showCloseButton: true,
      });
    } else if (this.cantidadIngresada <= this.data.cantidadADarDeBaja) {
      (<HTMLInputElement> document.getElementById('boton-aceptar')).disabled = false;
      this._toasterService.pop({
        type: 'success',
        title: 'ÉXITO',
        body: 'El número ingresado está permitido',
        showCloseButton: true,
      });
    } else {
      (<HTMLInputElement> document.getElementById('boton-aceptar')).disabled = true;
    }
  }

  enviarDatosModal() {
    this.enviarCantidadIngresada.emit(this.cantidadIngresada);
  }
}
