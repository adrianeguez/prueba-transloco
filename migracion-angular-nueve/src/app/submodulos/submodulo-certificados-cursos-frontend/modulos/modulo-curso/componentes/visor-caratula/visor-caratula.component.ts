import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-visor-caratula',
  templateUrl: './visor-caratula.component.html',
  styleUrls: ['./visor-caratula.component.scss']
})
export class VisorCaratulaComponent implements OnInit {
  imagenCargada = false;
  pasoTiempoMaximo = false;
  @Input()
  url = '';

  constructor() {
  }

  ngOnInit() {
    setTimeout(
      () => {
        this.pasoTiempoMaximo = true;
      }, 10000
    );
  }

  cargoImagen() {
    console.log('se cargo');
    this.imagenCargada = true;
  }

  generarRandomico() {
    return '?random=' + Math.random();
  }
}
