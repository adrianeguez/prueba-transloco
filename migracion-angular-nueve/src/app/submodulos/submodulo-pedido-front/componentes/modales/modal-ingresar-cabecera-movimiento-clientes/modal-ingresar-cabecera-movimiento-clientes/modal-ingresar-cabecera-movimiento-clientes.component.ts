import {Component, Inject, OnInit} from '@angular/core';
import {DatosCompraInterface} from '../../../compra/compra/compra.component';
import {DatosClientesInterface} from '../../../clientes/clientes/clientes.component';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MovimientoInterface} from '../../../../../submodulo-empresa-front/interfaces/movimiento.interface';

@Component({
  selector: 'mlab-modal-ingresar-cabecera-movimiento-clientes',
  templateUrl: './modal-ingresar-cabecera-movimiento-clientes.component.html',
  styleUrls: ['./modal-ingresar-cabecera-movimiento-clientes.component.scss'],
})
export class ModalIngresarCabeceraMovimientoClientesComponent
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalIngresarCabeceraMovimientoClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { datosCliente: DatosClientesInterface },

  ) { }

  ngOnInit() {}

  cerrarModal(datosCompra: DatosClientesInterface) {
    this.dialogo.close(datosCompra);
  }
}
