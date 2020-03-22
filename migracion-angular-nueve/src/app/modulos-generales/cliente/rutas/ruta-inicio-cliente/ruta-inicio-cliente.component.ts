import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_CLIENTE} from '../definicion-rutas/definicion-rutas-cliente';
import {RUTAS_PRINCIPAL} from '../../../../submodulos/submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {traducirMigas} from '../../../../submodulos/submodulo-certificados-cursos-frontend/funciones/traducir-migas-de-pan';
import {ActivatedRoute} from '@angular/router';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-inicio-cliente',
  templateUrl: './ruta-inicio-cliente.component.html',
  styleUrls: ['./ruta-inicio-cliente.component.scss']
})
export class RutaInicioClienteComponent extends RutaConMigasDePan implements OnInit {
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private readonly _activeRoute: ActivatedRoute,
    protected readonly _translocoService: TranslocoService,
  ) {
    super(_emitirMigaPanService, _translocoService);
  }

  ngOnInit() {
    this._activeRoute.params.subscribe(
      (p) => {
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CLIENTE.rutaInicio(false, true),
        ];
        this.establecerMigas(rutas);
        // traducirMigas(this, rutas);
      }
    );
  }

}
