import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoCargoRestService } from '../../../../servicios/rest/tipo-cargo-rest.service';
import { toastErrorConexionServidor } from '../../../../../../constantes/mensajes-toaster';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ml-select-tipo-cargo',
  templateUrl: './select-tipo-cargo.component.html',
  styleUrls: ['./select-tipo-cargo.component.scss'],
})
export class SelectTipoCargoComponent implements OnInit {
  opcionesDropdown = [];

  @Input() idEmpresa: number;

  @Output() tipoCargoSeleccionado: EventEmitter<number> = new EventEmitter();

  constructor(
    private readonly _tipoCargoRestService: TipoCargoRestService,
    private readonly _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    const consulta = {
      where: {
        habilitado: 1,
        empresa: +this.idEmpresa,
      },
    };
    this._tipoCargoRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        respuesta => {
          respuesta[0].forEach(registro => {
            this.opcionesDropdown.push({
              label: registro.nombre,
              value: registro,
            });
          });
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }

  enviarOpcionSeleccionada(evento) {
    this.tipoCargoSeleccionado.emit(evento.value ? evento.value.id : undefined);
  }
}
