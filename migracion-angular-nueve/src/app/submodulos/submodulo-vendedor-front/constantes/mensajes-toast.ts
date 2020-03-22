import {Toast} from 'angular2-toaster';

export const toastErrorCrearZona: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error creando, talvez zona ya se encuentra registrada',
  showCloseButton: true,
};

export const toastErrorCrearPeriodo: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error creando, talvez el periodo de venta ya se encuentra registrado',
  showCloseButton: true,
};

export function generarToasterWarningConMensaje(mensaje: string) {
  return {
    type: 'warning',
    title: 'Warining',
    body: mensaje,
    showCloseButton: true,
  };
}

export function generarToasterErrorConMensaje(mensaje: string, tipo = 'error') {
  return {
    type: 'error',
    title: 'Error',
    body: mensaje,
    showCloseButton: true,
  };
}
