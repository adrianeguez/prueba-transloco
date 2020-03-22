import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TipoVendedorRestService} from '../../../servicios/rest/tipo-vendedor-rest.service';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';


@Component({
  selector: 'ml-select-tipo-vendedor',
  templateUrl: './select-tipo-vendedor.component.html',
  styleUrls: ['./select-tipo-vendedor.component.scss'],
})
export class SelectTipoVendedorComponent implements OnInit {
  opcionesSelect;
  tiposVendedores = [];

  @Input() idEmpresa: number | string;
  @Output() tipoVendedorSeleccionado: EventEmitter<number> = new EventEmitter();

  text;
  tipoVendedor;

  noExistenRegistros = NO_EXISTEN_REGISTROS;


  constructor(
    private readonly _tipoVendedorRestService: TipoVendedorRestService,
  ) {
  }

  ngOnInit() {
    this.text = 'Seleccione tipo vendedor';
  }

  obtenerTipoVendedorActivo(event) {
    console.log(event, ' this is event tipo vendedor activo ');
    if (event.query === '') {

      const query = {
        where: [
          {
            empresa: this.idEmpresa,
            habilitado: 1,
          }
        ],
      };

      this._tipoVendedorRestService
        .findAll('criterioBusqueda=' + JSON.stringify(query))
        .subscribe(
          respuesta => {
            this.tiposVendedores = respuesta[0];
          },
          error => {
            console.error(error);
          },
        );
    } else {
      const query = {
        where: [
          {
            nombre: `Like(\"%25${event.query.trim()}%25\")`,
            empresa: this.idEmpresa,
            habilitado: 1,
          }
        ],
      };

      this._tipoVendedorRestService
        .findAll('criterioBusqueda=' + JSON.stringify(query))
        .subscribe(
          respuesta => {
            this.tiposVendedores = respuesta[0];
          },
          error => {
            console.error(error);
          },
        );
    }
  }

  enviarTipoVendedorSeleccionado(evento) {
    console.log('evento.value');
    console.log(evento);
    this.tipoVendedorSeleccionado.emit(evento);
  }
}
