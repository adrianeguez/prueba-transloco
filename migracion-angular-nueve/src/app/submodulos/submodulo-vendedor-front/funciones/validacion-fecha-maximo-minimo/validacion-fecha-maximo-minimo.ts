export function validacionFechaMaximaMinima(
  fechaInicio: any,
  fechaFinalizacion: any,
) {
  if (fechaInicio > fechaFinalizacion) {
    return false;
  } else {
    return true;
  }
}
