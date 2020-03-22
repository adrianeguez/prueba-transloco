export function setearHora(fecha: Date) {
  return `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
}
