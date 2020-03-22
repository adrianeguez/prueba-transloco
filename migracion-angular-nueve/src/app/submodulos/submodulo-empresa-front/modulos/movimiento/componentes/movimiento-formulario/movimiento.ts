export class Movimiento {
  constructor(
    public nombre?: string,
    public codigo?: string,
    public descripcion?: string,
    public numero?: string,
    public numeroInventario?: string,
    public nombreReferencia?: string,
    public formaNumerar?: string,
    public factorStock?: string,
    public afectaCostoPromedio?: string,
    public afectaCostoUltimo?: string,
    public afectaCostoUltimaTransaccion?: string,
    public cobrarIVA?: string,
    public retencionIVA?: string,
    public retencionRenta?: string,
    public formaValorarInventario?: string,
    public afectaDatosUltimaCompra?: string,
    public afectaDatosUltimaVenta?: string,
  ) {}
}
