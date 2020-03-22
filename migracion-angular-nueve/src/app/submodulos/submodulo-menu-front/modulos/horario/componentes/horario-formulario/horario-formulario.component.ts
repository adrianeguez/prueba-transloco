import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ConfiguracionDisabledInterfaz,
  encerarFormBuilder,
  generarCampos,
  generarEmiteEmpezoTipear,
  generarMensajesFormGroup,
  establecerCamposDisabled,
  NO_EXISTEN_REGISTROS,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { Horario } from './horario';
import { HorarioFormulario } from './horario-formulario';
import { debounceTime } from 'rxjs/operators';
import { CargandoService } from 'man-lab-ng';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';

@Component({
  selector: 'ml-horario-formulario',
  templateUrl: './horario-formulario.component.html',
})
export class HorarioFormularioComponent implements OnInit {
  @Output() horarioValido: EventEmitter<Horario | boolean> = new EventEmitter();

  @Output() empezoATipear: EventEmitter<boolean> = new EventEmitter();

  @Input() configuracionDisabled: ConfiguracionFormluarioHorario;

  horario: HorarioFormulario;

  NO_EXISTEN_REGISTROS = NO_EXISTEN_REGISTROS;

  mensajeToaster = '';

  objetoVariablesGlobales: ObjetoVariablesGlobalesHorario = {};

  tipoHorario: 'D' | 'F' = 'D';

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _cargandoService: CargandoService,
    private readonly _translocoService: TranslocoService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.horario = new HorarioFormulario(
      this.configuracionDisabled.Descripcion.valor,
      this.configuracionDisabled.Tipo.valor,
      this.configuracionDisabled.FechaInicia.valor,
      this.configuracionDisabled.FechaFinaliza.valor,
      this.configuracionDisabled.HoraInicia.valor,
      this.configuracionDisabled.HoraFinaliza.valor,
      this.configuracionDisabled.Lunes.valor,
      this.configuracionDisabled.Martes.valor,
      this.configuracionDisabled.Miercoles.valor,
      this.configuracionDisabled.Jueves.valor,
      this.configuracionDisabled.Viernes.valor,
      this.configuracionDisabled.Sabado.valor,
      this.configuracionDisabled.Domingo.valor,
    );

    // Empieza la construccion del formulario - No tocar estas lineas

    establecerCamposDisabled(this.configuracionDisabled, this.horario);
    this.horario.formGroup = this._formBuilder.group(
      encerarFormBuilder(this.horario),
    );
    generarMensajesFormGroup(this.configuracionDisabled, this.horario);
    generarEmiteEmpezoTipear(this.horario, this.empezoATipear);

    // Termina la construccion del formulario - No tocar estas lineas

    this.horario.formGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(camposValidados => {
        console.log(this.horario.formGroup);

        this.mensajeToaster = '';

        if (this.horario.formGroup.valid && this.validacionesCampos()) {
          this.horarioValido.emit(generarCampos(this.horario));
          this._toasterService.pop(
            'info',
            this._translocoService.translate('formularios.comunes.valido'),
            this._translocoService.translate(
              'submoduloMenu.horario.horarioFormulario.toasterGeneral',
            ),
          );
        } else {
          this._toasterService.pop(
            'warning',
            this._translocoService.translate('formularios.comunes.cuidado'),
            this._translocoService.translate(
              'submoduloMenu.horario.horarioFormulario.toasterGeneral',
            ),
          );

          this.horarioValido.emit(false);
        }
      });

