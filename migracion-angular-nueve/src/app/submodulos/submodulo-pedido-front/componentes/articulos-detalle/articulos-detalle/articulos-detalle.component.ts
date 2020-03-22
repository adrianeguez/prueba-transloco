import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ml-articulos-detalle',
  templateUrl: './articulos-detalle.component.html',
  styleUrls: ['./articulos-detalle.component.scss']
})
export class ArticulosDetalleComponent implements OnInit {

  @Input() ingresoEgreso: Array<object>;

  @Input() compraDetalle: Array<object>;

  @Input() facturaDevolucionClientes: Array<object>;

  @Input() transferenciaBodegasDetalle: Array<object>;

  @Input() pedidoCompra: Array<object>;

  @Input() valores: Array<object>;

  columnas: Array<object>;

  constructor() { }

  ngOnInit() {
    if (this.ingresoEgreso) {
      this.columnas = this.ingresoEgreso;
    }
    if (this.compraDetalle) {
      this.columnas = this.compraDetalle;
    }
    if (this.facturaDevolucionClientes) {
      this.columnas = this.facturaDevolucionClientes;
    }
    if (this.transferenciaBodegasDetalle) {
      this.columnas = this.transferenciaBodegasDetalle;
    }
    if (this.pedidoCompra) {
      this.columnas = this.pedidoCompra;
    }
  }

}
