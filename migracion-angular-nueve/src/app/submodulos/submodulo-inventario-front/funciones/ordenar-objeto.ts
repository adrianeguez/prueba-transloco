export function ordenarObjeto(arreglo: any[], nombreCampo: string, ASC: boolean = true) {
  if (ASC) {
    return arreglo.sort((a, b) => (a[nombreCampo] > b[nombreCampo]) ? 1 : ((b[nombreCampo] > a[nombreCampo]) ? -1 : 0));
  } else {
    return arreglo.sort((a, b) => (a[nombreCampo] < b[nombreCampo]) ? 1 : ((b[nombreCampo] < a[nombreCampo]) ? -1 : 0));
  }
}
