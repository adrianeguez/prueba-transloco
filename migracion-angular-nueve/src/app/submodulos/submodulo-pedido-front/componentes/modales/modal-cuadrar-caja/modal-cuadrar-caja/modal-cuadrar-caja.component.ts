import {Component, Inject, OnInit} from '@angular/core';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {CuadrarCaja} from '../../../formularios/formulario-cuadrar-caja/cuadrar-caja';
import {
  CONFIGURACION_CUADRARCAJA,
  ConfiguracionFormluarioCuadrarCaja
} from '../../../formularios/formulario-cuadrar-caja/cuadrar-caja-formulario.component';
import {PuntoEmisionOperarioRestService} from '../../../../servicios/rest/punto-emision-operario-rest.service';

@Component({
  selector: 'app-modal-cuadrar-caja',
  templateUrl: './modal-cuadrar-caja.component.html',
  styleUrls: ['./modal-cuadrar-caja.component.scss']
})
export class ModalCuadrarCajaComponent extends FormularioModal<CuadrarCaja,
  ConfiguracionFormluarioCuadrarCaja,
  PuntoEmisionOperarioRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalCuadrarCajaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      puntoEmisionOperario: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _puntoEmisionOperarioRestService: PuntoEmisionOperarioRestService,
  ) {
    super(
      _puntoEmisionOperarioRestService,
      _cargandoService,
      _toasterService,
      undefined,
    );
  }

  ngOnInit(): void {
    this.servicioCustom = true;
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_CUADRARCAJA();
    if (this.data.puntoEmisionOperario) {
      // logica para deshabilitar campos aqui
      const cronogramaCabeceraEditar = Object.assign(
        {},
        this.data.puntoEmisionOperario,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        cronogramaCabeceraEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro: CuadrarCaja | any) {
    return registro;
  }

  generarServicio(registro: CuadrarCaja) {
    return this._puntoEmisionOperarioRestService
      .cerrarPuntoEmision(this.data.puntoEmisionOperario, registro);
  }

}
