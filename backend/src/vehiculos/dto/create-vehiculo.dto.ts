import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateVehiculoDto {
  @ApiProperty({ example: 'ABC-1234' })
  @IsString()
  @Length(6, 10)
  placa!: string;

  @ApiProperty({ example: 'Chevrolet' })
  @IsString()
  @IsNotEmpty()
  marca!: string;

  @ApiProperty({ example: 'D-Max' })
  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @ApiProperty({ example: 2020 })
  @IsInt()
  @Min(1980)
  anio!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  clienteId!: number;
}
