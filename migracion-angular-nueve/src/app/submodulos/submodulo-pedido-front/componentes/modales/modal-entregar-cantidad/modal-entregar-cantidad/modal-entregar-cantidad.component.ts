import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MASK_NUMEROS_DECIMALES} from '../../../../constantes/mascaras';
import {ToasterService} from 'angular2-toaster';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'ml-modal-entregar-cantidad',
  templateUrl: './modal-entregar-cantidad.component.html',
  styleUrls: ['./modal-entregar-cantidad.component.scss']
})
export class ModalEntregarCantidadComponent implements OnInit {
  mascaraNumericaDecimales = MASK_NUMEROS_DECIMALES;
  cantidadIngresada: number;
  @Output() enviarCantidadIngresada: EventEmitter<number> = new EventEmitter();

  constructor(
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialogRef<ModalEntregarCantidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cantidadAEntregar }
  ) { }

  ngOnInit() {
    (<HTMLInputElement> document.getElementById('boton-aceptar')).disabled = true;
  }

  escucharCambioInput() {
    if (this.cantidadIngresada > this.data.cantidadAEntregar) {
      (<HTMLInputElement> document.getElementById('boton-aceptar')).disabled = true;
      this._toasterService.pop({
        type: 'warning',
        title: 'CUIDADO',
        body: `El número ingresado no puede ser mayor a ${this.data.cantidadAEntregar}`,
        showCloseButton: true,
      });
    } else if (this.cantidadIngresada <= this.data.cantidadAEntregar) {
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
