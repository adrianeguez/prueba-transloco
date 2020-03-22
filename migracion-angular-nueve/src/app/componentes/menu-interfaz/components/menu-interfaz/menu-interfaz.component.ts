import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ml-menu-interfaz',
  templateUrl: './menu-interfaz.component.html',
  styleUrls: ['./menu-interfaz.component.sass'],
})
export class MenuInterfazComponent implements OnInit {
  @Input() menu: MenuItem[];
  @Input() mostrarMenuIconos = false;
  motrarTextoOcultar = false;
  @Output() ocultarIconos: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  ocultarMenu(sidenav) {
    sidenav.toggle();
    this.motrarTextoOcultar = !this.motrarTextoOcultar;
  }

  ampliarMenuFull(event: boolean) {
    this.mostrarMenuIconos = !event;
    this.ocultarIconos.emit(this.mostrarMenuIconos);
  }

  clickAqui($event: void) {
    this.mostrarMenuIconos = !this.mostrarMenuIconos;
    this.ocultarIconos.emit(this.mostrarMenuIconos);
  }
}
