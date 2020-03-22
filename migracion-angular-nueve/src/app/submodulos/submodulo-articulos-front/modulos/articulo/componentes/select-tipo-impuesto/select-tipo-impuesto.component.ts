import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TipoImpuestoRestService} from '../../../../servicios/rest/tipo-impuesto-rest.service';
import {TipoImpuestoInterface} from '../../../../interfaces/tipo-impuesto.interface';
import {TAMANIO_AUTOCOMPLETE} from '../../../../constantes/tamanio-input-autocomplete';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
import {ToasterService} from 'angular2-toaster';
import {NO_EXISTEN_REGISTROS} from '../../../../constantes/mensaje -sin -registros';


@Component({
  selector: 'ml-select-tipo-impuesto',
  templateUrl: './select-tipo-impuesto.component.html',
  styleUrls: ['./select-tipo-impuesto.component.sass'],
})
export class SelectTipoImpuestoComponent implements OnInit {

  tamanioAutocomplete = TAMANIO_AUTOCOMPLETE;
  text: string;
  noExistenRegistros = NO_EXISTEN_REGISTROS;
  tiposImpuestos = [];
  @Output() tipoImpuestoSeleccionado: EventEmitter<TipoImpuestoInterface> = new EventEmitter();

  constructor(
    private readonly _tipoImpuestoRestService: TipoImpuestoRestService,
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.text = 'Seleccione un tipo de impuesto.';
  }

  obtenerTiposImpuesto(event) {
    const query = {
      where:  {
        nombre: [`Like(\"%25${event.query.trim()}%25\")`],
        siglas: [`Like(\"%25${event.query.trim()}%25\")`],
        mlabOr: true,
        habilitado: 1,
      }
    };
    this._tipoImpuestoRestService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        respuesta => {
          this.tiposImpuestos = respuesta[0];
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }

  enviarTipoImpuestoSeleccionado(evento) {
    // tslint:disable-next-line:no-unused-expression
    evento ? this.tipoImpuestoSeleccionado.emit(evento) : undefined;
  }
}
