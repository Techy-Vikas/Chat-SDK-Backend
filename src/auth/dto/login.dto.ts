import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'demo@vormir.co',
    description: 'Email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
      example: 'demo123',
      description: 'Password',
      required: true,
    })
  password: string;
}
