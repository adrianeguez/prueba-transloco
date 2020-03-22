import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ml-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css'],
})
export class MenuPanelComponent implements OnInit {
  @Input() items: MenuItem[];

  iconosItems: string[];

  @Input() menuPanel = true;

  formBusqueda: FormGroup;
  @Output() ampliarMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formBusqueda = this._formBuilder.group({
      palabraBusqueda: '',
    });

    if (this.items) {
      this.iconosItems = this.obtenerIconosPrimerNivel(this.items);
    }

    this.escucharBusquedaItemsMenu();
  }

  escucharBusquedaItemsMenu() {
    const busqueda$ = this.formBusqueda.get('palabraBusqueda');
    busqueda$.valueChanges.subscribe(palabraBusqueda => {
      this.cambiarEstadoMenu(this.items, 'expanded', false);

      if (palabraBusqueda !== '') {
        this.cambiarEstadoMenu(this.items, 'disabled', true);
        this.buscar(this.items, palabraBusqueda);
      } else {
        this.cambiarEstadoMenu(this.items, 'disabled', false);
      }
    });
  }

  cambiarEstadoMenu(menu: any[], propiedad: string, estado: boolean) {
    menu.forEach(elemento => {
      elemento[propiedad] = estado;
      if (elemento.items) {
        this.cambiarEstadoMenu(elemento.items, propiedad, estado);
      }
    });
  }

  buscar(menu: MenuItem[], criterioBusqueda) {
    const menuConCoincidencias = this.buscarCoincidencias(
      menu,
      criterioBusqueda,
    );
    if (menuConCoincidencias) {
      this.cambiarEstadoMenu(menuConCoincidencias, 'expanded', false);
      menu.forEach(item => {
        if (this.estaHabilitadoAlgunItemOSubItem(item)) {
          item.expanded = true;
          if (item.items) {
            this.cambiarEstadoMenu(item.items, 'expanded', true);
          }
        }
      });
    }
  }

  buscarCoincidencias(menu: any[], criterioBusqueda): MenuItem[] {
    menu.forEach(item => {
      if (this.esItemBuscado(item, criterioBusqueda)) {
        item.disabled = false;
      }
      if (this.tieneSubItems(item)) {
        this.buscarCoincidencias(item.items, criterioBusqueda);
      }
    });

    return menu;
  }

  esItemBuscado(item: MenuItem, palabra: string) {
    return item.label.toLowerCase().search(palabra.toLowerCase()) !== -1;
  }

  estaHabilitadoAlgunItemOSubItem(item: MenuItem) {
    if (this.estaHabilitadoItem(item)) {
      return true;
    } else if (this.tieneSubItems(item)) {
      return this.existenSubItemsHabilitados(item.items);
    } else {
      return false;
    }
  }

  existenSubItemsHabilitados(menu: any[]) {
    return menu.some(item => {
      if (this.estaHabilitadoItem(item)) {
        return true;
      } else if (this.tieneSubItems(item)) {
        return this.existenSubItemsHabilitados(item.items);
      } else {
        return false;
      }
    });
  }

  tieneSubItems(item: MenuItem) {
    return item.items && item.items.length > 0;
  }

  estaHabilitadoItem(item: MenuItem) {
    return item.disabled === false;
  }

  expandirIconoEnMenuPanel(itemSeleccionado: number) {
    this.cambiarEstadoMenu(this.items, 'expanded', false);
    this.cambiarEstadoMenu(this.items, 'disabled', false);

    this.items.some((item, indice) => {
      if (indice === itemSeleccionado) {
        item.expanded = true;
        this.cambiarEstadoMenu(item.items, 'expanded', true);
        return true;
      }
    });
    this.menuPanel = !this.menuPanel;
    this.ampliarMenu.emit(this.menuPanel);
  }

  obtenerIconosPrimerNivel(items: MenuItem[]) {
    const iconos: string[] = [];
    items.forEach((item: MenuItem) => {
      iconos.push(item.icon);
    });

    return iconos;
  }

  cerrarMenu() {
    this.menuPanel = !this.menuPanel;
    this.ampliarMenu.emit(this.menuPanel);
  }
}
