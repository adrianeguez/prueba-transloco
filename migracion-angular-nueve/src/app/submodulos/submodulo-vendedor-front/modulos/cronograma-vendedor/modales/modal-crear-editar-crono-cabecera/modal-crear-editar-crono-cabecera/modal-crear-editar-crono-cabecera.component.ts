import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CargandoService, EstaTipeandoComponent} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {
  CONFIGURACION_CRONOVENDCABECERA,
  ConfiguracionFormluarioCronoVendCabecera,
} from '../../../componentes/formularios/cronograma-cabecera/crono-vend-cabecera-formulario.component';
import {
  establecerValoresConfiguracionAbstractControl,
  FormularioModal,
} from '@manticore-labs/ng-api';
import {CronogramaVendedorCabeceraInterface} from '../../../../../interfaces/cronograma-vendedor-cabecera-interface';
import {CronogramaCabeceraRestService} from '../../../../../servicios/rest/cronograma-cabecera-rest.service';

@Component({
  selector: 'app-modal-crear-editar-crono-cabecera',
  templateUrl: './modal-crear-editar-crono-cabecera.component.html',
  styleUrls: ['./modal-crear-editar-crono-cabecera.component.scss'],
})
export class ModalCrearEditarCronoCabeceraComponent
  extends FormularioModal<CronogramaVendedorCabeceraInterface,
    ConfiguracionFormluarioCronoVendCabecera,
    CronogramaCabeceraRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalCrearEditarCronoCabeceraComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cronogramaCabecera: CronogramaVendedorCabeceraInterface;
      idEmpresa: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _cronogramaCabeceraRestService: CronogramaCabeceraRestService,
  ) {
    super(
      _cronogramaCabeceraRestService,
      _cargandoService,
      _toasterService,
      data.cronogramaCabecera,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_CRONOVENDCABECERA();
    if (this.data.cronogramaCabecera) {
      // logica para deshabilitar campos aqui
      const cronogramaCabeceraEditar = Object.assign(
        {},
        this.data.cronogramaCabecera,
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

  prepararRegistroParaEnvio(registro) {
    registro.empresa = this.data.idEmpresa;
    if (!this.data.cronogramaCabecera) {
      registro.habilitado = true;
    } else {
    }
    return registro;
  }
}
