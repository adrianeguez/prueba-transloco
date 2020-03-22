import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RUTAS_PRINCIPAL} from '../definicion-rutas/rutas-principal';

@Component({
  selector: 'app-ruta-no-encontrado',
  templateUrl: './ruta-no-encontrado.component.html',
  styleUrls: ['./ruta-no-encontrado.component.css'],
})
export class RutaNoEncontradoComponent implements OnInit {
  constructor(private readonly _router: Router) {
  }

  ngOnInit() {
  }

  irAUrl(url?) {
    if (url) {
      url = RUTAS_PRINCIPAL.rutaMenuPrincipal(true, false);
      this._router.navigate(url);
    } else {
      window.history.back();
    }

  }
}
