import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {UnidadMedidaInterface} from '../../../../interfaces/unidad-medida.interface';
import {UnidadMedidaRestService} from '../../../../servicios/rest/unidad-medida-rest.service';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
import {TAMANIO_AUTOCOMPLETE} from '../../../../constantes/tamanio-input-autocomplete';
import {NO_EXISTEN_REGISTROS} from '../../../../constantes/mensaje -sin -registros';

@Component({
  selector: 'ml-select-unidad-medida',
  templateUrl: './select-unidad-medida.component.html',
  styleUrls: ['./select-unidad-medida.component.sass'],
})
export class SelectUnidadMedidaComponent implements OnInit {
  unidadesMedidas = [];
  tamanioAutocomplete = TAMANIO_AUTOCOMPLETE;
  noExistenRegistros = NO_EXISTEN_REGISTROS;
  text: string;
  @Output() unidadMedidaSeleccionado: EventEmitter<UnidadMedidaInterface> = new EventEmitter();


  constructor(
    private readonly _unidadMedidaRestService: UnidadMedidaRestService,
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.text = 'Seleccione una unidad de medida.';
  }

  obtenerUnidadesMedidas(event) {
    const query = {
      where:
        {
          nombre: `Like(\"%25${event.query.trim()}%25\")`,
          habilitado: 1,
        }
    };
    this._unidadMedidaRestService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        respuesta => {
          this.unidadesMedidas = respuesta[0];
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }

  enviarUnidadMedidaSeleccionado(valor) {
    // tslint:disable-next-line: no-unused-expression
    valor !== null
      ? this.unidadMedidaSeleccionado.emit(valor)
      : undefined;
  }
}
