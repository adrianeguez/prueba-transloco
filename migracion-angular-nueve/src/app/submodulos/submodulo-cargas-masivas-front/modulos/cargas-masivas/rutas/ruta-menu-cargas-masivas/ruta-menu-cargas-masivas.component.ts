import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { GuardarArchivoRestService } from '../../../../servicios/rest/guardar-archivo-rest.service';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { RUTAS_CARGAS_MASIVAS } from '../definicion-rutas/rutas-cargas-masivas';
import { CargaMasivaInterface } from '../../../../interfaces/carga-masiva.interface';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';

@Component({
  selector: 'ml-menu-cargas-masivas',
  templateUrl: './ruta-menu-cargas-masivas.component.html',
  styleUrls: ['./ruta-menu-cargas-masivas.component.sass'],
})
export class RutaMenuCargasMasivasComponent
  extends RutaConMigasDePanTablaBusqueda<
    CargaMasivaInterface,
    GuardarArchivoRestService,
    ToasterService
  >
  implements OnInit {
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _cargaMasivaService: GuardarArchivoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _cargaMasivaService,
      _router,
      _toasterServicePrivate,
    );

    this.ruta = RUTAS_CARGAS_MASIVAS.rutaMenuCargasMasivas(false, true).ruta;
  }

  ngOnInit() {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CARGAS_MASIVAS.rutaConfiguraciones(false, true),
      RUTAS_CARGAS_MASIVAS.rutaMenuCargasMasivas(false, true),
    ];
    this.establecerMigas(rutas);
  }

  irAGestionCargasMasivas() {
    const rutaGestionCargasMasivas = [
      '/configuraciones',
      'cargas-masivas',
      'gestion-cargas-masivas',
    ];
    this._router.navigate(rutaGestionCargasMasivas);
  }

  irACargaMasiva(nombreCarga: string) {
    const ruta = ['/configuraciones', 'cargas-masivas', nombreCarga];
    this._router.navigate(ruta);
  }
}
