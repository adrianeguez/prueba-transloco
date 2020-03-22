import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatSidenav } from '@angular/material';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'ml-menu-interfaz',
  templateUrl: './menu-interfaz.component.html',
  styleUrls: ['./menu-interfaz.component.sass'],
})
export class MenuInterfazComponent implements OnInit {
  ambiente = environment;

  @Input() menu: MenuItem[];

  @Input() mostrarMenuIconos = true;

  motrarTextoOcultar = false;

  @Output() ocultarIconos: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ocultarMenu(sidenav: MatSidenav) {
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

  ejecutoEvento(sidenav: MatSidenav, ejecutoUsuario = false) {
    sidenav.mode = 'side';
    sidenav.toggle();
    this.mostrarMenuIconos = true;
    this.ocultarIconos.emit(this.mostrarMenuIconos);
  }
}
