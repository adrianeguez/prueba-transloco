import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DiapositivaFormateadaInterface} from '../../interfaces/diapositiva.formateada.interface';
import {Router} from '@angular/router';
import {PruebaInterface} from '../../../prueba/interfaces/prueba.interface';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CargandoService} from 'man-lab-ng';
import {PruebaUsuarioRestService} from '../../../prueba/servicios/rest/prueba-usuario-rest.service';
import {ToasterService} from 'angular2-toaster';
import {toastErrorDarPrueba, toastErrorEditar} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'app-visor-diapositiva',
  templateUrl: './visor-diapositiva.component.html',
  styleUrls: ['./visor-diapositiva.component.scss']
})
export class VisorDiapositivaComponent implements OnInit {
  @Input()
  diapositiva: DiapositivaFormateadaInterface;
  @Input()
  caratula: string;
  @Input()
  moduloCursoUsuario = 0;
  @Input()
  moduloCurso = 0;
  @Input()
  cursoUsuario = 0;
  @Input()
  tema = 0;

  constructor(
    private readonly _router: Router,
    private readonly _pruebaUsuarioService: PruebaUsuarioRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
  }

  obtenerPruebaUsuario(prueba: PruebaInterface) {
    return this._pruebaUsuarioService.iniciarPruebaUsuario(
      {
        idModuloUsuario: this.moduloCursoUsuario,
        idPrueba: prueba.id,
        tiempoMaximo: prueba.tiempoMaximo,
      }
    ).pipe(
      mergeMap(
        (respuesta: { mensaje: string, error: boolean, data: { idPruebaUsuario: number } }) => {
          const idPruebaUsuario = respuesta.data.idPruebaUsuario;
          const url = this.armarRutaPrueba(idPruebaUsuario);
          return of(url);
        }
      )
    );
  }

  protected armarRutaPrueba(idPruebaUsuario) {
    return [
      '/cliente-modulo', 'curso-modulo', 'menu-mis-cursos',
      this.cursoUsuario, 'modulo-curso-modulo', this.moduloCursoUsuario,
      this.moduloCurso, 'tema-modulo', this.tema, 'diapositiva-modulo', idPruebaUsuario, 'prueba-modulo'
    ];
  }

  irPrueba(prueba) {
    this._cargandoService.habilitarCargando();
    this.obtenerPruebaUsuario(
      prueba
    ).subscribe(
      (url: string[]) => {
        this._cargandoService.deshabilitarCargando();
        const ruta = [...url, 'test'];
        this._router.navigate(
          ruta,
        );
      }, error => {
        console.error({
          error,
          mensaje: 'ya dio la prueba',
          data: prueba
        });
        this._toasterService.pop(toastErrorDarPrueba);
        this._cargandoService.deshabilitarCargando();
      }
    );
  }
}
