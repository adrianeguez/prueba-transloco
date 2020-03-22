import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PeriodoVentaRestService} from '../../../../servicios/rest/periodo-venta-rest.service';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {toastErrorCargarDatos} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-select-periodo-venta',
  templateUrl: './select-periodo-venta.component.html',
  styleUrls: ['./select-periodo-venta.component.scss'],
})
export class SelectPeriodoVentaComponent implements OnInit {
  opcionesSelect;
  periodosVenta = [];
  text;


  noExistenRegistros = NO_EXISTEN_REGISTROS;


  @Input() idEmpresa: number | string;
  @Output() periodoVentaSeleccionado: EventEmitter<number> = new EventEmitter();

  constructor(
    private readonly _periodoVentaRestService: PeriodoVentaRestService,
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.text = 'Seleccione periodo venta';
    this.obtenerPeriodoVentaActivo();
  }

  obtenerPeriodoVentaActivo() {
    const where = {
      empresa: this.idEmpresa,
      habilitado: 1,
    };
    this._periodoVentaRestService
      .findAll('criterioBusqueda=' + JSON.stringify(where))
      .subscribe(respuesta => {
          this.periodosVenta = respuesta[0].map(resp => {
            const formatoDrowpSelect = {
              label: resp.nombre,
              value: resp,
            };
            return formatoDrowpSelect;
          });
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorCargarDatos);
        }
      );
  }

  buscarPeriodosVenta(event) {
    if (event.query === '') {
      const query = {
        where: [
          {
            empresa: this.idEmpresa,
            habilitado: 1,
          }
        ],
      };
      this._periodoVentaRestService.findAll('criterioBusqueda=' + JSON.stringify(query))
        .subscribe(
          respuesta => {
            this.periodosVenta = respuesta[0];
          },
          error => {
            console.error(error);
            this._toasterService.pop(toastErrorCargarDatos);
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
            this.periodosVenta = respuesta[0];
          },
          error => {
            console.error(error);
            this._toasterService.pop(toastErrorCargarDatos);
          },
        );
    }
  }

  enviarPeriodoVentaSeleccionado(evento) {
    this.periodoVentaSeleccionado.emit(evento);
  }
}
