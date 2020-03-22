import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FilterGruposComponent } from '../../../componentes/filters/filter-grupos/filter-grupos/filter-grupos.component';
import { GrupoInterface } from '../../../../../../submodulo-articulos-front/interfaces/grupo.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'app-modal-lista-grupos',
  templateUrl: './modal-lista-grupos.component.html',
  styleUrls: ['./modal-lista-grupos.component.scss'],
})
export class ModalListaGruposComponent implements OnInit {
  @ViewChild(FilterGruposComponent, { static: true })
  filterGruposComponent: FilterGruposComponent;

  totalRegistros: number;

  gruposEncontrados: GrupoInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaGruposComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearGrupos(grupos: [GrupoInterface[], number]) {
    this.gruposEncontrados = grupos[0];
    this.totalRegistros = grupos[1];
  }

  setearSkip(skip) {
    this.filterGruposComponent.skip = skip;
    this.filterGruposComponent.buscarGrupo();
  }

  obtenerGrupo(eventoGrupo: GrupoInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoGrupo);
    this._cargandoService.deshabilitarCargando();
  }
}
