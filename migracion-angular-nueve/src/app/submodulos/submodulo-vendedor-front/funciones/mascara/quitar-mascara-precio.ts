export function quitarMascaraPrecio(precio: any): any {
  if (!precio) {
    return null;
  } else {
    const valor = typeof precio === 'number' ? precio.toString() : precio;

    precio = valor.replace(' ', '');
    precio = valor.replace('$', '');
    return +precio;
  }
}
