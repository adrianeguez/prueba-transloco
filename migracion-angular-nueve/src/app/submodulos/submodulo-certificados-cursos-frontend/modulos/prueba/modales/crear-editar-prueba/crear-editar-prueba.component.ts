import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {PruebaRestService} from '../../servicios/rest/prueba.rest.service';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {PruebaInterface} from '../../interfaces/prueba.interface';
import {
  CONFIGURACION_PRUEBA,
  ConfiguracionFormluarioPrueba
} from '../../componentes/prueba-formulario/prueba-formulario.component';
import * as moment from 'moment';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-crear-editar-prueba',
  templateUrl: './crear-editar-prueba.component.html',
  styleUrls: ['./crear-editar-prueba.component.scss']
})
export class CrearEditarPruebaComponent extends FormularioModal<PruebaInterface,
  ConfiguracionFormluarioPrueba,
  PruebaRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CrearEditarPruebaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      prueba: PruebaInterface,
      idModuloCurso: number
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _pruebaRestService: PruebaRestService,
    private readonly _translocoService: TranslocoService,
  ) {
    super(
      _pruebaRestService,
      _cargandoService,
      _toasterService,
      data.prueba,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_PRUEBA();
    if (this.data.prueba) {
      // logica para deshabilitar campos aqui
      const pruebaEditar = Object.assign(
        {},
        this.data.prueba,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        pruebaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro: PruebaInterface) {
    this.toasterTitulo = this._translocoService.translate('generales.toasters.toastExitoEditar.title');
    this.toasterDescripcion = this._translocoService.translate('generales.toasters.toastExitoEditar.body',
      {nombre: registro.nombre});
    let stringTiempoMaximo: string;
    // @ts-ignore
    stringTiempoMaximo = `${registro.tiempoMaximo.hour}:${registro.tiempoMaximo.minute}:${registro.tiempoMaximo.second}`;
    const segundosTiempoMaximo = moment.duration(stringTiempoMaximo).asSeconds();
    registro.tiempoMaximo = segundosTiempoMaximo;
    registro.numeroIntentos = Number(registro.numeroIntentos);
    if (!this.data.prueba) {
      // cuando esta editando
      registro.moduloCurso = this.data.idModuloCurso;
      this.toasterTitulo = this._translocoService.translate('generales.toasters.toastExitoCrear.title');
      this.toasterDescripcion = this._translocoService.translate('generales.toasters.toastExitoCrearVacio.body');
    }
    return registro;
  }
}


