export function obtenerParamtrosQueryParaCargaDatos(parametro: string) {
  return parametro ? JSON.parse(parametro) : undefined;
}
