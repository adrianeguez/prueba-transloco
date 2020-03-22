import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NIVELES_MENU } from '../../constant/niveles-menu';
import { MenuInterface } from '../../../../interfaces/menu-interface';
import { MenuRestService } from '../../../../../submodulo-menu-lateral-front/servicios/rest/menu.service';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-select-nivel-menu',
  templateUrl: './select-nivel-menu.component.html',
  styleUrls: ['./select-nivel-menu.component.sass'],
})
export class SelectNivelMenuComponent implements OnInit {
  nivelSeleccionado: number;
  niveles = NIVELES_MENU;
  @Output() menuEncontrado: EventEmitter<MenuInterface[]> = new EventEmitter();
  constructor(
    private readonly _menuRestService: MenuRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.enviarNivelSeleccionado({ value: undefined });
  }

  private _cargarMenusConNivel(query) {
    this._cargandoService.habilitarCargando();
    this._menuRestService
      .findAll('criterioBusqueda=' + JSON.stringify(query))
      .subscribe(
        r => {
          this._cargandoService.deshabilitarCargando();
          this.menuEncontrado.emit(r[0]);
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        },
      );
  }
  enviarNivelSeleccionado(nivelSeleccionado) {
    if (nivelSeleccionado.value) {
      const query = {
        where: {
          nivel: this.nivelSeleccionado,
        },
        skip: 0,
        take: 1000,
        order: {
          nivel: 'ASC',
        },
      };
      this._cargarMenusConNivel(query);
    } else {
      const query = {
        skip: 0,
        take: 1000,
        order: {
          nivel: 'ASC',
        },
      };
      this._cargarMenusConNivel(query);
    }
  }
}
