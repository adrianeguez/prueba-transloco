import { Component, OnInit } from '@angular/core';
import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
import { ArticulosRestService } from './../../../../servicios/rest/articulos-rest.service';

@Component({
  selector: 'ml-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.sass'],
})
export class AgregarArticuloComponent implements OnInit {
  articulos: ArticuloInterface[];
  articuloSeleccionado;
  constructor(private readonly _articulosRestService: ArticulosRestService) {}

  ngOnInit() {
    this.obtenerTodosArticulos();
  }

  obtenerTodosArticulos() {
    this._articulosRestService.findAll().subscribe(
      respuesta => {
        this.articulos = respuesta[0];
      },
      error => {
        console.error(error);
      },
    );
  }
}
