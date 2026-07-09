import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateServicioDto {
  @ApiProperty({ example: 'Diagnóstico eléctrico' })
  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @ApiProperty({ example: 'Revisión del sistema de arranque y alternador.' })
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @ApiProperty({ example: '2026-07-08' })
  @IsDateString()
  fecha!: string;

  @ApiProperty({ example: 45.5 })
  @IsNumber()
  @Min(0)
  costo!: number;

  @ApiProperty({
    example: 'Pendiente',
    enum: ['Pendiente', 'En proceso', 'Finalizado'],
  })
  @IsString()
  @IsIn(['Pendiente', 'En proceso', 'Finalizado'])
  estado!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  vehiculoId!: number;
}
