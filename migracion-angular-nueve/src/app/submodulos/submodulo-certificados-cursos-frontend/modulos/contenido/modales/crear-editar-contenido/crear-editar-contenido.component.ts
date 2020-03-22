import {Component, Inject, OnInit} from '@angular/core';
import {ContenidoInterface} from '../../interfaces/contenido.interface';
import {
  CONFIGURACION_CONTENIDO,
  ConfiguracionFormluarioContenido
} from '../../componentes/formulario-contenido/contenido-formulario.component';
import {ContenidoRestService} from '../../servicios/rest/contenido.rest.service';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-crear-editar-contenido',
  templateUrl: './crear-editar-contenido.component.html',
  styleUrls: ['./crear-editar-contenido.component.scss']
})
export class CrearEditarContenidoComponent extends FormularioModal<ContenidoInterface,
  ConfiguracionFormluarioContenido,
  ContenidoRestService>
  implements OnInit {
  registroCrearEditar: ContenidoInterface;
  constructor(
    public dialogo: MatDialogRef<CrearEditarContenidoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      contenido: ContenidoInterface,
      idDiapositiva: number,
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _contenidoRestService: ContenidoRestService,
  ) {
    super(
      _contenidoRestService,
      _cargandoService,
      _toasterService,
      data.contenido,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_CONTENIDO();
    if (this.data.contenido) {
      // logica para deshabilitar campos aqui
      const Editar = Object.assign(
        {},
        this.data.contenido,
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

  prepararRegistroParaEnvio(registro: ContenidoInterface) {
    this.registroCrearEditar = registro;
    if (!this.data.contenido) {
      this.registroCrearEditar.diapositiva = +this.data.idDiapositiva;
    }
    return this.registroCrearEditar;
  }
}

