import {Component, Inject, OnInit} from '@angular/core';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {IngresarKardexCaja} from '../../../formularios/formulario-ingresar-kardex-caja/ingresar-kardex-caja';
import {
  CONFIGURACION_INGRESARKARDEXCAJA,
  ConfiguracionFormluarioIngresarKardexCaja
} from '../../../formularios/formulario-ingresar-kardex-caja/ingresar-kardex-caja-formulario.component';
import {KardexCajaRestService} from '../../../../servicios/rest/kardex-caja-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-modal-ingresar-kardex-caja',
  templateUrl: './modal-ingresar-kardex-caja.component.html',
  styleUrls: ['./modal-ingresar-kardex-caja.component.scss']
})
export class ModalIngresarKardexCajaComponent extends FormularioModal<IngresarKardexCaja,
  ConfiguracionFormluarioIngresarKardexCaja,
  KardexCajaRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalIngresarKardexCajaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      puntoEmisionOperario: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _kardexCajaRestService: KardexCajaRestService,
  ) {
    super(
      _kardexCajaRestService,
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
    this.configuracionDisabled = CONFIGURACION_INGRESARKARDEXCAJA();
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

  prepararRegistroParaEnvio(registro: IngresarKardexCaja | any) {
    if (registro.operacionSuma === 'Suma') {
      registro.operacionSuma = true;
    } else {
      registro.operacionSuma = null;
    }
    registro.puntoEmisionOperario = +this.data.puntoEmisionOperario;
    return registro;
  }

  generarServicio(registro: IngresarKardexCaja) {
    return this._kardexCajaRestService
      .ingresarKardexCaja({registro});
  }


}
