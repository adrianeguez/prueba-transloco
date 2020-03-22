import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import {
  CONFIGURACION_TEMA,
  ConfiguracionFormluarioTema
} from '../../componentes/tema-formulario/tema-formulario.component';
import {TemaRestService} from '../../servicios/rest/tema.rest.service';
import {TemaInterface} from '../../interfaces/tema.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Toast, ToasterService} from 'angular2-toaster';
import {CargandoService, EstaTipeandoComponent} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-crear-editar-tema',
  templateUrl: './crear-editar-tema.component.html',
  styleUrls: ['./crear-editar-tema.component.scss']
})
export class CrearEditarTemaComponent extends FormularioModal<TemaInterface,
  ConfiguracionFormluarioTema,
  TemaRestService>
  implements OnInit, AfterViewInit {
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  registroCrearEditar: TemaInterface;

  constructor(
    public dialogo: MatDialogRef<CrearEditarTemaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      tema: TemaInterface,
      moduloCurso,
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _temaRestService: TemaRestService,
    private readonly _translocoService: TranslocoService,
  ) {
    super(
      _temaRestService,
      _cargandoService,
      _toasterService,
      data.tema,
    );
  }

  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }

  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_TEMA();
    if (this.data.tema) {
      // logica para deshabilitar campos aqui
      const temaEditar = Object.assign(
        {},
        this.data.tema,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        temaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }

  prepararRegistroParaEnvio(registro: TemaInterface) {
    // loginca
    this.toasterTitulo = this._translocoService.translate('generales.toasters.toastExitoEditar.title');
    this.toasterDescripcion = this._translocoService.translate('generales.toasters.toastExitoEditar.body',
      {nombre: registro.nombre});
    registro.moduloCurso = +this.data.moduloCurso;
    if (!this.data.tema) {
      // cuando esta creando
      // registro.moduloCurso = +this.data.moduloCurso;
      this.toasterTitulo = this._translocoService.translate('generales.toasters.toastExitoCrear.title');
      this.toasterDescripcion = this._translocoService.translate('generales.toasters.toastExitoCrearVacio.body');
    }
    this.registroCrearEditar = registro;
    this.registroCrearEditar.moduloCurso = +this.data.moduloCurso;
    return this.registroCrearEditar;
  }
}

