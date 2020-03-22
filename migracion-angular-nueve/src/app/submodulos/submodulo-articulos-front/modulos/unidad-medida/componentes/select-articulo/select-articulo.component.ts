import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
import { ArticulosRestService } from './../../../../servicios/rest/articulos-rest.service';

@Component({
  selector: 'ml-select-articulo',
  templateUrl: './select-articulo.component.html',
  styleUrls: ['./select-articulo.component.scss'],
})
export class SelectArticuloComponent implements OnInit {
  articulos = [];
  @Output() articuloSeleccionado: EventEmitter<
    ArticuloInterface
  > = new EventEmitter();
  constructor(private readonly _articulosRestService: ArticulosRestService) {}

  ngOnInit() {
    this.obtenerArticulosHabilitados();
  }

  obtenerArticulosHabilitados() {
    this._articulosRestService.findAll().subscribe(
      respuesta => {
        this.articulos = respuesta[0]
          .map(registro => {
            const tipoImpuesto = { label: registro.nombre, value: registro };
            return tipoImpuesto;
          })
          .filter(
            // tslint:disable-next-line:no-shadowed-variable
            respuesta => {
              return respuesta.value.habilitado === 1;
            },
          );
      },
      err => {
        console.error(err);
      },
    );
  }

  enviarArticuloSeleccionado(evento) {
    // tslint:disable-next-line: no-unused-expression
    evento.value ? this.articuloSeleccionado.emit(evento.value) : undefined;
  }
}
