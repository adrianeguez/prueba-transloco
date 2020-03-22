import { ArticuloProveedorInterface } from '../../../../interfaces/articulo-proveedor.interface';
// tslint:disable-next-line: max-line-length
import { FilterArticuloProveedorComponent } from './../../../filters/filter-articulo-proveedor/filter-articulo-proveedor/filter-articulo-proveedor.component';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ml-lista-articulo-proveedor',
  templateUrl: './lista-articulo-proveedor.component.html',
  styleUrls: ['./lista-articulo-proveedor.component.scss'],
})
export class ListaArticuloProveedorComponent implements OnInit {
  @ViewChild(FilterArticuloProveedorComponent, { static: true })
  filterArticuloProveedor: FilterArticuloProveedorComponent;

  @Input() idEmpresaProveedor;

  totalRegistros: number;

  articulosProveedoresEncontradas: ArticuloProveedorInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
  ];

  @Input() mostrarSelectEstado = false;

  @Output() articulosProveedorSeleccionado: EventEmitter<
    ArticuloProveedorInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  setearArticulosProveedores(
    articulosProveedores: [ArticuloProveedorInterface[], number],
  ) {
    this.articulosProveedoresEncontradas = articulosProveedores[0];
    this.totalRegistros = articulosProveedores[1];
  }

  setearSkip(skip) {
    this.filterArticuloProveedor.skip = skip;
  }

  obtenreArticuloProveedorSeleccionado(
    eventoArticuloProveedor: ArticuloProveedorInterface,
  ) {
    this.articulosProveedorSeleccionado.emit(eventoArticuloProveedor);
  }
}
