import {Toast} from 'angular2-toaster';

export function crearToasterGeneral(transloco , tipo: 'error' | 'success' | 'warning', path: string): Toast {
  const toast: Toast = {
    type: tipo,
    title: transloco.translate(`${path}.title`),
    body: transloco.translate(`${path}.body`),
    showCloseButton: true
  };
  console.log('toast', toast);
  return toast;
}
