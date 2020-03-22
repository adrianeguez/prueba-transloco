import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VentaDetalleCreateDto {
  @IsNotEmpty()
  @IsString()
  'codigo': string;

  @IsNotEmpty()
  @IsString()
  'nombre': string;

  @IsNotEmpty()
  @IsNumber()
  'idArticulo': number;

  @IsNotEmpty()
  @IsNumber()
  'cantidad': number;

  @IsOptional()
  @IsNumber()
  'cantidadPromocion': number;

  @IsNotEmpty()
  @IsNumber()
  'cantidadTotal': number;

  @IsNotEmpty()
  @IsNumber()
  'cantidadPendiente': number;

  @IsNotEmpty()
  @IsNumber()
  'valorUnitario': number;

  @IsNotEmpty()
  @IsNumber()
  ventaCabecera: number | any;
}
