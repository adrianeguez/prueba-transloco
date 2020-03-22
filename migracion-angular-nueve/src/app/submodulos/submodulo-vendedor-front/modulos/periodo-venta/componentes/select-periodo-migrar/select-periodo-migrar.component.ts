import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PeriodoVentaRestService} from '../../../../servicios/rest/periodo-venta-rest.service';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';
import {toastExitoCargarDatos} from '../../../../../../constantes/mensajes-toaster';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ml-select-periodo-migrar',
  templateUrl: './select-periodo-migrar.component.html',
  styleUrls: ['./select-periodo-migrar.component.scss']
})
export class SelectPeriodoMigrarComponent implements OnInit {

  @Input() idEmpresa: number | string;
  @Input() fechaBuscar: string;
  @Output() periodoVentaMigrarSeleccionado: EventEmitter<any> = new EventEmitter();

  noExistenRegistros = NO_EXISTEN_REGISTROS;



  periodosVentaAmigrar = [];
  text;

  constructor(
    private readonly _periodoVentaRestService: PeriodoVentaRestService,
    private readonly _toasterService: ToasterService,
  ) { }


  ngOnInit() {
    this.text = 'Seleccione periodo venta';
  }

  buscarPeriodosVenta(event) {
    if (event.query === '') {

      const query = {
        where: [
          {
            fechaInicio: `MoreThan("${this.fechaBuscar}")`,
            empresa: this.idEmpresa,

          }
        ],
      };
      this._periodoVentaRestService.findAll('criterioBusqueda=' + JSON.stringify(query))
        .subscribe(
          respuesta => {
            this.periodosVentaAmigrar = respuesta[0];
          },
          error => {
            console.log(error);
            this._toasterService.pop(toastExitoCargarDatos);
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
      this._periodoVentaRestService.findAll('criterioBusqueda=' + JSON.stringify(query))
        .subscribe(
          respuesta => {
            this.periodosVentaAmigrar = respuesta[0];
          },
          error => {
            console.log(error);
            this._toasterService.pop(toastExitoCargarDatos);
          },
        );
    }
  }

  enviarPeriodoVentaSeleccionado(evento) {
    this.periodoVentaMigrarSeleccionado.emit(evento);
  }


}
