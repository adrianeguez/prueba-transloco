export function generarToasterErrorConMensaje(mensaje: string, tipo = 'error', titulo = 'Error') {
  return {
    type: tipo,
    title: titulo,
    body: mensaje,
    showCloseButton: true,
  };
}
