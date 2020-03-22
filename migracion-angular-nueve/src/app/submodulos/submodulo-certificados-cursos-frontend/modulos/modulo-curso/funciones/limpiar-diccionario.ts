export function limpiarDiccionario(diccionario) {
  const diccionarioClonado = JSON.parse(JSON.stringify(diccionario));
  const llaves = Object.keys(diccionarioClonado);
  llaves.forEach(
    (llave) => {
      const atributo = diccionarioClonado[llave];
      // si es diccionario
      if (atributo !== undefined && !atributo.length && typeof atributo === 'object') {
        // llamar recursivo;
        limpiarDiccionario(atributo);
      } else {
        if (!atributo !== undefined) {
          delete diccionarioClonado[llave];
        }
      }
    }
  );
  return diccionarioClonado;
}

