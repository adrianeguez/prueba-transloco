import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../../../enums/estados';
import { ContactoEmpresaInterface } from '../../../../../../../submodulo-empresa-front/interfaces/contacto-empresa.interface';

@Component({
  selector: 'ml-tabla-contacto-empresa',
  templateUrl: './tabla-contacto-empresa.component.html',
  styleUrls: ['./tabla-contacto-empresa.component.scss'],
})
export class TablaContactoEmpresaComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() contatosEmpresaEncontrados: ContactoEmpresaInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() contactoEmpresaSeleccionado: EventEmitter<
    ContactoEmpresaInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerContactoEmpresaSeleccionado(event) {
    this.contactoEmpresaSeleccionado.emit(event.data);
  }
}
