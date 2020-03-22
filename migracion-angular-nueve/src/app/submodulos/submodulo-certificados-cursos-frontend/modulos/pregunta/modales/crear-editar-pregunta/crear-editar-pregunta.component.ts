import {Component, Inject, OnInit} from '@angular/core';
import {PreguntaInterface} from '../../interfaces/pregunta.interface';
import {
  CONFIGURACION_PREGUNTA,
  ConfiguracionFormluarioPregunta
} from '../../componentes/pregunta-formulario/pregunta-formulario.component';
import {PreguntaRestService} from '../../servicios/rest/pregunta-rest.service';
import {ToasterService} from 'angular2-toaster';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';

@Component({
  selector: 'app-crear-editar-pregunta',
  templateUrl: './crear-editar-pregunta.component.html',
  styleUrls: ['./crear-editar-pregunta.component.scss']
})

export class CrearEditarPreguntaComponent extends FormularioModal<PreguntaInterface,
  ConfiguracionFormluarioPregunta,
  PreguntaRestService>
  implements OnInit {
  registroCrearEditar: PreguntaInterface;
  constructor(
    public dialogo: MatDialogRef<CrearEditarPreguntaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      pregunta: PreguntaInterface,
      idDiapositiva: number
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _preguntaRestService: PreguntaRestService,
  ) {
    super(
      _preguntaRestService,
      _cargandoService,
      _toasterService,
      data.pregunta,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_PREGUNTA();
    if (this.data.pregunta) {
      // logica para deshabilitar campos aqui
      const Editar = Object.assign(
        {},
        this.data.pregunta,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        Editar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  prepararRegistroParaEnvio(registro: PreguntaInterface) {
    // loginca
    if (!this.data.pregunta) {
      registro.habilitado = 1;
    }
    this.registroCrearEditar = registro;
    if (this.registroCrearEditar.valor) {
      this.registroCrearEditar.valor = +this.registroCrearEditar.valor;
    }
    this.registroCrearEditar.tratarDeNuevo = +this.registroCrearEditar.tratarDeNuevo;
    this.registroCrearEditar.diapositiva = this.data.idDiapositiva;
    if (this.registroCrearEditar.descripcion) {
      this.registroCrearEditar.descripcion = this.registroCrearEditar.descripcion.trim();
    }
    return this.registroCrearEditar;
  }
}

