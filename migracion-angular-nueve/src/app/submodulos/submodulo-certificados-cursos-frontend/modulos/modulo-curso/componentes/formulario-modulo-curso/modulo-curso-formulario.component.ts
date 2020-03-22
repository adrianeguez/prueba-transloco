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
import {ModuloCurso} from './modulo-curso';
import {ModuloCursoFormulario} from './modulo-curso-formulario';
import {debounceTime, mergeMap} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {ModuloCursoRestService} from '../../servicios/rest/modulo-curso-rest.service';
import {ModuloCursoInterface} from '../../interfaces/modulo-curso.interface';
import {of} from 'rxjs';


@Component({
  selector: 'ml-modulo-curso-formulario',
  templateUrl: './modulo-curso-formulario.component.html'
})

export class ModuloCursoFormularioComponent implements OnInit {

  @Output() moduloCursoValido: EventEmitter<ModuloCurso | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioModuloCurso;


  @Input()
  idCurso = 0;

  @Input()
  estaEditando = false;
  moduloCurso: ModuloCursoFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesModuloCurso = {
    moduloAnteriorInterfaces: [],
    moduloSiguienteInterfaces: [],
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
    private _moduloCursoRestService: ModuloCursoRestService,
  ) {

  }

  ngOnInit() {

    this.moduloCurso = new ModuloCursoFormulario(
      this.configuracionDisabled.AnteriorModulo.valor,
      this.configuracionDisabled.SiguienteModulo.valor,
      this.configuracionDisabled.Nombre.valor,
      this.configuracionDisabled.Descripcion.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.moduloCurso);
    this.moduloCurso.formGroup = this._formBuilder.group(encerarFormBuilder(this.moduloCurso));
    generarMensajesFormGroup(this.configuracionDisabled, this.moduloCurso);
    generarEmiteEmpezoTipear(this.moduloCurso, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.moduloCurso
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {


          this.mensajeToaster = '';

          if (this.moduloCurso.formGroup.valid && this.validacionesCampos()) {

            this.moduloCursoValido.emit(generarCampos(this.moduloCurso));
            this
              ._toasterService
              .pop(
                'info',
                this._translocoService.translate('formularios.comunes.valido'),
                this._translocoService.translate('submoduloCertificadosCuros.moduloCursoModulo.moduloCursoFormulario.toasterGeneral')
              );

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
            }
            this.moduloCursoValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    return this.validarEjemplo() && this.validarModuloSiguienteInterface() && this.validarModuloAnteriorInterface();
  }

  validarEjemplo() {
    return true; // Implementacion de validacion ejemplo
  }


  validarModuloAnteriorInterface() {
    const valorCampo = this.moduloCurso.formGroup.get('anteriorModulo').value;
    if (valorCampo !== null) {
      const idAnteriorModuloValorActual = valorCampo.id;
      const moduloInterfaceEncontrado = this.objetoVariablesGlobales.moduloAnteriorInterfaces.find((registro) => registro.id === idAnteriorModuloValorActual);
      if (moduloInterfaceEncontrado || typeof idAnteriorModuloValorActual === 'number' || typeof valorCampo === 'object') {
        return true;
      } else {
        this.mensajeToaster = this
          ._translocoService
          .translate('submoduloCertificadosCuros.moduloCursoModulo.moduloCursoFormulario.anteriorModulo.toaster');
        return false;
      }
    }
    return true;
  }

  validarModuloSiguienteInterface() {
    const valorCampo = this.moduloCurso.formGroup.get('siguienteModulo').value;
    if (valorCampo !== null) {
      const idSiguienteModuloValorActual = valorCampo.id;
      const moduloInterfaceEncontrado = this.objetoVariablesGlobales.moduloAnteriorInterfaces.find((registro) => registro.id === idSiguienteModuloValorActual);
      if (moduloInterfaceEncontrado || typeof idSiguienteModuloValorActual === 'number' || typeof valorCampo === 'object') {
        return true;
      } else {
        this.mensajeToaster = this
          ._translocoService
          .translate('submoduloCertificadosCuros.moduloCursoModulo.moduloCursoFormulario.siguienteModulo.toaster');
        return false;
      }
    }
    return true;
  }

  filtrarDependiendoDelOtroAutocomplete(id) {
    return mergeMap(
      (respuesta: [ModuloCursoInterface[], number]) => {
        const modulosCuros = respuesta[0];
        const respuestaFiltrada = modulosCuros.filter(
          (moduloCurso) => {
            return +moduloCurso.id !== +id;
          }
        );
        return of(
          [
            respuestaFiltrada,
            respuestaFiltrada.length
          ]
        );
      }
    );
  }

  buscarModuloInterfaces(evento) { // para el modulo siguiente
    const idModuloAnterior = this.moduloCurso.formGroup.get('anteriorModulo').value ? this.moduloCurso.formGroup.get('anteriorModulo').value.id : 0;
    this._cargandoService.habilitarCargando();
    let idSiguienteModulos$;
    if (evento.query === '') {
      const consulta = {
        where: {
          curso: {
            id: [this.idCurso]
          }
        }
      };
      idSiguienteModulos$ = this._moduloCursoRestService
        .findAll('criterioBusqueda=' + JSON.stringify(consulta))
        .pipe(
          this.filtrarDependiendoDelOtroAutocomplete(idModuloAnterior),
        );
    } else {
      const consulta = {
        where: {
          nombre: [`Like("%25${evento.query}%25")`],
          curso: {
            id: [this.idCurso]
          }

        }
      };
      idSiguienteModulos$ = this._moduloCursoRestService
        .findAll('criterioBusqueda=' + JSON.stringify(consulta))
        .pipe(
          this.filtrarDependiendoDelOtroAutocomplete(idModuloAnterior),
        );
    }
    idSiguienteModulos$
      .subscribe(
        (moduloInterfaces: any[]) => {
          this.objetoVariablesGlobales.moduloSiguienteInterfaces = moduloInterfaces[0];
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

  buscarAnteriorModuloInterfaces(evento) {
    this._cargandoService.habilitarCargando();
    const idModuloSiguiente = this.moduloCurso.formGroup.get('siguienteModulo').value ? this.moduloCurso.formGroup.get('siguienteModulo').value.id : 0;
    let idAnteriorModulos$;
    if (evento.query === '') {
      const consulta = {
        where: {
          curso: {
            id: [this.idCurso]
          }
        }
      };
      idAnteriorModulos$ = this._moduloCursoRestService
        .findAll(
          'criterioBusqueda=' + JSON.stringify(consulta)
        )
        .pipe(
          this.filtrarDependiendoDelOtroAutocomplete(idModuloSiguiente),
        );
    } else {
      const consulta = {
        where: {
          nombre: [`Like("%25${evento.query}%25")`],
          curso: {
            id: [this.idCurso]
          }
        }
      };
      idAnteriorModulos$ = this._moduloCursoRestService
        .findAll('criterioBusqueda=' + JSON.stringify(consulta))
        .pipe(
          this.filtrarDependiendoDelOtroAutocomplete(idModuloSiguiente),
        );
    }
    idAnteriorModulos$
      .subscribe(
        (moduloInterfaces: any[]) => {
          this.objetoVariablesGlobales.moduloAnteriorInterfaces = moduloInterfaces[0];
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
interface ObjetoVariablesGlobalesModuloCurso {
  moduloAnteriorInterfaces: ModuloCursoInterface[];
  moduloSiguienteInterfaces: ModuloCursoInterface[];
}

export interface ConfiguracionFormluarioModuloCurso {
  Id?: ConfiguracionDisabledInterfaz;
  AnteriorModulo?: ConfiguracionDisabledInterfaz;
  SiguienteModulo?: ConfiguracionDisabledInterfaz;
  Nombre?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_MODULOCURSO = (): ConfiguracionFormluarioModuloCurso => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    AnteriorModulo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    SiguienteModulo: {
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
