import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {ActivatedRoute} from '@angular/router';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_TEMA} from '../definicion-rutas/rutas-tema';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {toastErrorMostrar} from '../../../../../../constantes/mensajes-toaster';
import {TemaRestService} from '../../servicios/rest/tema.rest.service';
import {TemaInterface} from '../../interfaces/tema.interface';
import {ToasterService} from 'angular2-toaster';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-ruta-menu-tema',
  templateUrl: './ruta-menu-tema.component.html',
  styleUrls: ['./ruta-menu-tema.component.scss']
})// RutaMenuTemaComponent
export class RutaMenuTemaComponent extends RutaConMigasDePan implements OnInit {

  // idEmpresa: number;
  idCursoUsuario: number;
  idModuloCurso: number;
  idModuloCursoUsuario: number;

  temas: TemaInterface[];
  rutaTraduccion: string;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    private readonly _activeRoute: ActivatedRoute,
    private readonly _temaRestService: TemaRestService,
    private readonly _toasterService: ToasterService,
    protected _translocoService: TranslocoService,
  ) {
    super(_emitirMigaPanService, _translocoService);
    this.rutaTraduccion = 'submoduloCertificadosCuros.tema.rutas.rutaMenuTema';
  }

  ngOnInit() {
    this._activeRoute.params.subscribe(
      (parametros: { idCursoUsuario: string, idModuloCursoUsuario: string, idModuloCurso: string, }) => {
        this.idCursoUsuario = +parametros.idCursoUsuario;
        this.idModuloCursoUsuario = +parametros.idModuloCursoUsuario;
        this.idModuloCurso = +parametros.idModuloCurso;
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CLIENTE.rutaInicio(false, true),
          RUTAS_CURSO.rutaMenuInicioUsuarioCurso(false, true),
          RUTAS_CURSO.rutaMenuMisCursos(false, true),
          RUTAS_MODULO_CURSO.rutaMenuModuloCurso(false, true,
            [
              this.idCursoUsuario,
            ]),
          RUTAS_TEMA.rutaMenuTema(false, true,
            [
              this.idCursoUsuario,
              this.idModuloCursoUsuario,
              this.idModuloCurso
            ])
        ];
        this.establecerMigas(rutas);
      }
    );
    this.obtenerDatosTemas();
  }

  obtenerDatosTemas() {
    const consulta = {
      where: {
        moduloCurso: {id: this.idModuloCurso},
        habilitado: 1,
      },
      skip: 0
    };
    const temasEncontrados$ = this._temaRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    temasEncontrados$
      .subscribe(
        (temas: [TemaInterface[], number]) => {
          this.temas = temas[0];
        },
        error => {
          console.error({
            error
          });
          this._toasterService.pop(toastErrorMostrar);
        }
      );
  }

}
