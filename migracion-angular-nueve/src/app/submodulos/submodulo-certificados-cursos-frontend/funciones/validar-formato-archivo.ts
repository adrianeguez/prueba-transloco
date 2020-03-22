export function validarFormatoArchivo(archivo: string, tipo: string) {
  const tipoArchivo = ((archivo.split(';')[0]).split(':')[1]).split('/')[0];
  console.log(tipoArchivo);
  if (tipoArchivo === tipo) {
    return true;
  }
  return false;
}
