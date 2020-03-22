export class Horario {
  constructor(
    public descripcion?: string,
    public tipo?: string,
    public fechaInicia?: string,
    public fechaFinaliza?: string,
    public horaInicia?: string,
    public horaFinaliza?: string,
    public lunes?: string,
    public martes?: string,
    public miercoles?: string,
    public jueves?: string,
    public viernes?: string,
    public sabado?: string,
    public domingo?: string,
  ) {}
}
