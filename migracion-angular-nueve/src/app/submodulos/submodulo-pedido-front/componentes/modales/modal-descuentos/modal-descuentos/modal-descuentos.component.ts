import {Component, Inject, OnInit} from '@angular/core';
import {IngresarDescuentoFactura} from '../../../formularios/ingresar-descuento-factura/ingresar-descuento-factura';
import {ClaseFormularioContenedor} from './clase-formulario-contenedor';
import {
  CONFIGURACION_INGRESARDESCUENTOFACTURA,
  ConfiguracionFormluarioIngresarDescuentoFactura
} from '../../../formularios/ingresar-descuento-factura/ingresar-descuento-factura-formulario.component';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';
import {DescuentoInterface} from '../../../../interfaces/descuento.interface';
import {DescuentoVentaRestSqljsService} from '../../../../servicios/rest/descuento-venta/descuento-venta-rest-sqljs.service';
import {DescuentoVentaEntityInterface} from '../../../../servicios/rest/descuento-venta/interfaces/descuento-venta-entity.interface';

@Component({
  selector: 'ml-modal-descuentos',
  templateUrl: './modal-descuentos.component.html',
  styleUrls: ['./modal-descuentos.component.scss']
})
export class ModalDescuentosComponent extends ClaseFormularioContenedor implements OnInit {

  configuracionIngresoDescuentoFactura: ConfiguracionFormluarioIngresarDescuentoFactura;
  descuentoAIngresar = new IngresarDescuentoFactura();

  constructor(
    public dialogo: MatDialogRef<ModalDescuentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {base: number, descuento: DescuentoInterface},
  ) {
    super();
  }

  ngOnInit() {
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionIngresoDescuentoFactura = CONFIGURACION_INGRESARDESCUENTOFACTURA();
    if (this.data.descuento) {
      const descuentoEditar = this.data.descuento;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionIngresoDescuentoFactura,
        descuentoEditar
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionIngresoDescuentoFactura,
        {}
      );
    }
  }

  establecerObjetoIngresoDescuentoFactura(ingresoDescuentoFactura: IngresarDescuentoFactura) {
    if (ingresoDescuentoFactura) {
      this.formularioValido = true;
      this.descuentoAIngresar = ingresoDescuentoFactura;
      this.ocultarEstaTipeando();
    } else {
      this.ocultarEstaTipeando();
    }
  }

  agregarDescuentoArticulo() {
    this.dialogo.close(this.descuentoAIngresar);
  }
}
