import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {OpcionInterface} from '../../interfaces/opcion.interface';
import {ToasterService} from 'angular2-toaster';
import {OpcionRestService} from '../../servicios/rest/opcion-rest.service';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {
  CONFIGURACION_OPCION,
  ConfiguracionFormluarioOpcion
} from '../../componentes/opcion-formulario/opcion-formulario.component';

@Component({
  selector: 'app-crear-editar-opcion',
  templateUrl: './crear-editar-opcion.component.html',
  styleUrls: ['./crear-editar-opcion.component.scss']
})
export class CrearEditarOpcionComponent extends FormularioModal<OpcionInterface,
  ConfiguracionFormluarioOpcion,
  OpcionRestService>
  implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CrearEditarOpcionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      opcion: OpcionInterface,
      idPregunta: number
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _opcionRestService: OpcionRestService,
  ) {
    super(
      _opcionRestService,
      _cargandoService,
      _toasterService,
      data.opcion,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_OPCION();
    if (this.data.opcion) {
      // logica para deshabilitar campos aqui
      const opcionEditar = Object.assign(
        {},
        this.data.opcion,
      );
      this.configuracionDisabled.EsRespuesta.hidden = true;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        opcionEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro: OpcionInterface) {
    registro.esRespuesta = Number(registro.esRespuesta);
    if (!this.data.opcion) {
      // cuando esta editando
      registro.pregunta = this.data.idPregunta;
    }
    registro.descripcion = registro.descripcion.trim();
    return registro;
  }

}

