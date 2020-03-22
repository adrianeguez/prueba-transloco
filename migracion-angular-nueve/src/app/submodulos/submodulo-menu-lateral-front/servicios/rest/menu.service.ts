import {EventEmitter, Injectable} from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { MenuInterface } from '../../../submodulo-roles-frontend/interfaces/menu-interface';
import { environment } from '../../../../../environments/environment';
import {Menu} from 'primeng/menu';

@Injectable()
export class MenuRestService extends PrincipalRestService<MenuInterface> {

  menuUsuario: Menu;
  cambioMenu: EventEmitter<Menu> = new EventEmitter();
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'menu';
  }

  obtenerMenuCompleto() {
    const path = 'menu-completo';
    const url = `${this.url}:${this.port}/${this.segmento}/${path}`;
    this._http.get(url).subscribe(
      (menu: Menu) => {
        this.menuUsuario = menu;
        this.cambioMenu.emit(menu);
      }
    );
  }
  moverMenu(arbol) {
    const path = 'mover-menu';
    const url = `${this.url}:${this.port}/${this.segmento}/${path}`;
    console.log(arbol);
    console.log(url);
    // console.log(this._http.post(url, arbol));
    return this._http.post(url, arbol);
  }

  cargarMenuUsuario(idEmpresa: number) {
    // cargar-menu-usuario/:idEmpresaSeleccionada
    const path = `cargar-menu-usuario/${idEmpresa}`;
    const url = `${this.url}:${this.port}/${this.segmento}/${path}`;
    return this._http.get(url);
  }
}
