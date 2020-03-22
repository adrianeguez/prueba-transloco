import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { EmpresaProveedoresInterface } from '../../../../interfaces/empresa-proveedores.interface';

@Component({
  selector: 'ml-tabla-empresas-proveedores',
  templateUrl: './tabla-empresas-proveedores.component.html',
  styleUrls: ['./tabla-empresas-proveedores.component.sass'],
})
export class TablaEmpresasProveedoresComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() empresasProveedoresEncontradas: EmpresaProveedoresInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() empresaProveedorSeleccionado: EventEmitter<
    EmpresaProveedoresInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerEmpresaProveedorSeleccionado(event) {
    this.empresaProveedorSeleccionado.emit(event.data);
  }
}
