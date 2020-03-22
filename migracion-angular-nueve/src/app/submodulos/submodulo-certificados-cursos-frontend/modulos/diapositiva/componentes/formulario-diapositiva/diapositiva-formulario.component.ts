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
import {Diapositiva} from './diapositiva';
import {DiapositivaFormulario} from './diapositiva-formulario';
import {debounceTime} from 'rxjs/operators';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {DiapositivaInterface} from '../../interfaces/diapositiva.interface';
import {DiapositivaRestService} from '../../servicios/rest/diapositiva.rest.service';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ml-diapositiva-formulario',
  templateUrl: './diapositiva-formulario.component.html'
})

export class DiapositivaFormularioComponent implements OnInit {

  @Output() diapositivaValido: EventEmitter<Diapositiva | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioDiapositiva;

  @Input() idTema: number;

  diapositiva: DiapositivaFormulario;

  idDiapositivaEditar: number;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesDiapositiva = {

    diapositivaInterfaces: [],
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
    private _diapositivaRestService: DiapositivaRestService,
  ) {

  }

  transformarAObjeto(tiempo) {
    const retornar: NgbTimeStruct = {
      hour: 0,
      minute: 0,
      second: 0
    };
    const tiempoArreglo = tiempo.split(':');
    Object.keys(retornar).map(
      (llave, indice) => {
        retornar[llave] = +tiempoArreglo[indice];
      }
    );
    return retornar;
  }

