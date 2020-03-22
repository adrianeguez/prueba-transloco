export class InformacionTributaria {
  constructor(
    public tipoIdentificacion?: string,
    public documento?: string,
    public razonSocial?: string,
    public direccion?: string,
    public telefono?: string,
    public correo?: string,
    public tipoContribuyente?: string,
    public contribuyenteEspecial?: number,
    public obligadoContabilidad?: string,
    public id?: number,

) {
}
}

