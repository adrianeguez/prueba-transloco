export function eliminarDistintos(
  arreglo: any[],
  identificador: string = 'id',
  identificadorSegundoNivel?: string,
) {
  const result = [];
  const map = new Map();
  if (identificadorSegundoNivel) {
    for (const item of arreglo) {
      if (!map.has(item[identificador][identificadorSegundoNivel])) {
        map.set(item[identificador][identificadorSegundoNivel], true); // set any value to Map
        result.push({
          ...item[identificador],
        });
      }
    }
  } else {
    for (const item of arreglo) {
      if (!map.has(item[identificador])) {
        map.set(item[identificador], true); // set any value to Map
        result.push({
          ...item,
        });
      }
    }
  }

  return result;
}
