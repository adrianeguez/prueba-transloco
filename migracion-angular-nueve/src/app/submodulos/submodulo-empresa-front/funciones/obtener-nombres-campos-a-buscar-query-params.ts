export function obtenerNombresCamposABuscarQueryParams(camposABuscar) {
  return camposABuscar.map(campoAbuscar => {
    return campoAbuscar.campo;
  });
}
