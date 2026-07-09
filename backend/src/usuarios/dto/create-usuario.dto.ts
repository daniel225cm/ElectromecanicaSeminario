import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Administrador',
  })
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({
    example: 'admin@seminario.com',
  })
  @IsEmail()
  correo!: string;

  @ApiProperty({
    example: 'Admin123*',
  })
  @MinLength(6)
  password!: string;

  @ApiProperty({
    example: 'ADMIN',
  })
  rol!: string;
}
