import * as moment from 'moment';

export function transformarSegundosATiempo(segundos: number): string {
  return moment.utc(segundos * 1000).format('HH:mm:ss');
}

export function transformarTiempoASegundos(tiempo: string): number {
  return moment.duration(tiempo).asSeconds();
}

export function verificarSiCumplioTiempo(tiempo: string | number, tiempoObjetivo: number): boolean {
  const elTiempoEsString = typeof tiempo === 'string';
  if (elTiempoEsString) {
    return transformarTiempoASegundos(tiempo as string) >= tiempoObjetivo;
  } else {
    return  tiempo >= tiempoObjetivo;
  }
}
