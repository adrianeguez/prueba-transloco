import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'mlab-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  @Input()
  texto: string;

  @Input()
  descripcion: string;

  @Input()
  imagen = 'assets/imagenes/tower.png';

  @Input()
  url: [];

  @Input()
  extras: NavigationExtras;

  constructor(private readonly _router: Router) {
  }

  ngOnInit() {
  }

  irARuta() {
    this._router.navigate(this.url, this.extras);
  }

}
