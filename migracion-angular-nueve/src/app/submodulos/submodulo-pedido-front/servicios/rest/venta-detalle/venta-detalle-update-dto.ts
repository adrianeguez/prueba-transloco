import { IsNumber, IsOptional } from 'class-validator';

export class VentaDetalleUpdateDto {
  @IsOptional()
  @IsNumber()
  'cantidadEntregada': number;

  @IsOptional()
  @IsNumber()
  'cantidadDadaBaja': number;
}
