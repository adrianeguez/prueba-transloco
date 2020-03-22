import {IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator';

export class VentaCabeceraCreateDto {
  @IsNotEmpty()
  @IsNumber()
  'idVendedor': number;

  @IsNotEmpty()
  @IsNumber()
  'idEdificio': number;

  @IsNotEmpty()
  @IsString()
  'tipoMovimiento': string;

  @IsOptional()
  @IsString()
  'comentario'?: string;

  @IsOptional()
  @IsString()
  'observacion'?: string;

  @IsNotEmpty()
  @IsDate()
  'fecha': string;

  @IsNotEmpty()
  @IsString()
  'estado': 'CR' | 'PE' | 'PA' | 'EN' | 'DA' | string;

  //  Creado CR - Pendiente PE - Parcial PA - Entregado EN - Dado de Baja DA

  @IsOptional()
  @IsBoolean()
  'prioridad': boolean;

  @IsNotEmpty()
  @IsNumberString()
  'telefono': string;

  @IsNotEmpty()
  @IsString()
  'correo': string;

  @IsNotEmpty()
  @IsString()
  'direccion': string;

  @IsNotEmpty()
  @IsString()
  'documento': string;

  @IsNotEmpty()
  @IsBoolean()
  'seEnvio': boolean;
}
