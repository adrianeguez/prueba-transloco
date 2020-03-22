import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ModalBuscarClienteComponent } from '../../modales/modal-buscar-cliente/modal-buscar-cliente/modal-buscar-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { InformacionTributariaInterface } from '../../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';

@Component({
  selector: 'mlab-buscar-cliente-proveedor',
  templateUrl: './buscar-cliente-proveedor.component.html',
  styleUrls: ['./buscar-cliente-proveedor.component.scss'],
})
export class BuscarClienteProveedorComponent implements OnInit {
  @Output()
  informacionTributariaSeleccionada: EventEmitter<
    InformacionTributariaInterface
  > = new EventEmitter();

  @Input() esVenta: boolean;

  @Input() informacionTributaria: InformacionTributariaInterface;
  constructor(
    public matDialog: MatDialog,
  ) {
  }
  ngOnInit() {
  }

  abrirModalSeleccionarCliente() {
    const dialogRef = this.matDialog.open(ModalBuscarClienteComponent, {
      width: '1200px',
      data: {
        esVenta: this.esVenta,
        informacionTributaria: this.informacionTributaria,
      }
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe(
      (informacionTributaria: any) => {
        if (informacionTributaria) {
          this.informacionTributariaSeleccionada.emit(informacionTributaria);
        }
      },
      error => {
        console.log(error);
      },
    );
  }
}
