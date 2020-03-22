export function obtenerBusquedaQueryParams(queryParams) {
  return queryParams.camposABuscar[0].valor.substring(
    3,
    queryParams.camposABuscar[0].valor.length - 3,
  );
}
