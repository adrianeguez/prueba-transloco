import { RutaClienteInterface } from '../../../../../interfaces/ruta-cliente-interface';

export class CronoVendDetalle {
  constructor(
    public orden?: string,
    public fecha?: Date,
    public lunes?: boolean,
    public martes?: boolean,
    public miercoles?: boolean,
    public jueves?: boolean,
    public viernes?: boolean,
    public sabado?: boolean,
    public domingo?: boolean,
    public horaVisita?: string,
    public rutaCliente?: RutaClienteInterface | number | string | any,
  ) {}
}
