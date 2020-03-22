import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  CONFIGURACION_CREARPTOEMIOPE,
  ConfiguracionFormluarioCrearPtoEmiOpe,
} from '../../../formularios/crear-pto-emi-ope-form/crear-pto-emi-ope-formulario.component';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CrearPtoEmiOpe} from '../../../formularios/crear-pto-emi-ope-form/crear-pto-emi-ope';
import {ClaseFormularioContenedor} from './clase-formulario-contenedor';
import {OperarioInterface} from '../../../../../submodulo-empresa-front/interfaces/operario.interface';
import {EstablecimientoInterface} from '../../../../../submodulo-empresa-front/interfaces/establecimiento.interface';
import {PuntoEmisionOperarioInterface} from '../../../../interfaces/cajas/punto-emision-operario.interface';
import {PuntoEmisionOperarioRestService} from '../../../../servicios/rest/punto-emision-operario-rest.service';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'mlab-modal-crear-pto-emi-ope',
  templateUrl: './modal-crear-pto-emi-ope.component.html',
  styleUrls: ['./modal-crear-pto-emi-ope.component.scss'],
})
export class ModalCrearPtoEmiOpeComponent extends ClaseFormularioContenedor
  implements OnInit {
  puntoEmisionOperario: CrearPtoEmiOpe;
  configuracionPuntoEmisionOperario: ConfiguracionFormluarioCrearPtoEmiOpe;

  constructor(
    public dialogo: MatDialogRef<ModalCrearPtoEmiOpeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      operario: OperarioInterface,
      establecimiento: EstablecimientoInterface,
      administrador: any
    },
    private readonly _puntoEmisionOperarioRestService: PuntoEmisionOperarioRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit() {
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionPuntoEmisionOperario = CONFIGURACION_CREARPTOEMIOPE();
    establecerValoresConfiguracionAbstractControl(
      this.configuracionPuntoEmisionOperario,
      {},
    );
  }

  establecerObjetoPuntoEmisionOperario(puntoEmisionOperario: CrearPtoEmiOpe) {
    if (puntoEmisionOperario) {
      this.formularioValido = true;
      this.puntoEmisionOperario = puntoEmisionOperario;
      this.OcultarEstaTipeando();
    } else {
      this.OcultarEstaTipeando();
    }
  }

  creaPuntoEmisionOperario() {
    const nuevoPuntoEmpisionOperario: PuntoEmisionOperarioInterface = {
      administradorEstablecimiento: this.data.administrador,
      novedadInicio: this.puntoEmisionOperario.novedadInicio,
      valorInicia: +this.puntoEmisionOperario.valorInicia,
      operario: this.data.operario.id,
      puntoEmision: this.data.operario.puntoEmision.id,
    };
    this._cargandoService.habilitarCargando();
    this._puntoEmisionOperarioRestService
      .create(nuevoPuntoEmpisionOperario)
      .subscribe(
        (data) => {
          console.log(data);
          this._cargandoService.deshabilitarCargando();
          this.dialogo.close(data);
        },
        (error) => {
          console.error({
            error,
            mensaje: 'Error creando Puntos de emision operario'
          });
          this._toasterService.pop(toastErrorConexionServidor);
          this._cargandoService.deshabilitarCargando();
        }
      );
  }

}
