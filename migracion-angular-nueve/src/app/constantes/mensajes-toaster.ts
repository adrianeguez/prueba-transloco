import { Toast } from 'angular2-toaster';

export const funcionToastExito = (title: string, body: string): Toast => {
  return {
    type: 'success',
    title,
    body,
    showCloseButton: true,
  };
};
export const funcionToastError = (title: string, body: string): Toast => {
  return {
    type: 'success',
    title,
    body,
    showCloseButton: true,
  };
};

export const toastExitoCrear: Toast = {
  type: 'success',
  title: 'Correcto',
  body: 'Created succesfully',
  showCloseButton: true,
};

export const toastExitoEditar: Toast = {
  type: 'success',
  title: 'Correcto',
  body: 'Saved succesfully',
  showCloseButton: true,
};

export const toastExitoEliminar: Toast = {
  type: 'success',
  title: 'Success',
  body: 'Deleted succesfully',
  showCloseButton: true,
};

export const toastErrorCrear: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error creating',
  showCloseButton: true,
};

export const toastErrorEditar: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error uploading',
  showCloseButton: true,
};

export const toastErrorEliminar: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error deleting',
  showCloseButton: true,
};
export const ToastExitoEstado: Toast = {
  type: 'success',
  title: 'Exito',
  body: 'State updated',
  showCloseButton: true,
};

export const ToastErrorEstado: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error updating',
  showCloseButton: true,
};

export const toastErrorCrearEmpresa: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error creating, talvez el RUC ya se encuentra registrado',
  showCloseButton: true,
};

export const toastErrorEditarEmpresa: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error editando, talvez el RUC ya se encuentra registrado',
  showCloseButton: true,
};

export function generarToasterErrorCrearCampoRepetido(campo: string) {
  return {
    type: 'error',
    title: 'Error',
    body:
      'Error creating, maybe the field ' +
      campo +
      ' is already registered',
    showCloseButton: true,
  };
}

export function generarToasterErrorEditarCampoRepetido(campo: string) {
  return {
    type: 'error',
    title: 'Error',
    body:
      'Error editando, talvez el campo ' +
      campo +
      ' ya se encuentra registrado',
    showCloseButton: true,
  };
}

export const toastErrorConexionServidor: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Failed conection',
  showCloseButton: true,
};

export const toastErrorMostrar: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error al mostrar registro',
  showCloseButton: true,
};

export const toastExitoReset: Toast = {
  type: 'success',
  title: 'Exito',
  body: 'Se restauro correctamente',
  showCloseButton: true,
};

export const toastErrorReset: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Fallo reseteando',
  showCloseButton: true,
};

export const ToastErrorTrayendoDatos: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error reading data',
  showCloseButton: true,
};

export const toastExitoCargarDatos: Toast = {
  type: 'success',
  title: 'Exito',
  body: 'Exito al cargar los datos',
  showCloseButton: true,
};

export const toastErrorCargarDatos: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error al cargar los datos',
  showCloseButton: true,
};

export const toastExitoOrden: Toast = {
  type: 'success',
  title: 'Success',
  body: 'Order updated',
  showCloseButton: true,
};

export const toastErrorDarPrueba: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Ya tomó el test',
  showCloseButton: true
};

export const toastExitoTarjeta: Toast = {
  type: 'success',
  title: 'Success',
  body: 'Correct card, please verify the payment',
  showCloseButton: true,
};

export const toastExitoPagar: Toast = {
  type: 'success',
  title: 'Success',
  body: 'Pago correcto',
  showCloseButton: true,
};

export const toastErrorPagar: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error con el pago',
  showCloseButton: true,
};

