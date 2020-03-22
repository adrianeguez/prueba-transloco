import { Component, OnInit, ViewChild } from '@angular/core';
import { EdificioInterface } from '../../../../../../submodulo-empresa-front/interfaces/edificio.interface';
import { MatDialogRef } from '@angular/material';
import { FilterPisosComponent } from '../../../componentes/filters/filter-pisos/filter-pisos/filter-pisos.component';
import { PisoInterface } from '../../../../../../submodulo-empresa-front/interfaces/piso.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'app-modal-lista-pisos',
  templateUrl: './modal-lista-pisos.component.html',
  styleUrls: ['./modal-lista-pisos.component.scss'],
})
export class ModalListaPisosComponent implements OnInit {
  @ViewChild(FilterPisosComponent, { static: true })
  filterPisosComponent: FilterPisosComponent;

  totalRegistros: number;

  pisosEncontrados: PisoInterface[] = [];

  columnas = [{ field: 'nombre', header: 'Nombre' }];

  constructor(
    public dialogo: MatDialogRef<ModalListaPisosComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearEdificio(edificio: [EdificioInterface[], number]) {
    this.pisosEncontrados = edificio[0];
    this.totalRegistros = edificio[1];
  }

  setearSkip(skip) {
    this.filterPisosComponent.skip = skip;
    this.filterPisosComponent.buscarPiso();
  }

  obtenerEdificio(eventoEdificio: EdificioInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoEdificio);
    this._cargandoService.deshabilitarCargando();
  }
}
