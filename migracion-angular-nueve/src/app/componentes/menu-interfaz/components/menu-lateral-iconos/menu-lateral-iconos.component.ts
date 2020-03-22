import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ml-menu-lateral-iconos',
  templateUrl: './menu-lateral-iconos.component.html',
  styleUrls: ['./menu-lateral-iconos.component.css'],
})
export class MenuLateralIconosComponent implements OnInit {
  @Input() iconosItems: string[];

  @Output() itemSeleccionado: EventEmitter<number> = new EventEmitter();

  items: MenuItem[] = [];

  constructor() {}

  ngOnInit() {
    this.iconosItems.forEach((icono, indice) => {
      const item: MenuItem = {
        id: indice.toString(),
        icon: icono,
        command: event => {
          this.abrirItemEnMenuPanel(event.item);
        },
      };
      this.items.push(item);
    });
  }

  abrirItemEnMenuPanel(item: MenuItem) {
    this.itemSeleccionado.emit(+item.id);
  }
}
