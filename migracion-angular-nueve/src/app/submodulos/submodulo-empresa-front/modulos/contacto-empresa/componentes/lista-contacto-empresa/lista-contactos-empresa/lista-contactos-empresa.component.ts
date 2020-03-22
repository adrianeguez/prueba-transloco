import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterContactosEmpresaComponent} from '../../filter-contacto-empresa/filter-contactos-empresa/filter-contactos-empresa.component';
import {ContactoEmpresaInterface} from '../../../../../interfaces/contacto-empresa.interface';
import {ContactoEmpresaRestService} from '../../../../../servicios/rest/contacto-empresa-rest.service';
import {TranslocoService} from '@ngneat/transloco';
import {traducirColumnas} from '../../../../../../../funciones/traducir-columnas';

@Component({
  selector: 'ml-lista-contactos-empresa',
  templateUrl: './lista-contactos-empresa.component.html',
  styleUrls: ['./lista-contactos-empresa.component.scss']
})
export class ListaContactosEmpresaComponent implements OnInit {

  @ViewChild(FilterContactosEmpresaComponent, {static: true})
  filterContacto: FilterContactosEmpresaComponent;

  @Input() idEmpresa: number;
  totalRegistros: number;

  contactosEncontrados: ContactoEmpresaInterface[] = [];
  rutaTraduccion;

  columnas = [
    {field: 'datosUsuario.nombres', header: 'Nombre', llaveATraducir: 'nombre', traduccion: ''},
    {field: 'datosUsuario.apellidos', header: 'Apellido', llaveATraducir: 'apellido', traduccion: ''},
    {field: 'tipoCargo.nombre', header: 'Cargo', llaveATraducir: 'cargo', traduccion: ''},
  ];
  @Output() contactosSeleccionados: EventEmitter<ContactoEmpresaInterface[]> = new EventEmitter();

  constructor(
    private readonly _contactoEmpresaRestService: ContactoEmpresaRestService,
    protected readonly _translocoService: TranslocoService,
  ) {
    this.rutaTraduccion = 'submoduloEmpresa.moduloContactoEmpresa.componentes.listacontactosEmpresa';
  }

  ngOnInit() {
    traducirColumnas(this._translocoService, `${this.rutaTraduccion}.tablas`, this.columnas);
  }

  setearPreguntas(contactos: [ContactoEmpresaInterface[], number]) {
    this.contactosEncontrados = contactos[0];
    this.totalRegistros = contactos[1];
  }

  setearSkip(skip) {
    this.filterContacto.skip = skip;
    this.filterContacto.buscarContactoPorNombreOIdentificacion('');
  }

  obtenerContactosSeleccionadas(evento: ContactoEmpresaInterface[]) {
    // console.log('evento lista', evento);
    this.contactosSeleccionados.emit(evento);
  }

}
