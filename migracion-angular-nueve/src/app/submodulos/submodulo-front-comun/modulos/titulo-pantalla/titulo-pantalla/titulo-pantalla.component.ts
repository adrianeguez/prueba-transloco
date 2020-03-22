import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mlab-titulo-pantalla',
  templateUrl: './titulo-pantalla.component.html',
  styleUrls: ['./titulo-pantalla.component.scss']
})
export class TituloPantallaComponent implements OnInit {

  @Input()
  titulo = 'Título';

  @Input()
  descripcion = 'Descripcion.';

  @Input()
  ayuda = 'Texto de ayuda';

  @Input()
  imagen: string;

  constructor() {
  }

  ngOnInit() {
  }

}
