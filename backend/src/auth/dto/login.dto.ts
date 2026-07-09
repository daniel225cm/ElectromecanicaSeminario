import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@seminario.com' })
  @IsEmail()
  correo!: string;

  @ApiProperty({ example: 'Admin123*' })
  @IsNotEmpty()
  password!: string;
}
