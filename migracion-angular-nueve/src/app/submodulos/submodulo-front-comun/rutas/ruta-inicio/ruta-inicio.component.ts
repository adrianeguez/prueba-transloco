import { Component, OnInit } from '@angular/core';
import {PERMISOS_MENU_PRINCIPAL} from '../../directivas/permiso/permiso';

@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.css'],
})
export class RutaInicioComponent implements OnInit {

  permisosMenuPrincipal = PERMISOS_MENU_PRINCIPAL;
  constructor() {}

  ngOnInit() {}
}
