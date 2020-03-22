export function paginar(arreglo: any[], skip: number, take: number) {
  return [arreglo.slice(skip, take * (skip + 1)), arreglo.length];
}
