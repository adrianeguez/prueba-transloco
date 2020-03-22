export function ingresarRegistro(conexion, registro, id: string = 'id') {
  let consulta = '';
  const arregloLlaves = Object.keys(registro);
  const arregloNoEnviarEnConsulta = arregloLlaves
    .filter(propiedad => propiedad.includes('Id'))
    .map(a => a.replace('Id', ''));
  const llavesNuevas = arregloLlaves.filter(
    propiedad => !arregloNoEnviarEnConsulta.some(r => r === propiedad),
  );

  llavesNuevas.forEach((propiedad, indice) => {
    const ultimoCaracter = arregloLlaves.length - 1 === indice ? '\n' : ',';
    const noDebeEnviarseEnConsulta = arregloNoEnviarEnConsulta.some(
      p => p === propiedad,
    );
    if (!noDebeEnviarseEnConsulta) {
      consulta = consulta + `"${propiedad}" = :${propiedad}${ultimoCaracter}`;
    }
  });
  if (consulta.substring(consulta.length - 3, consulta.length).includes(',')) {
    const primero = consulta[consulta.length - 1].replace(',', '');
    const segundo = consulta[consulta.length - 2].replace(',', '');
    const tercero = consulta[consulta.length - 3].replace(',', '');
    consulta =
      consulta.substring(0, consulta.length - 3) + primero + segundo + tercero;
  }
  const nuevoRegistro = {
    ...registro,
  };
  console.log(registro);
  arregloNoEnviarEnConsulta.forEach(nombre => {
    delete registro[nombre + 'Id'];
  });
  const conexionConConsulta = conexion
    .values(registro)
    .onConflict(`("id") DO UPDATE SET ${consulta}`);
  llavesNuevas.forEach((propiedad, indice) => {
    conexionConConsulta.setParameter(propiedad, nuevoRegistro[propiedad]);
  });
  console.log(conexionConConsulta);
  return conexionConConsulta;
}
