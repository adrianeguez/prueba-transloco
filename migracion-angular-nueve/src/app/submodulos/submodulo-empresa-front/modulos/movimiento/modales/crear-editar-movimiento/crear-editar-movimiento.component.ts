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
  toastErrorCrearEmpresa,
  toastErrorEditarEmpresa,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { MovimientoInterface } from '../../../../interfaces/movimiento.interface';
import {
  CONFIGURACION_MOVIMIENTO,
  ConfiguracionFormluarioMovimiento,
} from '../../componentes/movimiento-formulario/movimiento-formulario.component';
import { MovimientoRestService } from '../../../../servicios/rest/movimiento-rest.service';

@Component({
  selector: 'mlab-crear-editar-movimiento',
  templateUrl: './crear-editar-movimiento.component.html',
  styleUrls: ['./crear-editar-movimiento.component.scss'],
})
export class CrearEditarMovimientoComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  movimientoCrearEditar: MovimientoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionMovimiento: ConfiguracionFormluarioMovimiento;

  constructor(
    public dialogo: MatDialogRef<CrearEditarMovimientoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { movimiento: MovimientoInterface; idTipoMovimiento },
    private readonly _toasterService: ToasterService,
    private readonly _movimientoRestService: MovimientoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.movimiento ? 'Llene' : 'Modifique'
    } los campos necesarios para el movimiento.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionMovimiento = CONFIGURACION_MOVIMIENTO();
    if (this.data.movimiento) {
      const movimientoEditar = this.data.movimiento;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionMovimiento,
        movimientoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionMovimiento,
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

  validarFormulario(movimiento) {
    if (movimiento) {
      this.movimientoCrearEditar = movimiento;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.movimientoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.movimientoCrearEditar) {
      this.movimientoCrearEditar.numero = +this.movimientoCrearEditar.numero;
      this.movimientoCrearEditar.numeroInventario = +this.movimientoCrearEditar
        .numeroInventario;
      this.movimientoCrearEditar.codigo = +this.movimientoCrearEditar.codigo;
      this.movimientoCrearEditar.formaNumerar =
        +this.movimientoCrearEditar.formaNumerar === 1;
      this.movimientoCrearEditar.factorStock = +this.movimientoCrearEditar
        .factorStock;
      this.movimientoCrearEditar.afectaCostoPromedio =
        +this.movimientoCrearEditar.afectaCostoPromedio === 1;
      this.movimientoCrearEditar.afectaCostoUltimo =
        +this.movimientoCrearEditar.afectaCostoUltimo === 1;
      this.movimientoCrearEditar.afectaCostoUltimaTransaccion =
        +this.movimientoCrearEditar.afectaCostoUltimaTransaccion === 1;
      this.movimientoCrearEditar.cobrarIVA =
        +this.movimientoCrearEditar.cobrarIVA === 1;
      this.movimientoCrearEditar.retencionIVA =
        +this.movimientoCrearEditar.retencionIVA === 1;
      this.movimientoCrearEditar.retencionRenta =
        +this.movimientoCrearEditar.retencionRenta === 1;
      this.movimientoCrearEditar.formaValorarInventario = +this
        .movimientoCrearEditar.formaValorarInventario;
      this.movimientoCrearEditar.afectaDatosUltimaCompra =
        +this.movimientoCrearEditar.afectaDatosUltimaCompra === 1;
      this.movimientoCrearEditar.afectaDatosUltimaVenta =
        +this.movimientoCrearEditar.afectaDatosUltimaVenta === 1;
      if (this.data.movimiento) {
        this._movimientoRestService
          .updateOne(this.data.movimiento.id, this.movimientoCrearEditar)
          .subscribe(
            r => {
              r.formaNumerar = r.formaNumerar ? 1 : 0;
              r.afectaCostoPromedio = r.afectaCostoPromedio ? 1 : 0;
              r.afectaCostoUltimo = r.afectaCostoUltimo ? 1 : 0;
              r.afectaCostoUltimaTransaccion = r.afectaCostoUltimaTransaccion
                ? 1
                : 0;
              r.cobrarIVA = r.cobrarIVA ? 1 : 0;
              r.retencionIVA = r.retencionIVA ? 1 : 0;
              r.retencionRenta = r.retencionRenta ? 1 : 0;
              r.afectaDatosUltimaCompra = r.afectaDatosUltimaCompra ? 1 : 0;
              r.afectaDatosUltimaVenta = r.afectaDatosUltimaVenta ? 1 : 0;
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
        this.movimientoCrearEditar.habilitado = true;
        this.movimientoCrearEditar.indiceAfecta = false;
        this.movimientoCrearEditar.tipoMovimiento = this.data.idTipoMovimiento;
        this._movimientoRestService
          .create(this.movimientoCrearEditar)
          .subscribe(
            r => {
              r.habilitado = r.habilitado ? 1 : 0;
              r.formaNumerar = r.formaNumerar ? 1 : 0;
              r.afectaCostoPromedio = r.afectaCostoPromedio ? 1 : 0;
              r.afectaCostoUltimo = r.afectaCostoUltimo ? 1 : 0;
              r.afectaCostoUltimaTransaccion = r.afectaCostoUltimaTransaccion
                ? 1
                : 0;
              r.cobrarIVA = r.cobrarIVA ? 1 : 0;
              r.retencionIVA = r.retencionIVA ? 1 : 0;
              r.retencionRenta = r.retencionRenta ? 1 : 0;
              r.afectaDatosUltimaCompra = r.afectaDatosUltimaCompra ? 1 : 0;
              r.afectaDatosUltimaVenta = r.afectaDatosUltimaVenta ? 1 : 0;
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
}