  ngOnInit() {

    this.diapositiva = new DiapositivaFormulario(
      this.configuracionDisabled.Titulo.valor,
      this.configuracionDisabled.Notas.valor,
      this.configuracionDisabled.SegundoEmpieza.valor ? this.transformarAObjeto(this.configuracionDisabled.SegundoEmpieza.valor) : this.configuracionDisabled.SegundoEmpieza.valor,
      this.configuracionDisabled.Duracion.valor ? this.transformarAObjeto(this.configuracionDisabled.Duracion.valor) : this.configuracionDisabled.Duracion.valor,
      this.configuracionDisabled.SiguienteDiapositiva.valor,
      this.configuracionDisabled.AnteriorDiapositiva.valor,
    );
    this.idDiapositivaEditar = this.configuracionDisabled.Id.valor;
    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.diapositiva);
    this.diapositiva.formGroup = this._formBuilder.group(encerarFormBuilder(this.diapositiva));
    generarMensajesFormGroup(this.configuracionDisabled, this.diapositiva);
    generarEmiteEmpezoTipear(this.diapositiva, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.diapositiva
      .formGroup
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        camposValidados => {
          this.mensajeToaster = '';

          if (this.diapositiva.formGroup.valid && this.validacionesCampos()) {

            this.diapositivaValido.emit(generarCampos(this.diapositiva));
            this
              ._toasterService
              .pop(
                'info',
                this._translocoService.translate('formularios.comunes.valido'),
                this._translocoService.translate('submoduloCertificadosCuros.diapositiva.diapositivaFormulario.toasterGeneral')
              );

          } else {

            if (this.mensajeToaster !== '') {
              this._toasterService.pop('warning', this._translocoService.translate('formularios.comunes.cuidado'), this.mensajeToaster);
            }
            this.diapositivaValido.emit(false);
          }
        }
      );
  }

  validacionesCampos() {
    const anteriorDiapositiva = this.diapositiva.formGroup.get('anteriorDiapositiva').value;
    const siguienteDiapositiva = this.diapositiva.formGroup.get('siguienteDiapositiva').value;
    if (anteriorDiapositiva !== null && siguienteDiapositiva !== null) {
      return this.validarAnteriorDiapositiva() && this.validarSiguienteDiapositiva();
    }
    if (anteriorDiapositiva !== null && siguienteDiapositiva === null) {
      return this.validarAnteriorDiapositiva();
    }
    if (anteriorDiapositiva === null && siguienteDiapositiva !== null) {
      return this.validarSiguienteDiapositiva();
    }
    if (anteriorDiapositiva === null && siguienteDiapositiva === null) {
      return true;
    }
  }

  validarSiguienteDiapositiva() {
    const valorCampo = this.diapositiva.formGroup.get('siguienteDiapositiva').value;
    if (valorCampo !== undefined) {
      const siguienteDiapositivaValorActual = valorCampo.id;
      const diapositivaInterfaceEncontrado = this.objetoVariablesGlobales.diapositivaInterfaces.find((registro) => registro.id === siguienteDiapositivaValorActual);
      if (diapositivaInterfaceEncontrado || typeof siguienteDiapositivaValorActual === 'number' || typeof valorCampo === 'object') {
        if (!this.verificarSiSeRepite(siguienteDiapositivaValorActual)) {
          if (!this.verificarEsLaMismaDiapositiva(siguienteDiapositivaValorActual)) {
            return true;
          } else {
            this.mensajeToaster = this._translocoService
              .translate('submoduloCertificadosCuros.diapositiva.diapositivaFormulario.siguienteDiapositiva.toaster');
            return false;
          }
        } else {
          this.mensajeToaster = this._translocoService
            .translate('submoduloCertificadosCuros.diapositiva.diapositivaFormulario.toasterSelectDiapositiva');
          return false;
        }
      } else {
        this.mensajeToaster = this
          ._translocoService
          .translate('submoduloCertificadosCuros.diapositiva.diapositivaFormulario.siguienteDiapositiva.toaster');
        return false;
      }
    }
  }

  verificarEsLaMismaDiapositiva(idDiapositiva) {
    return idDiapositiva === this.idDiapositivaEditar;
  }

  verificarSiSeRepite(idSiguienteDiapositiva) {
    const diapoAnterior = this.diapositiva.formGroup.get('anteriorDiapositiva').value;
    if (diapoAnterior !== null) {
      return idSiguienteDiapositiva === diapoAnterior.id;
    } else {
      return false;
    }
  }

  buscarDiapositiva(evento) {
    this._cargandoService.habilitarCargando();
    let siguienteDiapositivas$;
    const consulta = { // lenar la consulta
      where: {
        tema: {id: this.idTema},
        titulo: `Like(\"%25${evento.query}%25\")`,
      }
    };
    siguienteDiapositivas$ = this._diapositivaRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consulta));
    siguienteDiapositivas$
      .subscribe(
        (diapositiva: [DiapositivaInterface[], number]) => {
          this.objetoVariablesGlobales.diapositivaInterfaces = diapositiva[0]
            .filter(
              valorActual => {
                return valorActual.id !== this.idDiapositivaEditar;
              });
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(
            {
              error,
            }
          );
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


  validarAnteriorDiapositiva() {
    const valorCampo = this.diapositiva.formGroup.get('anteriorDiapositiva').value;
    if (valorCampo !== undefined) {
      const anteriorDiapositivaValorActual = valorCampo.id;
      const diapositivaInterfaceEncontrado = this.objetoVariablesGlobales.diapositivaInterfaces.find((registro) => registro.id === anteriorDiapositivaValorActual);
      if (diapositivaInterfaceEncontrado || typeof anteriorDiapositivaValorActual === 'number' || typeof valorCampo === 'object') {
        if (!this.verificarEsLaMismaDiapositiva(anteriorDiapositivaValorActual)) {
          return true;
        } else {
          this.mensajeToaster = this._translocoService
            .translate('submoduloCertificadosCuros.diapositiva.diapositivaFormulario.anteriorDiapositiva.toaster');
          return false;
        }
      } else {
        this.mensajeToaster = this
          ._translocoService
          .translate('submoduloCertificadosCuros.diapositiva.diapositivaFormulario.anteriorDiapositiva.toaster');
        return false;
      }
    }
  }


}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesDiapositiva {
  diapositivaInterfaces: DiapositivaInterface[];

}

export interface ConfiguracionFormluarioDiapositiva {
  Id?: ConfiguracionDisabledInterfaz;
  Titulo?: ConfiguracionDisabledInterfaz;
  Notas?: ConfiguracionDisabledInterfaz;
  SegundoEmpieza?: ConfiguracionDisabledInterfaz;
  Duracion?: ConfiguracionDisabledInterfaz;
  SiguienteDiapositiva?: ConfiguracionDisabledInterfaz;
  AnteriorDiapositiva?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_DIAPOSITIVA = (): ConfiguracionFormluarioDiapositiva => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },
    Titulo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Notas: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    SegundoEmpieza: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    Duracion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    SiguienteDiapositiva: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

    AnteriorDiapositiva: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined
    },

  };
};
