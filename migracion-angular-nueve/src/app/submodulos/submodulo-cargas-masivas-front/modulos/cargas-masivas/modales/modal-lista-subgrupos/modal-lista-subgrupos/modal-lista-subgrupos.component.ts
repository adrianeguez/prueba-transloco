import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FilterSubgruposComponent } from '../../../componentes/filters/filter-subgrupos/filter-subgrupos/filter-subgrupos.component';
import { SubgrupoInterface } from '../../../../../../submodulo-articulos-front/interfaces/subgrupo.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-subgrupos',
  templateUrl: './modal-lista-subgrupos.component.html',
  styleUrls: ['./modal-lista-subgrupos.component.scss'],
})
export class ModalListaSubgruposComponent implements OnInit {
  @ViewChild(FilterSubgruposComponent, { static: true })
  filterSubgruposComponent: FilterSubgruposComponent;

  totalRegistros: number;

  subgruposEncontrados: SubgrupoInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaSubgruposComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearSubgrupos(subgrupos: [SubgrupoInterface[], number]) {
    this.subgruposEncontrados = subgrupos[0];
    this.totalRegistros = subgrupos[1];
  }

  setearSkip(skip) {
    this.filterSubgruposComponent.skip = skip;
    this.filterSubgruposComponent.buscarSubgrupo();
  }

  obtenerSubgrupo(eventoSubgrupo: SubgrupoInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoSubgrupo);
    this._cargandoService.deshabilitarCargando();
  }
}
