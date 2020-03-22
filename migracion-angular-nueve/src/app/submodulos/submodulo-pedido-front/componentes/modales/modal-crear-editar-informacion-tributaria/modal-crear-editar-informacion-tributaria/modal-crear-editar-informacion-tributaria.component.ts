import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CargandoService, EstaTipeandoComponent} from 'man-lab-ng';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar
} from '../../../../../../constantes/mensajes-toaster';
import {InformacionTributariaInterface} from '../../../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';
// tslint:disable-next-line:max-line-length
import {
  CONFIGURACION_INFORMACIONTRIBUTARIA,
  ConfiguracionFormluarioInformacionTributaria
} from '../../../formularios/formulario-informacion-tributaria-pedido/informacion-tributaria-formulario.component';
import {InformacionTributariaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/informacion-tributaria-rest.service';

@Component({
  selector: 'app-modal-crear-editar-informacion-tributaria',
  templateUrl: './modal-crear-editar-informacion-tributaria.component.html',
  styleUrls: ['./modal-crear-editar-informacion-tributaria.component.scss']
})
export class ModalCrearEditarInformacionTributariaComponent implements OnInit, AfterViewInit {

  descripcion: string;
  formularioValido: boolean;
  informacionTributariaCrearEditar: InformacionTributariaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionInformacionTributaria: ConfiguracionFormluarioInformacionTributaria;

  constructor(
    public dialogo: MatDialogRef<ModalCrearEditarInformacionTributariaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { informacionTributaria: InformacionTributariaInterface, esVenta: boolean},
    private readonly _toasterService: ToasterService,
    private readonly _informacionTributariaRestService: InformacionTributariaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.informacionTributaria ? 'Llene' : 'Modifique'
    } los campos necesarios para la información tributaria.`;
    this.encerarConfiguracionDisabled();
  }


  encerarConfiguracionDisabled() {
    this.configuracionInformacionTributaria = CONFIGURACION_INFORMACIONTRIBUTARIA();
    if (this.data.esVenta) {
      this.configuracionInformacionTributaria.TipoContribuyente.disabled = true;
      this.configuracionInformacionTributaria.ObligadoContabilidad.disabled = true;
      this.configuracionInformacionTributaria.ContribuyenteEspecial.disabled = true;
    }
    if (this.data.informacionTributaria) {
      const informacionTributariaEditar = this.data.informacionTributaria;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionInformacionTributaria,
        informacionTributariaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionInformacionTributaria,
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

  validarFormulario(informacionTributaria) {
    if (informacionTributaria) {
      this.informacionTributariaCrearEditar = informacionTributaria;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.informacionTributariaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    this.informacionTributariaCrearEditar.obligadoContabilidad = +this.informacionTributariaCrearEditar.obligadoContabilidad === 1;
    if (this.data.informacionTributaria) {
      this._informacionTributariaRestService
        .updateOne(this.data.informacionTributaria.id, this.informacionTributariaCrearEditar)
        .subscribe(
          respuestaInformacionTributaria => {
            respuestaInformacionTributaria.obligadoContabilidad = respuestaInformacionTributaria.obligadoContabilidad ? 1 : 0;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuestaInformacionTributaria);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            if (this.data.esVenta) {
              this.dialogo.close(this.informacionTributariaCrearEditar);
            } else {
              console.error(err);
              this._toasterService.pop(toastErrorEditar);
            }
          },
        );
    } else {
      this.informacionTributariaCrearEditar.habilitado = true;
      this._informacionTributariaRestService.create(this.informacionTributariaCrearEditar).subscribe(
        respuestaInformacionTributaria => {
          console.log(respuestaInformacionTributaria);
          respuestaInformacionTributaria.obligadoContabilidad = respuestaInformacionTributaria.obligadoContabilidad ? 1 : 0;
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoCrear);
          this.dialogo.close(respuestaInformacionTributaria);
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          if (this.data.esVenta) {
            this.dialogo.close(this.informacionTributariaCrearEditar);
          } else {
            console.error(err);
            this._toasterService.pop(toastErrorCrear);
          }
        },
      );
    }
  }
}
