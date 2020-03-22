import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface} from '@manticore-labs/ng-api';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_CLIENTE} from '../../../../../../modulos-generales/cliente/rutas/definicion-rutas/definicion-rutas-cliente';
import {RUTAS_CURSO} from '../../../curso/rutas/definicion-rutas/definicion-rutas-curso';
import {RUTAS_MODULO_CURSO} from '../../../modulo-curso/rutas/definicion-rutas/definicion-rutas-modulo';
import {RUTAS_TEMA} from '../../../tema/rutas/definicion-rutas/rutas-tema';
import {RUTAS_DIAPOSITIVA} from '../../../diapositiva/rutas/definicion-rutas/definicion-rutas-diapostiva';
import {RUTAS_PRUEBA} from '../definicion-rutas/rutas-prueba';
import {traducirMigas} from '../../../../funciones/traducir-migas-de-pan';
import {ActivatedRoute} from '@angular/router';
import {CargandoService} from 'man-lab-ng';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-ruta-test',
  templateUrl: './ruta-test.component.html',
  styleUrls: ['./ruta-test.component.scss']
})
export class RutaTestComponent implements OnInit {
  rutas: MigaDePanInterface[];
  parametros = {
    idCursoUsuario: 0, idModuloCursoUsuario: 0,
    idModuloCurso: 0, idTema: 0, idPruebaUsuario: 0
  };
  listo: boolean;

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    protected _cargandoService: CargandoService,
  ) {
    this.listo = false;
    this._cargandoService.habilitarCargando();
    this._activeRoute.params
      .subscribe(
        (parametros:
           {
             idCursoUsuario: string, idModuloCursoUsuario: string,
             idModuloCurso: string, idTema: string, idPruebaUsuario: string
           }
        ) => {
          // console.log({parametros});
          this.parametros.idCursoUsuario = +parametros.idCursoUsuario;
          this.parametros.idModuloCursoUsuario = +parametros.idModuloCursoUsuario;
          this.parametros.idModuloCurso = +parametros.idModuloCurso;
          this.parametros.idTema = +parametros.idTema;
          this.parametros.idPruebaUsuario = +parametros.idPruebaUsuario;
          const rutas = <MigaDePanInterface[]>[
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_CLIENTE.rutaInicio(false, true),
            RUTAS_CURSO.rutaMenuInicioUsuarioCurso(false, true),
            RUTAS_CURSO.rutaMenuMisCursos(false, true),
            RUTAS_MODULO_CURSO.rutaMenuModuloCurso(false, true,
              [
                this.parametros.idCursoUsuario,
              ]),
            RUTAS_TEMA.rutaMenuTema(false, true,
              [
                this.parametros.idCursoUsuario,
                this.parametros.idModuloCursoUsuario,
                this.parametros.idModuloCurso
              ]),
            RUTAS_DIAPOSITIVA.rutaMenuDiapositiva(false, true,
              [
                this.parametros.idCursoUsuario,
                this.parametros.idModuloCursoUsuario,
                this.parametros.idModuloCurso,
                this.parametros.idTema,
              ]),
            RUTAS_PRUEBA.rutaTestModulo(false, true,
              [
                this.parametros.idCursoUsuario,
                this.parametros.idModuloCursoUsuario,
                this.parametros.idModuloCurso,
                this.parametros.idTema,
                this.parametros.idPruebaUsuario
              ]),
          ];
          // traducirMigas(this, rutas);
          this.rutas = rutas;
          this.listo = true;
        }
      );
    this._cargandoService.deshabilitarCargando();
  }

  ngOnInit() {
  }

}

