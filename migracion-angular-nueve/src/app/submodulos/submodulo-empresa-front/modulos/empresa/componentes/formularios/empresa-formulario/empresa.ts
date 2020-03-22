export class Empresa {
  constructor(
    public nombreComercial?: string,
    public razonSocial?: string,
    public ruc?: string,
    public direccionMatriz?: string,
    public telefono?: string,
    public correo?: string,
    public tipoContribuyente?: string,
    public contribuyenteEspecial?: number,
    public obligadoContabilidad?: string,
    public codigo?: string,
    public tipo?: string,
    public esEstacionServicioPropia?: string,
  ) {}
}
