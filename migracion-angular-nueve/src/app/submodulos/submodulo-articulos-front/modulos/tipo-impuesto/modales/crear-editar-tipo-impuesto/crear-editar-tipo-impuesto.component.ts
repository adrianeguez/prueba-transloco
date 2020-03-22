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
import { TipoImpuestoRestService } from '../../../../servicios/rest/tipo-impuesto-rest.service';
import { RutaGestionTipoImpuestoComponent } from '../../rutas/ruta-gestion-tipo-impuesto/ruta-gestion-tipo-impuesto.component';
// tslint:disable-next-line: max-line-length
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { TipoImpuestoInterface } from './../../../../interfaces/tipo-impuesto.interface';
// tslint:disable-next-line: max-line-length
import {
  ConfiguracionFormluarioTipoImpuesto,
  CONFIGURACION_TIPOIMPUESTO,
} from './../../componentes/tipo-impuesto-formulario/tipo-impuesto-formulario.component';

@Component({
  selector: 'ml-crear-editar-tipo-impuesto',
  templateUrl: './crear-editar-tipo-impuesto.component.html',
  styleUrls: ['./crear-editar-tipo-impuesto.component.sass'],
})
export class CrearEditarTipoImpuestoComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionTipoImpuesto: ConfiguracionFormluarioTipoImpuesto;
  tipoImpuestoCrearEditar: TipoImpuestoInterface; // revisar error
  constructor(
    public dialogo: MatDialogRef<RutaGestionTipoImpuestoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { tipoImpuesto: TipoImpuestoInterface },
    private readonly _toasterService: ToasterService,
    private readonly _tipoImpuestoRestService: TipoImpuestoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.tipoImpuesto ? 'Llene' : 'Modifique'
    } los campos necesarios para el tipo impuesto.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionTipoImpuesto = CONFIGURACION_TIPOIMPUESTO();
    if (this.data.tipoImpuesto) {
      const tipoImpuestoEditar = this.data.tipoImpuesto;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoImpuesto,
        tipoImpuestoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoImpuesto,
        {},
      );
    }
  }

  ngAfterViewInit() {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  ocultarEstaTipeando() {
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

  validarFormulario(tipoImpuesto) {
    if (tipoImpuesto) {
      this.tipoImpuestoCrearEditar = tipoImpuesto;
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.tipoImpuestoCrearEditar = {};
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    if (this.data.tipoImpuesto) {
      this._tipoImpuestoRestService
        .updateOne(this.data.tipoImpuesto.id, this.tipoImpuestoCrearEditar)
        .subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuesta);
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              generarToasterErrorEditarCampoRepetido('Código SRI o Código'),
            );
          },
        );
    } else {
      this.tipoImpuestoCrearEditar.habilitado = true;
      this._tipoImpuestoRestService
        .create(this.tipoImpuestoCrearEditar)
        .subscribe(
          respuesta => {
            respuesta.habilitado = +respuesta.habilitado;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(respuesta);
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              generarToasterErrorCrearCampoRepetido('Código SRI o Código'),
            );
          },
        );
    }
  }
}
