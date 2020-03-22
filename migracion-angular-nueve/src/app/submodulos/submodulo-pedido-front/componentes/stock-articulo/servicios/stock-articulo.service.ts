import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../../../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class StockArticuloService {
  socket;
  eventoConectado: EventEmitter<any> = new EventEmitter();
  eventoDesconectado: EventEmitter<any> = new EventEmitter();
  eventoCambioStock: EventEmitter<any> = new EventEmitter();
  estaConectado = false;

  constructor() {
    this.iniciar();
  }

  iniciar() {
    console.log(`${environment.urlWebsockets}:${environment.portWebsockets}` +
      '/articulo-bodega');
    this.socket = io(
      `${environment.urlWebsockets}:${environment.portWebsockets}` +
      '/articulo-bodega',
    );

    this.socket.on('connect', respuesta => {
      console.log({
        mensaje: 'Se conecto',
      });
      this.estaConectado = true;
      this.eventoConectado.emit(respuesta);
    });

    this.socket.on('disconnect', respuesta => {
      console.log({
        mensaje: 'Se desconecto',
      });
      this.estaConectado = false;
      this.eventoDesconectado.emit(respuesta);
    });

    this.socket.on('cambioStockArticulo', datos => {
      console.log({
        mensaje: 'Cambio stock',
      });
      this.eventoCambioStock.emit(datos);
    });
  }

  unirsePorArticulo(idArticulo: number, idBodega: number): Promise<{ error?: number; mensaje?: string; cantidad?: number; }> {
    return new Promise(
      (res, rej) => {
        this.socket
          .emit(
            'unirseARoomPorIdArticulo',
            {idArticulo, idBodega},
            (respuesta: { mensaje: string, cantidad: number }) => {
              if (respuesta.mensaje) {
                res(respuesta);
              } else {
                rej({error: 500});
              }
            }
          );
      }
    );
  }
}
