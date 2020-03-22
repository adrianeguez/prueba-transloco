import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CabeceraCompra} from '../../../formularios/formulario-cabecera-compra/cabecera-compra';
import {
  CONFIGURACION_CABECERACOMPRA,
  ConfiguracionFormluarioCabeceraCompra
} from '../../../formularios/formulario-cabecera-compra/cabecera-compra-formulario.component';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import {ClaseFormularioContenedor} from './clase-formulario-contenedor';

@Component({
  selector: 'mlab-modal-ingresar-cabecera-movimiento-compras',
  templateUrl: './modal-ingresar-cabecera-movimiento-compras.component.html',
  styleUrls: ['./modal-ingresar-cabecera-movimiento-compras.component.scss']
})
export class ModalIngresarCabeceraMovimientoComprasComponent extends ClaseFormularioContenedor implements OnInit {

  formularioCabeceraCompra: CabeceraCompra;
  configuracionesCabeceraCompra: ConfiguracionFormluarioCabeceraCompra;

  constructor(
    public dialogo: MatDialogRef<ModalIngresarCabeceraMovimientoComprasComponent>
  ) {
    super();
  }

  ngOnInit() {
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionesCabeceraCompra = CONFIGURACION_CABECERACOMPRA();
    establecerValoresConfiguracionAbstractControl(
      this.configuracionesCabeceraCompra,
      {},
    );
  }

  establecerCabeceraCompra(cabeceraCompra: CabeceraCompra) {
    if (cabeceraCompra) {
      console.log('Cabecera compra?', cabeceraCompra);
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.ocultarEstaTipeando();
    }
  }

  cerrarModal(datosCompra: any) {
    this.dialogo.close(datosCompra);
  }
}
