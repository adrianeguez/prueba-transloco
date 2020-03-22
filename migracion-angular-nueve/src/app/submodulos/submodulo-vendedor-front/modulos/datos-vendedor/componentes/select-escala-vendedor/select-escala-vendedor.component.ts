import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EscalaVendedorRestService } from '../../../../servicios/rest/escala-vendedor-rest.service';
import {ToasterService} from 'angular2-toaster';
import {toastErrorCargarDatos} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-select-escala-vendedor',
  templateUrl: './select-escala-vendedor.component.html',
  styleUrls: ['./select-escala-vendedor.component.scss'],
})
export class SelectEscalaVendedorComponent implements OnInit {
  opcionesSelect;
  escalasVendedores = [];

  @Input() idEmpresa: number | string;
  @Output() escalaVendedorSeleccionado: EventEmitter<
    number
  > = new EventEmitter();

  constructor(
    private readonly _escalaVendedorRestService: EscalaVendedorRestService,
    private readonly _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.obtenerEscalaVendedorActivo();
  }

  obtenerEscalaVendedorActivo() {
    const where = {
      empresa: this.idEmpresa,
      habilitado: 1,
    };
    this._escalaVendedorRestService
      .findAll('criterioBusqueda=' + JSON.stringify(where))
      .subscribe(respuesta => {
        this.escalasVendedores = respuesta[0].map(resp => {
          const formatoDrowpSelect = {
            label: resp.nombre,
            value: resp.id,
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

  enviarEscalasVendedoresSeleccionado(evento) {
    this.escalaVendedorSeleccionado.emit(evento.value);
  }
}
