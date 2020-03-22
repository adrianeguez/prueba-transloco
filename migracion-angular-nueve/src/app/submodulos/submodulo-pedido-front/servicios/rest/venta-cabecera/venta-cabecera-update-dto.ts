import {IsBoolean, IsEmpty, IsNotEmpty, IsNumberString, IsOptional, IsString} from 'class-validator';

export class VentaCabeceraUpdateDto {
  @IsNotEmpty()
  @IsString()
  'estado': 'CR' | 'PE' | 'PA' | 'EN' | 'DA' | string;

  //  Creado CR - Pendiente PE - Parcial PA - Entregado EN - Dado de Baja DA

  @IsOptional()
  @IsBoolean()
  'prioridad': boolean;

  @IsOptional()
  @IsString()
  'comentario': string;

  @IsEmpty()
  'idVendedor': number;

  @IsEmpty()
  'idEdificio': number;

  @IsEmpty()
  'tipoMovimiento': string;

  @IsEmpty()
  'fecha': Date;

  @IsOptional()
  @IsNumberString()
  'telefono': boolean;

  @IsOptional()
  @IsString()
  'correo': boolean;

  @IsOptional()
  @IsString()
  'direccion': boolean;

  @IsOptional()
  @IsString()
  'documento': boolean;
}
