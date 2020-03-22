import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StockArticuloService} from '../servicios/stock-articulo.service';
import {EmitirCantidadBodegaArticulo} from '../interfaces/emitir-cantidad-bodega-articulo';

@Component({
  selector: 'mlab-stock-articulo',
  templateUrl: './stock-articulo.component.html',
  styleUrls: ['./stock-articulo.component.scss'],
})
export class StockArticuloComponent implements OnInit {
  @Input()
  idArticuloASuscribirse: number;

  @Input()
  idBodegaASuscribirse: number;

  @Input()
  esDestino = false;

  @Output()
  emitirCantidadBodegaArticulo: EventEmitter<EmitirCantidadBodegaArticulo> = new EventEmitter();

  cantidad = 0;
  idArticulo = 0;
  idBodega = 0;

  constructor(private readonly _stockArticuloService: StockArticuloService) {
  }

  async ngOnInit() {
    this.idArticulo = this.idArticuloASuscribirse;
    this.idBodega = this.idBodegaASuscribirse;
    this.intentarUnirse();
    if (this._stockArticuloService.estaConectado) {
      try {
        const respuestaCantidad = await this._stockArticuloService
          .unirsePorArticulo(
            this.idArticuloASuscribirse,
            this.idBodegaASuscribirse,
          );
        this.cantidad = respuestaCantidad.cantidad;
        this.emitirCantidadBodegaArticulo.emit({
          cantidad: this.cantidad,
          idArticulo: this.idArticuloASuscribirse,
          idBodega: this.idBodegaASuscribirse,
          esDestino: this.esDestino,
        });
      } catch (error) {
        console.error({
          error,
          mensaje: 'Error uniendose por articulo',
        });
      }
    }
    this._stockArticuloService
      .eventoConectado
      .subscribe(
        async () => {
          try {
            const respuestaCantidad = await this._stockArticuloService
              .unirsePorArticulo(
                this.idArticuloASuscribirse,
                this.idBodegaASuscribirse,
              );
            this.cantidad = respuestaCantidad.cantidad;
            this.emitirCantidadBodegaArticulo.emit({
              cantidad: this.cantidad,
              idArticulo: this.idArticuloASuscribirse,
              idBodega: this.idBodegaASuscribirse,
              esDestino: this.esDestino,
            });
          } catch (error) {
            console.error({
              error,
            });
          }

        }
      );
  }

  intentarUnirse() {
    if (this._stockArticuloService.socket) {
      this._stockArticuloService
        .eventoCambioStock
        .subscribe(datos => {
          if (datos.idArticulo === this.idArticuloASuscribirse && datos.idBodega === this.idBodegaASuscribirse) {
            this.cantidad = datos.cantidadActual;
            this.emitirCantidadBodegaArticulo.emit({
              cantidad: this.cantidad,
              idArticulo: this.idArticuloASuscribirse,
              idBodega: this.idBodegaASuscribirse,
              esDestino: this.esDestino,
            });
          }
        });
    } else {
      setInterval(
        () => {
          this.intentarUnirse();
        }, 3000
      );
    }
  }
}
