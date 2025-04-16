import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    example: 'vikas@xyz.com',
    description: 'Email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'vikas123',
    description: 'Password',
    required: true,
  })
  password: string;
}
