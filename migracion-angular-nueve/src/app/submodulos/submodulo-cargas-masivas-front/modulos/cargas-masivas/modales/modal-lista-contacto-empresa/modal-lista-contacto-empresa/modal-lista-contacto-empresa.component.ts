import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FilterContactoEmpresaComponent } from '../../../componentes/filters/filter-contacto-empresa/filter-contacto-empresa/filter-contacto-empresa.component';
import { ContactoEmpresaInterface } from '../../../../../../submodulo-empresa-front/interfaces/contacto-empresa.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-contacto-empresa',
  templateUrl: './modal-lista-contacto-empresa.component.html',
  styleUrls: ['./modal-lista-contacto-empresa.component.scss'],
})
export class ModalListaContactoEmpresaComponent implements OnInit {
  @ViewChild(FilterContactoEmpresaComponent, { static: true })
  filterContactoEmpresaComponent: FilterContactoEmpresaComponent;

  totalRegistros: number;

  contactosEmpresaEncontrados: ContactoEmpresaInterface[] = [];

  columnas = [
    { field: 'nombreComercial', header: 'Empresa' },
    { field: 'nombres', header: 'Datos usuario' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaContactoEmpresaComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearContatosEmpresa(articulo: [ContactoEmpresaInterface[], number]) {
    this.contactosEmpresaEncontrados = articulo[0];
    this.totalRegistros = articulo[1];
  }

  setearSkip(skip) {
    this.filterContactoEmpresaComponent.skip = skip;
    this.filterContactoEmpresaComponent.buscarContactoEmpresaPorEmpresa();
  }

  obtenerContactoEmpresaSeleccionado(
    eventoContatoEmpresa: ContactoEmpresaInterface,
  ) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoContatoEmpresa);
    this._cargandoService.deshabilitarCargando();
  }
}
