import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mlab-modal-seleccionar-operario',
  templateUrl: './modal-seleccionar-operario.component.html',
  styleUrls: ['./modal-seleccionar-operario.component.scss'],
})
export class ModalSeleccionarOperarioComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalSeleccionarOperarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { operarios: any[]; establecimiento },
  ) {}

  ngOnInit() {}

  seleccionarOperario(operario) {
    this.dialogo.close({ operario });
  }

  cambiarEstablecimiento() {
    this.dialogo.close({ cambiarEstablecimiento: true });
  }
}