    this.escucharCambiosTipoHorario();
  }

  validacionesCampos() {
    return this.validarFechasHorario();
  }
  escucharCambiosTipoHorario() {
    const campoTipoHorario$ = this.horario.formGroup.get('tipo');
    campoTipoHorario$.valueChanges
      .pipe(
        debounceTime(1000) // espera x tiempo hasta volver escuchar
      )
      .subscribe(
        valorTipo => {
          if (valorTipo === 'F') {
            this.configuracionDisabled.Lunes.hidden = true;
            this.configuracionDisabled.Martes.hidden = true;
            this.configuracionDisabled.Miercoles.hidden = true;
            this.configuracionDisabled.Jueves.hidden = true;
            this.configuracionDisabled.Viernes.hidden = true;
            this.configuracionDisabled.Sabado.hidden = true;
            this.configuracionDisabled.Domingo.hidden = true;
            this.configuracionDisabled.FechaInicia.hidden = false;
            this.configuracionDisabled.FechaFinaliza.hidden = false;
          } else if (valorTipo === 'D') {
            this.configuracionDisabled.Lunes.hidden = false;
            this.configuracionDisabled.Martes.hidden = false;
            this.configuracionDisabled.Miercoles.hidden = false;
            this.configuracionDisabled.Jueves.hidden = false;
            this.configuracionDisabled.Viernes.hidden = false;
            this.configuracionDisabled.Sabado.hidden = false;
            this.configuracionDisabled.Domingo.hidden = false;
            this.configuracionDisabled.FechaInicia.hidden = true;
            this.configuracionDisabled.FechaFinaliza.hidden = true;
          }
        }
      );
  }


  validarFechasHorario() {
    const valorCampoFechaInicia = this.horario.formGroup.get('fechaInicia')
      .value;
    const valorCampoFechaFinaliza = this.horario.formGroup.get('fechaFinaliza')
      .value;
    const condicionCamposNoNull =
      valorCampoFechaFinaliza !== null && valorCampoFechaInicia !== null;
    if (condicionCamposNoNull) {
      const fechaInicia = moment(valorCampoFechaInicia);
      const fechaFinaliza = moment(valorCampoFechaFinaliza);
      const esIntervaloValidoInicioAntesFin = fechaInicia.isSameOrBefore(
        fechaFinaliza,
      );
      if (esIntervaloValidoInicioAntesFin) {
        return true;
      } else {
        this.mensajeToaster = this._translocoService.translate(
          'submoduloMenu.horario.horarioFormulario.fechaFinaliza.toaster',
        );
        return false;
      }
    } else {
      return true;
    }
  }
}

// tslint:disable-next-line:no-empty-interface
interface ObjetoVariablesGlobalesHorario {}

export interface ConfiguracionFormluarioHorario {
  Id?: ConfiguracionDisabledInterfaz;
  Descripcion?: ConfiguracionDisabledInterfaz;
  Tipo?: ConfiguracionDisabledInterfaz;
  FechaInicia?: ConfiguracionDisabledInterfaz;
  FechaFinaliza?: ConfiguracionDisabledInterfaz;
  HoraInicia?: ConfiguracionDisabledInterfaz;
  HoraFinaliza?: ConfiguracionDisabledInterfaz;
  Lunes?: ConfiguracionDisabledInterfaz;
  Martes?: ConfiguracionDisabledInterfaz;
  Miercoles?: ConfiguracionDisabledInterfaz;
  Jueves?: ConfiguracionDisabledInterfaz;
  Viernes?: ConfiguracionDisabledInterfaz;
  Sabado?: ConfiguracionDisabledInterfaz;
  Domingo?: ConfiguracionDisabledInterfaz;
}

export const CONFIGURACION_HORARIO = (): ConfiguracionFormluarioHorario => {
  return {
    Id: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
    Descripcion: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Tipo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    FechaInicia: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    FechaFinaliza: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    HoraInicia: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    HoraFinaliza: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Lunes: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Martes: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Miercoles: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Jueves: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Viernes: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Sabado: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },

    Domingo: {
      valor: null,
      disabled: false,
      hidden: false,
      calculoFormulario: undefined,
    },
  };
};


/*
submoduloMenu.horario.horarioFormulario.toasterGeneral
'submoduloMenu.horario.horarioFormulario.fechaFinaliza.toaster'
 */
