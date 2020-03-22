import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService, EstaTipeandoComponent} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {DiapositivaInterface} from '../../interfaces/diapositiva.interface';
import {DiapositivaRestService} from '../../servicios/rest/diapositiva.rest.service';
import {
  CONFIGURACION_DIAPOSITIVA,
  ConfiguracionFormluarioDiapositiva
} from '../../componentes/formulario-diapositiva/diapositiva-formulario.component';


@Component({
  selector: 'app-crear-editar-diapositiva',
  templateUrl: './crear-editar-diapositiva.component.html',
  styleUrls: ['./crear-editar-diapositiva.component.scss']
})

export class CrearEditarDiapositivaComponent extends FormularioModal<DiapositivaInterface,
  ConfiguracionFormluarioDiapositiva,
  DiapositivaRestService>
  implements OnInit {

  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  descripcion: string;
  registroCrearEditar: DiapositivaInterface;
  formularioValido: boolean;

  constructor(
    public dialogo: MatDialogRef<CrearEditarDiapositivaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      diapositiva: DiapositivaInterface,
      idTema: number,
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _diapositivaRestService: DiapositivaRestService,
  ) {
    super(
      _diapositivaRestService,
      _cargandoService,
      _toasterService,
      data.diapositiva,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_DIAPOSITIVA();
    if (this.data.diapositiva) {
      const Editar = this.data.diapositiva;
      Editar.anteriorDiapositiva = Editar.anteriorDiapositiva as DiapositivaInterface;
      Editar.siguienteDiapositiva = this.data.diapositiva.siguienteDiapositiva as DiapositivaInterface;
      if (Editar.anteriorDiapositiva) {
        this.configuracionDisabled.AnteriorDiapositiva.valor = Editar.anteriorDiapositiva.titulo;
      }
      if (Editar.siguienteDiapositiva) {
        this.configuracionDisabled.SiguienteDiapositiva.valor = Editar.siguienteDiapositiva.titulo;
      }
      this.configuracionDisabled.AnteriorDiapositiva.disabled = true;
      this.configuracionDisabled.SiguienteDiapositiva.disabled = true;
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

  validarFormulario(diapositiva: DiapositivaInterface | boolean) {
    if (diapositiva) {
      diapositiva = diapositiva as DiapositivaInterface;

      this.registroCrearEditar = diapositiva;
      this.registroCrearEditar.anteriorDiapositiva = diapositiva.anteriorDiapositiva as DiapositivaInterface;
      this.registroCrearEditar.siguienteDiapositiva = diapositiva.siguienteDiapositiva as DiapositivaInterface;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.OcultarEstaTipeando();
    }
  }

  prepararRegistroParaEnvio(registro: DiapositivaInterface) {
    this.registroCrearEditar = registro as DiapositivaInterface;
    this.registroCrearEditar.siguienteDiapositiva = registro.siguienteDiapositiva as DiapositivaInterface;
    this.registroCrearEditar.anteriorDiapositiva = registro.anteriorDiapositiva as DiapositivaInterface;
    this.registroCrearEditar.tema = +this.data.idTema;

    if (registro.duracion !== null) {
      this.registroCrearEditar.duracion = this.transformarATiempo(registro.duracion);
    }
    if (registro.segundoEmpieza !== null) {
      this.registroCrearEditar.segundoEmpieza = this.transformarATiempo(registro.segundoEmpieza);
    }
    if (!this.data.diapositiva) {
      this.registroCrearEditar.habilitado = 1;
    }
    return this.registroCrearEditar;
  }

  transformarATiempo(timeObjeto) {
    // console.log(timeObjeto);
    let retornar = '';
    Object.values(timeObjeto).map(
      valor => {
        retornar = retornar + `${valor}:`;
      }
    );
    retornar = retornar.substring(0, retornar.length - 1);
    // return moment.duration(retornar).asSeconds();
    return retornar;
  }
}
