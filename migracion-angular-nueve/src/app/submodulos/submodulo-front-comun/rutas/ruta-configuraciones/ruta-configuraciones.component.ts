import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {RUTAS_PRINCIPAL} from '../definicion-rutas/rutas-principal';
import {RUTAS_CONFIGURACIONES} from '../definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-ruta-configuraciones',
  templateUrl: './ruta-configuraciones.component.html',
  styleUrls: ['./ruta-configuraciones.component.scss'],
})
export class RutaConfiguracionesComponent
  extends RutaConMigasDePan
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
    ];
    this.establecerMigas(rutas);
  }

  irACargasMasivas() {
    const rutaCargas = ['/configuraciones', 'cargas-masivas'];
    this._router.navigate(rutaCargas);
  }

  irAArticulos() {
    const rutaArticulos = ['configuraciones', 'articulo'];
    this._router.navigate(rutaArticulos);
  }
}
