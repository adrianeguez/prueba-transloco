import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {
  ModalListaEmpresaProveedorComponent
// tslint:disable-next-line:max-line-length
} from '../../../../submodulo-empresa-front/componentes/modales/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor/modal-lista-empresa-proveedor.component';
import {EmpresaProveedoresInterface} from '../../../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';
import {
  COLUMNAS_COMPRA_DEVOLUCION_PROVEEDORES,
  COLUMNAS_FACTURA_DEVOLUCION_CLIENTES,
  COLUMNAS_INGRESO_EGRESO, COLUMNAS_PEDIDOS_COMPRA, COLUMNAS_TRANSFERENCIAS_BODEGA
} from '../../../constantes/columnas-tablas';

@Component({
  selector: 'ml-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.sass']
})
export class ProveedorComponent implements OnInit {
  @Output() eventoEmpresaProveedorSeleccionado: EventEmitter<
    EmpresaProveedoresInterface> = new EventEmitter();

  @Output() eventoEnviarColumnas: EventEmitter<any> = new EventEmitter();

  proveedorSeleccionado: EmpresaProveedoresInterface;

  ingresoEgreso = COLUMNAS_INGRESO_EGRESO;

  compraDevolucionProveedores = COLUMNAS_COMPRA_DEVOLUCION_PROVEEDORES;

  facturaDevolucionClientes = COLUMNAS_FACTURA_DEVOLUCION_CLIENTES;

  transferenciaBodegas = COLUMNAS_TRANSFERENCIAS_BODEGA;

  pedidoCompra = COLUMNAS_PEDIDOS_COMPRA;

  constructor(
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.eventoEnviarColumnas.emit(this.compraDevolucionProveedores);
  }

  abrirModalProveedor() {
    const dialogRef = this.dialog.open(ModalListaEmpresaProveedorComponent, {
      width: '1000px',
      data: {
        idEmpresa: 1
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((proveedorSelecionado: EmpresaProveedoresInterface) => {
        if (proveedorSelecionado) {
          this.proveedorSeleccionado = proveedorSelecionado;
          this.eventoEmpresaProveedorSeleccionado.emit(proveedorSelecionado);
        }
      },
      error => {
        console.error(error);
      },
    );
  }
}
