export function quitarMascaraPorcentaje(porcentaje: any): any {
    if (!porcentaje) {
        return null;
    } else {
        const valor = typeof porcentaje === 'number' ? porcentaje.toString() : porcentaje;
        porcentaje = valor.replace(' ', '');
        porcentaje = valor.replace('%', '');
        return +porcentaje;
    }
}
