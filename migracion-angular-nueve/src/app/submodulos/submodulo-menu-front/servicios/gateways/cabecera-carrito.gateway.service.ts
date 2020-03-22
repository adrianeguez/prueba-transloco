import { EventEmitter, Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../../environments/environment';
import { CabeceraCarritoInterface } from '../../interfaces/cabecera-carrito.interface';

@Injectable({
  providedIn: 'root',
})
export class CabeceraCarritoGatewayService {
  socket;
  conectado = false;
  eventoConectado: EventEmitter<any> = new EventEmitter();
  eventoDesconectado: EventEmitter<any> = new EventEmitter();
  eventoSeEmitioAumentarHorario: EventEmitter<{
    id: number;
    lunes: number;
  }> = new EventEmitter();

  eventoCambioEstado: EventEmitter<{
    idEstablecimiento: string;
    estado: string;
  }> = new EventEmitter();

  constructor() {
    this.iniciar();
  }

  iniciar() {
    this.socket = io(
      `${environment.urlWebsockets}:${environment.portWebsockets}` +
        '/cabecera-carrito',
    );
    console.log('HOLA');

    this.socket.on('connect', respuesta => {
      console.log({
        mensaje: 'Se conecto Cabecera Carrito',
      });
      this.conectado = true;
      this.eventoConectado.emit(respuesta);
    });

    this.socket.on('disconnect', respuesta => {
      console.log({
        mensaje: 'Se desconecto cabecera carrito',
      });
      this.conectado = false;
      this.eventoDesconectado.emit(respuesta);
    });

    this.socket.on('cambioEstadoCarritoCabecera', datos => {
      this.eventoCambioEstado.emit(datos);
    });
    this.socket.on('seEmitioAumentarHorario', objeto => {
      this.eventoSeEmitioAumentarHorario.emit(objeto);
    });
  }

  unirseARoomPorIdEstablecimiento(
    idEstablecimiento: number,
  ): Promise<[CabeceraCarritoInterface[], number]> {
    return new Promise((res, rej) => {
      console.log('Emitiendo');
      this.socket.emit(
        'unirseARoomPorIdEstablecimiento',
        {
          idEstablecimiento,
        },
        (respuesta: [CabeceraCarritoInterface[], number]) => {
          console.log('Llego algo', respuesta);
          res(respuesta);
        },
      );
    });
  }

  // Cabecera Carrito Gateway Service
  unirseAlDota(nombreSala: number): Promise<{ mensaje: string }> {
    console.log('RICO');
    return new Promise((res, rej) => {
      this.socket.emit(
        'unirseAlDota', // nombre
        {
          // datos
          nombreSala,
        },
        (respuesta: { mensaje: string }) => {
          // callback
          console.log('RICOLINO');
          console.log(respuesta);
          res(respuesta);
        },
      );
    });
  }

  // Cabecera Carrito Gateway Service
  obtenerHorarioPorSala(
    nombreSala: number,
  ): Promise<
    { id: number; lunes?: number; martes?: number; miercoles?: number }[]
  > {
    return new Promise((res, rej) => {
      this.socket.emit(
        'obtenerHorarioPorSala',
        {
          nombreSala,
        },
        arreglo => {
          res(arreglo); // OJO
        },
      );
    });
  }

  aumentarHorario(
    nombreSala: number,
  ): Promise<{
    id: number;
    lunes?: number;
    martes?: number;
    miercoles?: number;
  }> {
    return new Promise((res, rej) => {
      this.socket.emit(
        'aumentarHorario', // OJO
        {
          nombreSala,
        },
        objetoHorario => {
          res(objetoHorario); // OJO
        },
      );
    });
  }
}
