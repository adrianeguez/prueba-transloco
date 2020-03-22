export function quitarMascaraNumero(numero: any): any {
    if (!numero) {
        return null;
    } else {
        const valor = typeof numero === 'number' ? numero.toString() : numero;
        numero = valor.replace(' ', '');
        return +numero;
    }
}
