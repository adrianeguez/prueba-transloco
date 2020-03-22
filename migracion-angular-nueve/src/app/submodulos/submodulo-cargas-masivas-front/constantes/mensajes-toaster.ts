import { Toast } from 'angular2-toaster';

export const toastExitoCrearDatosArchivoCargaMasiva: Toast = {
  type: 'success',
  title: 'Correcto',
  body: 'Los datos del archivo han sido creados exitosamente',
  showCloseButton: true,
};

export const toastAdvertenciaCargaMasiva: Toast = {
  type: 'warning',
  title: 'Cuidado',
  body: 'El archivo que desea cargar no coincide con la carga respectiva',
  showCloseButton: true,
};

export const toastAdvertenciaNombreArchivo: Toast = {
  type: 'warning',
  title: 'Cuidado',
  body: 'El archivo que desea cargar debe llevar el mismo nombre que la carga',
  showCloseButton: true,
};
