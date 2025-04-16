import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'vikas@xyz.com',
    description: 'Email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
      example: 'vikas123',
      description: 'Password',
      required: true,
    })
  password: string;
}
