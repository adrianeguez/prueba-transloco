import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BodegaInterface } from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';

@Component({
  selector: 'mlab-modal-ingresar-cabecera-movimiento-transferencias',
  templateUrl:
    './modal-ingresar-cabecera-movimiento-transferencias.component.html',
  styleUrls: [
    './modal-ingresar-cabecera-movimiento-transferencias.component.scss',
  ],
})
export class ModalIngresarCabeceraMovimientoTransferenciasComponent
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<
      ModalIngresarCabeceraMovimientoTransferenciasComponent
    >,
    @Inject(MAT_DIALOG_DATA)
    public data: { bodegaOrigen: BodegaInterface; idEmpresa: number },
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  cerrarModal(datosTransferencia) {
    this.dialogo.close(datosTransferencia);
  }
}
