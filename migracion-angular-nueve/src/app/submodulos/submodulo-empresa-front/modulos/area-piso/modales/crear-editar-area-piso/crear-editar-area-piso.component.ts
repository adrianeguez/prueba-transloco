import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  CONFIGURACION_AREAPISO,
  ConfiguracionFormluarioAreaPiso,
} from '../../componentes/area-piso-formulario/area-piso-formulario.component';
import { AreaPisoRestService } from '../../../../servicios/rest/area-piso-rest.service';

import { AreaPisoInterface } from '../../../../interfaces/area-piso.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-area-piso',
  templateUrl: './crear-editar-area-piso.component.html',
  styleUrls: ['./crear-editar-area-piso.component.sass'],
})
export class CrearEditarAreaPisoComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  areaPisoCrearEditar: AreaPisoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionAreaPiso: ConfiguracionFormluarioAreaPiso;

  constructor(
    public dialogo: MatDialogRef<CrearEditarAreaPisoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { areaPiso: AreaPisoInterface; idPiso; areaPisoPadre },
    private readonly _toasterService: ToasterService,
    private readonly _areaPisoRestService: AreaPisoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.areaPiso ? 'Llene' : 'Modifique'
    } los campos necesarios para el área.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionAreaPiso = CONFIGURACION_AREAPISO();
    this.configuracionAreaPiso.Nivel.disabled = true;

    if (this.data.areaPiso) {
      const areaPisoEditar = this.data.areaPiso;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionAreaPiso,
        areaPisoEditar,
      );
    } else {
      // tslint:disable-next-line:max-line-length
      this.configuracionAreaPiso.Nivel.valor = this.data.areaPisoPadre
        ? this.data.areaPisoPadre.nivel + 1
        : 0;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionAreaPiso,
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

  validarFormulario(areaPiso) {
    if (areaPiso) {
      this.areaPisoCrearEditar = areaPiso;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.areaPisoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.areaPiso) {
      if (this.areaPisoCrearEditar.areaPisoPadre === '') {
        this.areaPisoCrearEditar.areaPisoPadre = null;
      }
      this._areaPisoRestService
        .updateOne(this.data.areaPiso.id, this.areaPisoCrearEditar)
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
      this.areaPisoCrearEditar.habilitado = true;
      this.areaPisoCrearEditar.piso = this.data.idPiso;
      if (this.data.areaPisoPadre) {
        this.areaPisoCrearEditar.areaPisoPadre = this.data.areaPisoPadre.id;
      }
      this._areaPisoRestService.create(this.areaPisoCrearEditar).subscribe(
        r => {
          r.habilitado = r.habilitado ? 1 : 0;
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
