import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_MENU_ARTICULO} from '../definicion-rutas/rutas-menu';
import {RUTAS_PRINCIPAL} from '../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_CONFIGURACIONES} from '../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'app-ruta-menu-articulo',
  templateUrl: './ruta-menu-articulo.component.html',
  styleUrls: ['./ruta-menu-articulo.component.scss'],
})
export class RutaMenuArticuloComponent extends RutaConMigasDePan
  implements OnInit {
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private readonly _router: Router,
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
      RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
    ];
    this.establecerMigas(rutas);
  }

  irAGestionGrupos() {
    const rutaGestionCargasMasivas = ['/configuraciones', 'articulo', 'grupo-modulo'];
    this._router.navigate(rutaGestionCargasMasivas);
  }

  irAGestionTipoImpuesto() {
    const ruta = ['/configuraciones', 'articulo', 'tipo-impuesto-modulo'];
    this._router.navigate(ruta);
  }

  irAGestionUnidadMedida() {
    const ruta = ['/configuraciones', 'articulo', 'unidad-medida-modulo'];
    this._router.navigate(ruta);
  }
}
