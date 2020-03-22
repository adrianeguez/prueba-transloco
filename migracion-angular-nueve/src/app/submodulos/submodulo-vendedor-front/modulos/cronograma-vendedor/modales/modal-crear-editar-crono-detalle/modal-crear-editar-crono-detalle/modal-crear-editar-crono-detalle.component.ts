import { Component, Inject, OnInit } from '@angular/core';
import { CargandoService } from 'man-lab-ng';
import { ToasterService } from 'angular2-toaster';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CronogramaVendedorInterface } from '../../../../../interfaces/cronograma-vendedor-interface';
import {
  establecerValoresConfiguracionAbstractControl,
  FormularioModal,
} from '@manticore-labs/ng-api';
import { CronogramaDetalleRestService } from '../../../../../servicios/rest/cronograma-detalle-rest.service';
import {
  CONFIGURACION_CRONOVENDDETALLE,
  ConfiguracionFormluarioCronoVendDetalle,
} from '../../../componentes/formularios/cronograma-detalle/crono-vend-detalle-formulario.component';

@Component({
  selector: 'app-modal-crear-editar-crono-detalle',
  templateUrl: './modal-crear-editar-crono-detalle.component.html',
  styleUrls: ['./modal-crear-editar-crono-detalle.component.scss'],
})
export class ModalCrearEditarCronoDetalleComponent
  extends FormularioModal<
    CronogramaVendedorInterface,
    ConfiguracionFormluarioCronoVendDetalle,
    CronogramaDetalleRestService
  >
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalCrearEditarCronoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cronogramaDetalle: CronogramaVendedorInterface;
      idCronogramaCabecera: number;
      idRuta: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _cronogramaDetalleRestService: CronogramaDetalleRestService,
  ) {
    super(
      _cronogramaDetalleRestService,
      _cargandoService,
      _toasterService,
      data.cronogramaDetalle,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_CRONOVENDDETALLE();
    if (this.data.cronogramaDetalle) {
      // logica para deshabilitar campos aqui
      const cronogramaCabeceraEditar = Object.assign(
        {},
        this.data.cronogramaDetalle,
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
    if (registro.fecha) {
      console.log(registro);
      const mes =
        registro.fecha.month.toString().length === 1
          ? '0' + registro.fecha.month
          : registro.fecha.month;
      const dia =
        registro.fecha.day.toString().length === 1
          ? '0' + registro.fecha.day
          : registro.fecha.day;
      const fecha = `${registro.fecha.year}-${mes}-${dia}`;
      registro.fecha = fecha;
    }

    registro.cronogramaVendedorCabecera = this.data.idCronogramaCabecera;
    registro.lunes = registro.lunes ? true : false;
    registro.martes = registro.martes ? true : false;
    registro.miercoles = registro.miercoles ? true : false;
    registro.jueves = registro.jueves ? true : false;
    registro.viernes = registro.viernes ? true : false;
    registro.sabado = registro.sabado ? true : false;
    registro.domingo = registro.domingo ? true : false;
    if (!this.data.cronogramaDetalle) {
      registro.habilitado = true;
    }
    return registro;
  }
}

// if (this.configuracionDisabled.Fecha.valor) {
//   const fechasDatos = this.configuracionDisabled.Fecha.valor.split('-');
//   this.configuracionDisabled.Fecha.valor = {year: Number(fechasDatos[0]), month: Number(fechasDatos[1]), day: Number(fechasDatos[2])};
// }
