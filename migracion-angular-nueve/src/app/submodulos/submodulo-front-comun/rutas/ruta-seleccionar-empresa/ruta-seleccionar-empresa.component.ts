import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {EmitirMigaPanService} from 'man-lab-ng';
import {Router} from '@angular/router';
import {RUTAS_PRINCIPAL} from '../definicion-rutas/rutas-principal';
import {RUTAS_CONFIGURACIONES} from '../definicion-rutas/rutas-configuraciones';
import {RUTAS_SELECCIONAR_EMPRESA} from '../definicion-rutas/rutas-seleccionar-empresa';
import {Auth0Service} from '../../servicios/auth0/auth0.service';

@Component({
  selector: 'mlab-ruta-seleccionar-empresa',
  templateUrl: './ruta-seleccionar-empresa.component.html',
  styleUrls: ['./ruta-seleccionar-empresa.component.scss']
})
export class RutaSeleccionarEmpresaComponent
  extends RutaConMigasDePan
  implements OnInit {

  constructor(protected _emitirMigaPanService: EmitirMigaPanService,
              private readonly _router: Router,
              public readonly auth0Service: Auth0Service) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_SELECCIONAR_EMPRESA.rutaSeleccionarEmpresa(false, true)
    ];
    this.establecerMigas(rutas);
  }

}
