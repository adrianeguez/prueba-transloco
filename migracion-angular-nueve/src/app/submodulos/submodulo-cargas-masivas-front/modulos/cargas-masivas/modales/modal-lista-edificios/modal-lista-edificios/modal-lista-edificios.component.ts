import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FilterEdificioComponent } from '../../../componentes/filters/filter-edificio/filter-edificio/filter-edificio.component';
import { EdificioInterface } from '../../../../../../submodulo-empresa-front/interfaces/edificio.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-edificios',
  templateUrl: './modal-lista-edificios.component.html',
  styleUrls: ['./modal-lista-edificios.component.scss'],
})
export class ModalListaEdificiosComponent implements OnInit {
  @ViewChild(FilterEdificioComponent, { static: true })
  filterEdificioComponent: FilterEdificioComponent;

  totalRegistros: number;

  edificiosEncontrados: EdificioInterface[] = [];

  columnas = [{ field: 'nombre', header: 'Nombre' }];

  constructor(
    public dialogo: MatDialogRef<ModalListaEdificiosComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearEdificio(edificio: [EdificioInterface[], number]) {
    this.edificiosEncontrados = edificio[0];
    this.totalRegistros = edificio[1];
  }

  setearSkip(skip) {
    this.filterEdificioComponent.skip = skip;
    this.filterEdificioComponent.buscarEdificio();
  }

  obtenerEdificio(eventoEdificio: EdificioInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoEdificio);
    this._cargandoService.deshabilitarCargando();
  }
}
