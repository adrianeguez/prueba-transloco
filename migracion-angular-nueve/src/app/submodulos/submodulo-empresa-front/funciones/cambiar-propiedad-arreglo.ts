export function cambiarValorPropiedadArreglo(
  arreglo: any[],
  campo: string,
  valor,
) {
  arreglo.forEach(respuesta => {
    if (respuesta[campo]) {
      respuesta[campo] = valor;
    }
  });
}
