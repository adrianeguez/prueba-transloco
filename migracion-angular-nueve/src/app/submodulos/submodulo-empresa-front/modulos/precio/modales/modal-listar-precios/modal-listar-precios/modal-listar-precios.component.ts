import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Toast, ToasterService} from 'angular2-toaster';
import {CargandoService} from 'man-lab-ng';
import {TranslocoService} from '@ngneat/transloco';
import {PreciosInterface} from '../../../../../interfaces/precios.interface';
import {ServicioRestService} from '../../../../servicio-establecimiento/servicios/rest/servicios.rest.service';
import {MensajesToasterInterface} from '../../../../../../../interfaces/mensajesToaster.Interface';

@Component({
  selector: 'app-modal-listar-precios',
  templateUrl: './modal-listar-precios.component.html',
  styleUrls: ['./modal-listar-precios.component.scss']
})
export class ModalListarPreciosComponent implements OnInit {

  precioSeleccionado: PreciosInterface;
  estaEnTabla: boolean;
  totalRegistros: number;
  modalValido: boolean;
  private rutaTraduccion;
  traduccionesToaster: MensajesToasterInterface;

  constructor(
    public dialogo: MatDialogRef<ModalListarPreciosComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      // data que se inyecta
      precioActual,
      idArticuloEmpresa: number,
      idServicioEstablecimiento: number,
    },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _servicioEstablecimientoRestService: ServicioRestService,
    private readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit(): void {
    this.estaEnTabla = false;
    this.totalRegistros = 0;
    this.modalValido = false;
    this.rutaTraduccion = 'submoduloEmpresa.moduloPrecio.componentes.modalSeleccionarPrecios';
    this._translocoService.selectTranslateObject('generales.toasters').subscribe(
      (traduccion) => {
        this.traduccionesToaster = traduccion;
      }
    );
  }

  obtenerPrecioSeleccionado(evento: PreciosInterface) {
    this._cargandoService.habilitarCargando();
    this.precioSeleccionado = evento;
    this.validar();
    this.verificarPrecioActual(this.data.precioActual, this.precioSeleccionado);
    this._cargandoService.deshabilitarCargando();
  }

  verificarPrecioActual(precioActual, precioNuevo) {
    console.log('precioNuevo', precioNuevo);
    // console.log('tabla', this.data.preguntasEnTabla);
    if (precioActual) {
      this.estaEnTabla = precioActual === precioNuevo.valor;
    } else {
      this.estaEnTabla = false;
    }
  }

  aceptarPrecioSeleccionado() {
    if (this.estaEnTabla) {
      console.error({mensaje: 'Precio repetido', data: this.estaEnTabla});
      this
        ._toasterService
        .pop(
          'error',
          this._translocoService.translate('formularios.comunes.valido'),
          this._translocoService.translate(`${this.rutaTraduccion}.errores.precios`)
        );
    } else {
      this._cargandoService.habilitarCargando();
      const precioAñadir = {
        precio: +this.precioSeleccionado.valor,
      };
      this._servicioEstablecimientoRestService.updateOne(
        this.data.idServicioEstablecimiento,
        precioAñadir
      )
        .subscribe(
          respuesta => {
            this._toasterService.pop(
              this.traduccionesToaster.toastExitoCrearVacio as Toast
            );
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(respuesta);
          },
          error => {
            this._toasterService.pop(
              this.traduccionesToaster.toastErrorCrearVacio as Toast
            );
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close();
          }
        );
    }
  }

  cerrarModal() {
    this.dialogo.close();
  }

  validar() {
    this.modalValido = !!this.precioSeleccionado;
  }

}
