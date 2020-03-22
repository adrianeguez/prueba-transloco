export class DepartamentoTrabajador {
  constructor(
    public contactoEmpresa?: string,
    public nombres?: string,
    public apellidos?: string,
    public tipoCargo?: string,
    public descripcion?: string,
    public id?: number,
  ) {}
}
