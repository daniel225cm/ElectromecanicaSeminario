import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Carlos Seminario' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: '0912345678' })
  @IsString()
  @Length(10, 10)
  cedula!: string;

  @ApiProperty({ example: '0998765432' })
  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @ApiProperty({ example: 'cliente@email.com' })
  @IsEmail()
  correo!: string;
}
