import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LugarInterface} from '../../../interfaces/lugar-interface';
import {LugarRestService} from '../../../servicios/rest/lugar-rest.service';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {generarToasterErrorConMensaje} from '../../../constantes/mensajes-toast';

@Component({
  selector: 'ml-select-ciudad',
  templateUrl: './select-ciudad.component.html',
  styleUrls: ['./select-ciudad.component.scss'],
})
export class SelectCiudadComponent implements OnInit {
  text;
  ciudad;
  lugares = [];

  noExistenRegistros = NO_EXISTEN_REGISTROS;


  @Output() ciudadSeleccionado: EventEmitter<LugarInterface> = new EventEmitter();
  @Output() mostrarZona: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _lugarRestService: LugarRestService,
    private readonly  _toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.text = 'Seleccione lugar';

  }

  obtenerCiudadZonas(evento) {
    this._cargandoService.habilitarCargando();
    let lugares$;
    if (evento.query === '') {
      lugares$ = this._lugarRestService.obtenerNodosFinales(1);
    } else {
      lugares$ = this._lugarRestService.obtenerNodosFinales(evento.query);
    }
    lugares$.subscribe(
      (lugares: any[]) => {
        this.lugares = lugares;
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(
          generarToasterErrorConMensaje('Revisa tu conexion o intentalo mas tarde')
        );
        // Manejar errores
      },
    );
  }

  enviarCiudadSeleccionado(evento) {
    this.ciudadSeleccionado.emit(evento);
    this.mostrarZona.emit(true);
  }

  ocultarZona() {
    this.mostrarZona.emit(false);
  }
}
