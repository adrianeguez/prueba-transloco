import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_CURSO} from '../definicion-rutas/definicion-rutas-curso';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-inicio-curso',
  templateUrl: './ruta-inicio-curso.component.html',
  styleUrls: ['./ruta-inicio-curso.component.scss']
})
export class RutaInicioCursoComponent extends RutaConMigasDePan implements OnInit {
  rutaTraduccion: string;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected translocoService: TranslocoService
  ) {
    super(_emitirMigaPanService, translocoService);
  }

  ngOnInit() {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CLIENTE.rutaInicio(false, true),
      RUTAS_CURSO.rutaInicioUsuarioCurso(false, true),
    ];
    this.establecerMigas(rutas);
    this.rutaTraduccion = 'submoduloCertificadosCuros.moduloCurso.rutas.rutaGestionCurso';
  }

}
