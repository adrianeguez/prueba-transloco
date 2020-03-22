export function combinacion(diccionario: number[]) {
  console.log('diccionario para combinacion', diccionario);
  const combinaciones: CombinacionesArbol[] = [];
  if (diccionario.length === 1) {
    combinaciones.push({ padre: diccionario[0], hijo: diccionario[0] });
  } else {
    diccionario.forEach((parteUno, i) => {
      diccionario.forEach((parteDos, j) => {
        if (j === i) {
          combinaciones.push({ padre: parteUno, hijo: parteDos });
        }
        if (j !== i && i < j) {
          combinaciones.push({ padre: parteUno, hijo: parteDos });
        }
      });
    });
  }

  return combinaciones;
}
export interface CombinacionesArbol {
  padre: number;
  hijo: number;
}
