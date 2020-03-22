import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LugarInterface} from '../../../interfaces/lugar-interface';
import {RutaRestService} from '../../../servicios/rest/ruta-rest.service';
import {RutaInterface} from '../../../interfaces/ruta-interface';
import {NO_EXISTEN_REGISTROS} from '@manticore-labs/ng-api';

@Component({
  selector: 'ml-select-zona',
  templateUrl: './select-zona.component.html',
  styleUrls: ['./select-zona.component.scss'],
})
export class SelectZonaComponent implements OnInit {

  noExistenRegistros = NO_EXISTEN_REGISTROS;
  placeHolder;
  @Input() nombreZona: string;
  @Input() arregloZonas;
  @Input() idLugar: any;
  @Input() idEmpresa;
  @Output() zonaSeleccionado: EventEmitter<RutaInterface> = new EventEmitter();


  constructor(private readonly _rutaRestService: RutaRestService) {
  }

  ngOnInit() {
    this.placeHolder = 'Seleccione una zona';
  }

  obtenerZonas(evento) {
    if (evento.query === '') {
      const where = {
        empresa: this.idEmpresa,
        habilitado: 1,
        lugar: this.idLugar,
      };
      this._rutaRestService.findAll('criterioBusqueda=' + JSON.stringify(where)).subscribe(r => {
        this.arregloZonas = r[0];
      });
    } else {
      const busqueda = {
        where: {
          empresa: this.idEmpresa,
          habilitado: 1,
          lugar: this.idLugar,
          nombre: `Like("%25${evento.query}%25")`
        }
      };
      this._rutaRestService
        .findAll('criterioBusqueda=' + JSON.stringify(busqueda))
        .subscribe(
          r => {
            this.arregloZonas = r[0];

          }
        );
    }
  }

  enviarZonaSeleccionado(zona) {
    this.zonaSeleccionado.emit(zona.id);
  }
}
