import {Component, Input, OnInit} from '@angular/core';
import {TIPO_FACTURA} from '../../../constantes/tipo-factura';
import {TipoFacturaInterface} from '../../../interfaces/tipo-factura.interface';
import {EmpresaProveedoresInterface} from '../../../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';
import {MovimientoInterface} from '../../../interfaces/movimiento.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {ModalListaMovimientoComponent} from '../../modales/modal-lista-movimiento/modal-lista-movimiento/modal-lista-movimiento.component';

@Component({
    selector: 'ml-tipo-movimiento',
    templateUrl: './tipo-movimiento.component.html',
    styleUrls: ['./tipo-movimiento.component.sass']
})
export class TipoMovimientoComponent implements OnInit {

  @Input() proveedorSeleccionado: EmpresaProveedoresInterface;
  @Input() movimientoSeleccionado: MovimientoInterface;
  tiposFacturas: TipoFacturaInterface[];
  tipoFacturaSeleccionada: TipoFacturaInterface;

  constructor(
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    this.tiposFacturas = TIPO_FACTURA;
  }

  ngOnInit() {
  }

  abrirModalMovimiento() {
    const dialogRef = this.dialog.open(ModalListaMovimientoComponent, {
      width: '600px'
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((movimientoSeleccionado: MovimientoInterface) => {
      if (movimientoSeleccionado) {
        this.movimientoSeleccionado = movimientoSeleccionado;
      }
    }, error => {
      console.error(error);
    });
  }
}
