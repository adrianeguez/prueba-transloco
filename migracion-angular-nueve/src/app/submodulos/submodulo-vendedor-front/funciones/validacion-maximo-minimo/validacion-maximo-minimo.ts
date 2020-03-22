export function validacionMaximoMinimo(minimo: number, maximo: number) {
  const validacion = maximo >= minimo;
  if (validacion) {
    return true;
  } else {
    return false;
  }
}
