import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {EmpresaProveedorInterface} from '../../../../servicios/rest/empresa-proveedores/interfaces/empresa-proveedor.interface';

@Component({
  selector: 'ml-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrls: ['./tabla-proveedores.component.scss']
})
export class TablaProveedoresComponent implements OnInit {

  rows = NUMERO_FILAS_TABLAS;

  skip = 0;

  loading = false;

  @Input() columnas;

  @Input() totalRegistros: number;

  @Input()
  proveedores: EmpresaProveedorInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output()
  seleccionoProveedor: EventEmitter<
    EmpresaProveedorInterface
    > = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerProveedorSeleccionado(event) {
    this.seleccionoProveedor.emit(event.data);
  }

}
