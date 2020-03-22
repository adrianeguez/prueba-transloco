import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TipoImpuestoInterface} from '../../../../interfaces/tipo-impuesto.interface';
import {TarifaInterface} from '../../../../interfaces/tarifa.interface';
import {TarifaRestService} from '../../../../servicios/rest/tarifa-rest.service';
import {TAMANIO_AUTOCOMPLETE} from '../../../../constantes/tamanio-input-autocomplete';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
import {ToasterService} from 'angular2-toaster';
import {NO_EXISTEN_REGISTROS} from '../../../../constantes/mensaje -sin -registros';

@Component({
  selector: 'ml-select-tarifa',
  templateUrl: './select-tarifa.component.html',
  styleUrls: ['./select-tarifa.component.scss']
})
export class SelectTarifaComponent implements OnInit {

  tamanioAutocomplete = TAMANIO_AUTOCOMPLETE;
  text: string;
  tarifas = [];
  tarifa;
  noExistenRegistros = NO_EXISTEN_REGISTROS;
  @Input() idTipoImpuesto: TipoImpuestoInterface;
  @Output() tarifaSeleccionada: EventEmitter<TarifaInterface> = new EventEmitter();

  constructor(
    private readonly _tarifaRestService: TarifaRestService,
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.text = 'Seleccione una tarifa.';
    console.log('this.idTipoImpuesto');
    console.log(this.idTipoImpuesto);
  }

  obtenerTarifa(event) {
    const query = {
      relations: ['tipoImpuesto'],
      where: {
        nombre: [`Like(\"%25${event.query.trim()}%25\")`],
        codigoSri: [`Like(\"%25${event.query.trim()}%25\")`],
        mlabOr: true,
        habilitado: 1,
        tipoImpuesto: {
          id: this.idTipoImpuesto.id
        }
      }
    };
    this._tarifaRestService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        respuesta => {
          this.tarifas = respuesta[0];
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        }
      );
  }

  enviarTarifaSeleccionado(evento) {
    console.log('this.idTipoImpuesto');
    console.log(this.idTipoImpuesto.id);
    this.tarifa = evento;
    // tslint:disable-next-line:no-unused-expression
    evento ? this.tarifaSeleccionada.emit(evento) : undefined;
  }

}
