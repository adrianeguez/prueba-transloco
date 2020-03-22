import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  establecerCamposDisabled,
  NO_EXISTEN_REGISTROS
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {Curso} from './curso';
import {CursoFormulario} from './curso-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {ArticulosRestService} from '../../../../../submodulo-articulos-front/servicios/rest/articulos-rest.service';
import {ArticuloInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import {CursoInterface} from '../../interfaces/curso.interface';


@Component({
  selector: 'ml-curso-formulario',
  templateUrl: './curso-formulario.component.html'
})

export class CursoFormularioComponent implements OnInit {

  @Output() cursoValido: EventEmitter<Curso | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioCurso;
  @Input() idEmpresa: number;
  @Input() cursosEnTabla: [];

  curso: CursoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesCurso = {

    articulos: [],
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
    private _articuloRestService: ArticulosRestService,
  ) {

  }

  ngOnInit() {

    this.curso = new CursoFormulario(
      this.configuracionDisabled.Articulo.valor,
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.curso);
    this.curso.formGroup = this._formBuilder.group(encerarFormBuilder(this.curso));
    generarMensajesFormGroup(this.configuracionDisabled, this.curso);
    generarEmiteEmpezoTipear(this.curso, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.curso
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {

          this.mensajeToaster = '';

          if (this.curso.formGroup.valid && this.validacionesCampos()) {

            this.cursoValido.emit(generarCampos(this.curso));
            this
              ._toasterService
              .pop(
                'info',
                this._translocoService.translate('formularios.comunes.valido'),
                this._translocoService.translate('submoduloCertificadosCuros.moduloCurso.cursoFormulario.toasterGeneral')
              );

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
            }
            this.cursoValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarArticuloInterface();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }


  validarArticuloInterface() {
    const valorCampo = this.curso.formGroup.get('articulo').value;
    if (valorCampo !== null || valorCampo !== undefined) {
      const articuloValorActual = valorCampo.id;
      const articuloInterfaceEncontrado = this.objetoVariablesGlobales.articulos.find((registro) => registro.id === articuloValorActual);
      if (articuloInterfaceEncontrado || typeof articuloValorActual === 'number' || typeof valorCampo === 'object') {
        return true;
      } else {
        this.mensajeToaster = this
          ._translocoService
          .translate('submoduloCertificadosCuros.moduloCurso.cursoFormulario.articulo.toaster');
        return false;
      }
    }
  }

  buscarArticuloInterfaces(evento) {
    this._cargandoService.habilitarCargando();
    let articulos$;
    let consulta;
    if (evento.query === '') {
      consulta = {
        where: {
          esServicio: 1,
          esCurso: 1,
          articuloPorEmpresa: {
            empresa: this.idEmpresa
          }
        }
      };
    } else {
      consulta = {
        where: {
          esServicio: 1,
          esCurso: 1,
          articuloPorEmpresa: {
            empresa: this.idEmpresa
          },
          nombre: `LIKE(\"%25${evento.value}%25\")`,
          nombreCorto: `LIKE(\"%25${evento.value}%25\")`
        }
      };
    }
    articulos$ = this._articuloRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consulta));
    articulos$
      .subscribe(
        (articulos: [ArticuloInterface[], number]) => {
          this.objetoVariablesGlobales.articulos = articulos[0].filter(
            (articulo) => {
              console.log('Los cursos', this.cursosEnTabla);
              return !this.cursosEnTabla.some(
                (curso: CursoInterface) => {
                  // @ts-ignore
                  return curso.articulo.id === articulo.id;
                }
              );
            }
          );
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(
            'error',
            this._translocoService
              .translate('errores.errorTitulo'),
            this._translocoService
              .translate('errores.errorServidor'),
          );
          // Manejar errores
        }
      );
  }


}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesCurso {
  articulos: ArticuloInterface[];

}

export interface ConfiguracionFormluarioCurso {
  Id?: ConfiguracionDisabledInterfaz;
  Articulo?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_CURSO = (): ConfiguracionFormluarioCurso => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Articulo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Nombre: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
