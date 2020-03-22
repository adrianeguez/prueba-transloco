import { Component, OnInit } from '@angular/core';
import {Menu} from 'primeng/menu';
import {MenuRestService} from '../../servicios/rest/menu.service';
import {Auth0Service} from '../../../submodulo-front-comun/servicios/auth0/auth0.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  menuLateral: Menu;
  mostrarIconos = true;
  constructor(private readonly _menuRestService: MenuRestService,
              public readonly _auth0Service: Auth0Service ) { }

  ngOnInit() {
    this._menuRestService
      .cambioMenu
      .subscribe(
        (menu: Menu) => {
          this.menuLateral = menu;
        }
      );
  }

}
