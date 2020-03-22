import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {
  MASK_NUMERO_AUTORIZACION,
  MASK_NUMERO_FACTURA,
  MASK_NUMERO_SERIE
} from '../../../constantes/mascaras';

@Component({
  selector: 'ml-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  @Output()
  seleccionoDatosCompra: EventEmitter<DatosCompraInterface> = new EventEmitter();

  mascaraNumeroFactura = MASK_NUMERO_FACTURA;

  mascaraNumeroSerie = MASK_NUMERO_SERIE;

  mascaraNumeroAutorizacion = MASK_NUMERO_AUTORIZACION;

  longitudFactura: any;

  formulario: DatosCompraInterface = {
    idClienteOProveedor: null,
    numeroFactura: null,
    numeroSerie: null,
    numeroAutorizacion: null,
    facturaElectronica: null
  };

  /* formulario: FormularioCompraInterface = {
    esPedido: null,
    compra: {
      idClienteOProveedor: null,
      numeroFactura: null,
      numeroSerie: null,
      numeroAutorizacion: null,
      facturaElectronica: null,
      prioridad: null,
    },
    pedido: {
      idClienteOProveedor: null,
      prioridad: null,
    },
  };*/

  constructor() {
  }

  ngOnInit() {
  }

  setearFechaAutorizacion(evento: NgbDate) {
    // this.formulario.fechaAutorizacion = new Date(evento.year, evento.month - 1, evento.day);
    // console.log(this.formulario);
  }

  setearFechaImpresion(evento: NgbDate) {
    /* this.formulario
      .datosFacturafisica
      .fechaImpresion = new Date(evento.year, evento.month - 1, evento.day);*/
    // console.log(this.formulario);
  }

  setearFechaValidoHasta(evento: NgbDate) {
    /*this.formulario
      .datosFacturafisica
      .validoHasta = new Date(evento.year, evento.month - 1, evento.day);*/
    // console.log(this.formulario);
  }

  emitirDatosCompraSeleccionados(formulario: NgForm) {
    console.log('emitiendo');
    // this.seleccionoDatosCompra.emit(this.formulario);
  }

  emitirDatosCompra(formulario: NgForm) {
    Boolean(this.formulario.facturaElectronica);
    this.seleccionoDatosCompra.emit(this.formulario);
  }

  cambioTipoFactura(evento) {
    console.log('factura', evento);
    const esFacturaElectronica = evento === '1';
    setTimeout(
      () => {
        this.longitudFactura = esFacturaElectronica ? 49 : 15;
        /*this.formulario.fechaAutorizacion = undefined;
        this.formulario.datosFacturafisica.fechaImpresion = undefined;
        this.formulario.datosFacturafisica.validoHasta = undefined;*/
      },
      1000
    );
  }
}

export interface DatosCompraInterface {
  idClienteOProveedor: number;
  numeroFactura: string;
  numeroSerie: string;
  numeroAutorizacion: string;
  facturaElectronica: number;
  prioridad?: boolean;
}

export interface DatosPedidoCompraInterface {
  idClienteOProveedor: number;
  prioridad: boolean;
}

export interface FormularioCompraInterface {
  esPedido: string;
  compra: DatosCompraInterface;
  pedido: DatosPedidoCompraInterface;
}
