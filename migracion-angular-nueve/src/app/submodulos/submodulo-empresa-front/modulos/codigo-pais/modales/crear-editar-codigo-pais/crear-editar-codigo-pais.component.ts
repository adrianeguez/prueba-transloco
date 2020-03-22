import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  CONFIGURACION_CODIGOPAIS,
  ConfiguracionFormluarioCodigoPais,
} from '../../componentes/formulario-codigo-pais/codigo-pais-formulario.component';
import { CodigoPaisRestService } from '../../../../servicios/rest/codigo-pais-rest.service';
import { CodigoPaisInterface } from '../../../../interfaces/codigo-pais.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-modal-crear-editar-codigo-pais',
  templateUrl: './crear-editar-codigo-pais.component.html',
  styleUrls: ['./crear-editar-codigo-pais.component.sass'],
})
export class CrearEditarCodigoPaisComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  codigoPaisCrearEditar: CodigoPaisInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionCodigoPais: ConfiguracionFormluarioCodigoPais;

  constructor(
    public dialogo: MatDialogRef<CrearEditarCodigoPaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { codigoPais: CodigoPaisInterface },
    private readonly _toasterService: ToasterService,
    private readonly _codigoPaisRestService: CodigoPaisRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.codigoPais ? 'Llene' : 'Modifique'
    } los campos necesarios para el código del país.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionCodigoPais = CONFIGURACION_CODIGOPAIS();
    if (this.data.codigoPais) {
      const codigoPaisEditar = this.data.codigoPais;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionCodigoPais,
        codigoPaisEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionCodigoPais,
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

  validarFormulario(codigoPais) {
    if (codigoPais) {
      this.codigoPaisCrearEditar = codigoPais;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.codigoPaisCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.codigoPais) {
      this._codigoPaisRestService
        .updateOne(this.data.codigoPais.id, this.codigoPaisCrearEditar)
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
      this._codigoPaisRestService.create(this.codigoPaisCrearEditar).subscribe(
        r => {
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
