export function transformarArreglo(arreglo: any[], orden: number) {
  let arregloAux = [];
  let contador = 1;
  const esValido = arreglo.length % orden === 0;
  if (esValido) {
    return arreglo.reduce(
      (acumulador, elemento, indice) => {
        const estaDentroDelRango = contador <= orden;
        if (estaDentroDelRango) {
          arregloAux.push(elemento);
          contador++;
        } else {
          contador = 2;
          acumulador.push(arregloAux);
          arregloAux = [];
          arregloAux.push(elemento);
        }
        if (indice + 1 === arreglo.length) {
          acumulador.push(arregloAux);
        }
        return acumulador;
      }, []
    );
  } else {
    return [];
  }
}
