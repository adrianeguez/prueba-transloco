import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilterArticulosComponent } from '../../../componentes/filters/filter-articulos/filter-articulos/filter-articulos.component';
import { ArticuloInterface } from '../../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-articulos-cargas-masivas',
  templateUrl: './modal-lista-articulos.component.html',
  styleUrls: ['./modal-lista-articulos.component.scss'],
})
export class ModalListaArticulosComponent implements OnInit {
  @ViewChild(FilterArticulosComponent, { static: true })
  filterArticulosCargasMasivasComponent: FilterArticulosComponent;

  totalRegistros: number;

  articulosEncontrados: ArticuloInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaArticulosComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearArticulos(articulo: [ArticuloInterface[], number]) {
    this.articulosEncontrados = articulo[0];
    this.totalRegistros = articulo[1];
  }

  setearSkip(skip) {
    this.filterArticulosCargasMasivasComponent.skip = skip;
    this.filterArticulosCargasMasivasComponent.buscarArticuloPorNombreCodigoEstado();
  }

  obtenerArticuloSeleccionado(eventoArticulo: ArticuloInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoArticulo);
    this._cargandoService.deshabilitarCargando();
  }
}
