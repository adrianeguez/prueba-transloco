import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mlab-modal-seleccionar-establecimiento',
  templateUrl: './modal-seleccionar-establecimiento.component.html',
  styleUrls: ['./modal-seleccionar-establecimiento.component.scss'],
})
export class ModalSeleccionarEstablecimientoComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalSeleccionarEstablecimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { establecimientos: any[] },
  ) {}

  ngOnInit() {}

  seleccionarEstablecimiento(establecimiento) {
    this.dialogo.close(establecimiento);
  }
}
