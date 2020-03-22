import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { TipoLogroVisitaInterface } from '../../../../interfaces/tipo-logro-visita-interface';
import { TipoLogroVisitaRestService } from '../../../../servicios/rest/tipo-logro-visita-rest.service';
import {
  ConfiguracionFormluarioTipoLogroVisita,
  CONFIGURACION_TIPOLOGROVISITA,
} from '../../componentes/tipo-logro-visita-formulario/tipo-logro-visita-formulario.component';
import { RutaGestionTipoLogroVisitaComponent } from '../../rutas/ruta-gestion-tipo-logro-visita/ruta-gestion-tipo-logro-visita.component';

@Component({
  selector: 'ml-crear-editar-tipo-logro-visita',
  templateUrl: './crear-editar-tipo-logro-visita.component.html',
  styleUrls: ['./crear-editar-tipo-logro-visita.component.scss'],
})
export class CrearEditarTipoLogroVisitaComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  tipoLogroVisitaCrearEditar: TipoLogroVisitaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionTipoLogroVisita: ConfiguracionFormluarioTipoLogroVisita;

  constructor(
    public dialogo: MatDialogRef<RutaGestionTipoLogroVisitaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      tipoLogroVisita: TipoLogroVisitaInterface;
      idEmpresa: number | string;
    },
    private readonly _toasterService: ToasterService,
    private readonly _tipoLogroVisitaRestService: TipoLogroVisitaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.tipoLogroVisita ? 'Llene' : 'Modifique'
    } los campos necesarios del tipo de logro de visita.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionTipoLogroVisita = CONFIGURACION_TIPOLOGROVISITA();

    if (this.data.tipoLogroVisita) {
      const tipoLogroVisitaEditar = this.data.tipoLogroVisita;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoLogroVisita,
        tipoLogroVisitaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoLogroVisita,
        {},
      );
    }
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

  establecerFormularioInvalido() {
    this.formularioValido = false;
    this.mostrarEstaTipeando();
  }

  validarFormulario(tipoLogroVisita) {
    if (tipoLogroVisita) {
      this.tipoLogroVisitaCrearEditar = tipoLogroVisita;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.tipoLogroVisitaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.tipoLogroVisita) {
      this._tipoLogroVisitaRestService
        .updateOne(
          this.data.tipoLogroVisita.id,
          this.tipoLogroVisitaCrearEditar,
        )
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.tipoLogroVisitaCrearEditar.empresa = this.data.idEmpresa;
      this.tipoLogroVisitaCrearEditar.habilitado = true;
      this._tipoLogroVisitaRestService
        .create(this.tipoLogroVisitaCrearEditar)
        .subscribe(
          r => {
            r.habilitado = +r.habilitado;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
