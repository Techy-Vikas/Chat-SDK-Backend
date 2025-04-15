import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty({ example: 'Hello, ChatGPT!' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
