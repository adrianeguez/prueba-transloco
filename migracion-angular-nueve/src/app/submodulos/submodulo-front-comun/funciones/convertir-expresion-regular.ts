export function convertirUrl(url, valor, caracter) {
  const expresionRegular = new RegExp(caracter, 'g');
  return url.replace(expresionRegular, valor);
}
