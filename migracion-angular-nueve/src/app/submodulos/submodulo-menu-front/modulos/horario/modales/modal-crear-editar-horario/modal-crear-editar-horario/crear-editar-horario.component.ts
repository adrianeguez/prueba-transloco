import { Component, Inject, OnInit } from '@angular/core';
import {
  establecerValoresConfiguracionAbstractControl,
  FormularioModal,
} from '@manticore-labs/ng-api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CargandoService } from 'man-lab-ng';
import { ToasterService } from 'angular2-toaster';
import { HorarioInterface } from '../../../interfaces/horario.interface';
import { HorarioRestService } from '../../../servicios/rest/horario.rest.service';
import {
  CONFIGURACION_HORARIO,
  ConfiguracionFormluarioHorario,
} from '../../../componentes/horario-formulario/horario-formulario.component';

@Component({
  selector: 'app-crear-editar-horario',
  templateUrl: './crear-editar-horario.component.html',
  styleUrls: ['./crear-editar-horario.component.scss'],
})
export class CrearEditarHorarioComponent
  extends FormularioModal<
    HorarioInterface,
    ConfiguracionFormluarioHorario,
    HorarioRestService
  >
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CrearEditarHorarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      horario: HorarioInterface;
      idEmpresa: number;
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _horarioRestService: HorarioRestService,
  ) {
    super(_horarioRestService, _cargandoService, _toasterService, data.horario);
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_HORARIO();
    if (this.data.horario) {
      // logica para deshabilitar campos aqui
      const horarioEditar = Object.assign({}, this.data.horario);
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        horarioEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro: HorarioInterface) {
    registro.lunes = registro.lunes ? 1 : 0;
    registro.martes = registro.martes ? 1 : 0;
    registro.miercoles = registro.miercoles ? 1 : 0;
    registro.jueves = registro.jueves ? 1 : 0;
    registro.viernes = registro.viernes ? 1 : 0;
    registro.sabado = registro.sabado ? 1 : 0;
    registro.domingo = registro.domingo ? 1 : 0;
    registro.empresa = +this.data.idEmpresa;
    registro.habilitado = 1;
    if (this.data.horario) {
      registro.empresa = null;
    }
    return registro;
  }
}
