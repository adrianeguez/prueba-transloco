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
import { PisoInterface } from '../../../../interfaces/piso.interface';
import {
  CONFIGURACION_PISO,
  ConfiguracionFormluarioPiso,
} from '../../componentes/piso-formulario/piso-formulario.component';
import { PisoRestService } from '../../../../servicios/rest/piso-rest.service';
import {
  toastErrorCrearEmpresa,
  toastErrorEditarEmpresa,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-piso',
  templateUrl: './crear-editar-piso.component.html',
  styleUrls: ['./crear-editar-piso.component.sass'],
})
export class CrearEditarPisoComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  pisoCrearEditar: PisoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionPiso: ConfiguracionFormluarioPiso;

  constructor(
    public dialogo: MatDialogRef<CrearEditarPisoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { piso: PisoInterface; idEdificio },
    private readonly _toasterService: ToasterService,
    private readonly _pisoRestService: PisoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.piso ? 'Llene' : 'Modifique'
    } los campos necesarios para el piso.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionPiso = CONFIGURACION_PISO();
    if (this.data.piso) {
      const pisoEditar = this.data.piso;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPiso,
        pisoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(this.configuracionPiso, {});
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

  validarFormulario(piso) {
    if (piso) {
      this.pisoCrearEditar = piso;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.pisoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.piso) {
      this._pisoRestService
        .updateOne(this.data.piso.id, this.pisoCrearEditar)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditarEmpresa);
          },
        );
    } else {
      this.pisoCrearEditar.habilitado = true;
      this.pisoCrearEditar.edificio = this.data.idEdificio;
      this._pisoRestService.create(this.pisoCrearEditar).subscribe(
        r => {
          r.habilitado = r.habilitado ? 1 : 0;
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoCrear);
          this.dialogo.close(r);
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          console.error(err);
          this._toasterService.pop(toastErrorCrearEmpresa);
        },
      );
    }
  }
}
