import { RutaInterface } from '@manticore-labs/ng-api';

export class CronoVendCabecera {
  constructor(
    public nombreCronograma?: string,
    public descripcion?: string,
    public ruta?: RutaInterface | number | string | any,
  ) {}
}
