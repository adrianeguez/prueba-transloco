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
import { TarifaRestService } from '../../../../servicios/rest/tarifa-rest.service';
import { ConfiguracionFormluarioTarifa } from '../../componentes/tarifa-formulario/tarifa-formulario.component';
import { RutaGestionTarifaComponent } from '../../rutas/ruta-gestion-tarifa/ruta-gestion-tarifa.component';
// tslint:disable-next-line: max-line-length
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { TarifaInterface } from './../../../../interfaces/tarifa.interface';
import { CONFIGURACION_TARIFA } from './../../componentes/tarifa-formulario/tarifa-formulario.component';

@Component({
  selector: 'ml-crear-editar-tarifa',
  templateUrl: './crear-editar-tarifa.component.html',
  styleUrls: ['./crear-editar-tarifa.component.sass'],
})
export class CrearEditarTarifaComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionTarifa: ConfiguracionFormluarioTarifa;
  tarifaCrearEditar: TarifaInterface; // revisar error

  constructor(
    public dialogo: MatDialogRef<RutaGestionTarifaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { tarifa: TarifaInterface; idTipoImpuesto },
    private readonly _toasterService: ToasterService,
    private readonly _tarifaRestService: TarifaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.tarifa ? 'Llene' : 'Modifique'
    } los campos necesarios para la tarifa.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionTarifa = CONFIGURACION_TARIFA();
    if (this.data.tarifa) {
      const tarifaEditar = this.data.tarifa;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTarifa,
        tarifaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTarifa,
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

  validarFormulario(tarifa) {
    if (tarifa) {
      this.tarifaCrearEditar = tarifa;
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.tarifaCrearEditar = {};
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.tarifa) {
      this._tarifaRestService
        .updateOne(this.data.tarifa.id, this.tarifaCrearEditar)
        .subscribe(
          (respuesta: TarifaInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuesta);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(
              generarToasterErrorEditarCampoRepetido('Código SRI o Código'),
            );
          },
        );
    } else {
      this.tarifaCrearEditar.tipoImpuesto = this.data.idTipoImpuesto;
      this.tarifaCrearEditar.habilitado = true;
      this._tarifaRestService
        .create(this.tarifaCrearEditar)
        .subscribe(
          (respuesta: TarifaInterface) => {
            respuesta.habilitado = +respuesta.habilitado;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(respuesta);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(
              generarToasterErrorCrearCampoRepetido('Código SRI o Código'),
            );
          },
        );
    }
  }
}
