import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {VentaDetalleEntity} from '../venta-detalle/venta-detalle-entity';

export class DescuentoVentaCreateDto {
  @IsNotEmpty()
  @IsNumber()
  'porcentaje': number;

  @IsNotEmpty()
  @IsString()
  'razon': string;

  @IsNotEmpty()
  @IsNumber()
  'orden': number;

  @IsNotEmpty()
  @IsNumber()
  'base': number;

  @IsNotEmpty()
  @IsNumber()
  'valor': number;

  @IsNotEmpty()
  @IsNumber()
  ventaDetalle: number;
}
