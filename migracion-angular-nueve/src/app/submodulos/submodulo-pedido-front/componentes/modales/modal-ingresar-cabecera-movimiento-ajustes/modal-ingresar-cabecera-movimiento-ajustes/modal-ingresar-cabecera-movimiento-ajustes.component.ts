import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {DatosAjustesInterface} from '../../../ajustes/ajustes/ajustes.component';

@Component({
  selector: 'mlab-modal-ingresar-cabecera-movimiento-ajustes',
  templateUrl: './modal-ingresar-cabecera-movimiento-ajustes.component.html',
  styleUrls: ['./modal-ingresar-cabecera-movimiento-ajustes.component.scss'],
})
export class ModalIngresarCabeceraMovimientoAjustesComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalIngresarCabeceraMovimientoAjustesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipoAjuste, empresaId }
  ) {
  }

  ngOnInit() {
  }

  seleccionoDatosDeComrpra() {

  }

  cerrarModal(datosCompra: DatosAjustesInterface) {
    this.dialogo.close(datosCompra);
  }
}
