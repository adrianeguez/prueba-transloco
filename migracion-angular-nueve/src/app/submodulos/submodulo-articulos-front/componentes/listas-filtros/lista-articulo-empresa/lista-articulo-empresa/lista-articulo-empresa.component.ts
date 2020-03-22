import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
// tslint:disable-next-line: max-line-length
import { FilterArticuloEmpresaComponent } from './../../../filters/filter-articulo-empresa/filter-articulo-empresa/filter-articulo-empresa.component';

@Component({
  selector: 'ml-lista-articulo-empresa',
  templateUrl: './lista-articulo-empresa.component.html',
  styleUrls: ['./lista-articulo-empresa.component.scss'],
})
export class ListaArticuloEmpresaComponent implements OnInit {
  @ViewChild(FilterArticuloEmpresaComponent, { static: true })
  filterArticuloEmpresa: FilterArticuloEmpresaComponent;

  totalRegistros: number;

  articulosEncontradas: ArticuloInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
  ];

  @Output() articulosSeleccionado: EventEmitter<
    ArticuloInterface[]
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  setearArticulosEmpresa(articulosProveedores: [ArticuloInterface[], number]) {
    this.articulosEncontradas = articulosProveedores[0];
    this.totalRegistros = articulosProveedores[1];
  }

  setearSkip(skip) {
    this.filterArticuloEmpresa.skip = skip;
    this.filterArticuloEmpresa.buscarPorNombreCodigoEstado();
  }

  obtenreArticuloEmpresaSeleccionado(eventoArticulo: ArticuloInterface[]) {
    this.articulosSeleccionado.emit(eventoArticulo);
  }
}
