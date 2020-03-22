export function formatearFecha(fecha: Date) {
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDay();

  if (mes < 10 && dia < 10) {
    return `${fecha.getFullYear()}-0${mes}-0${dia}`;
  } else if (mes < 10 && dia > 10) {
    return `${fecha.getFullYear()}-0${mes}-${dia}`;
  } else if (mes > 10 && dia < 10) {
    return `${fecha.getFullYear()}-${mes}-0${dia}`;
  } else {
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }
}
